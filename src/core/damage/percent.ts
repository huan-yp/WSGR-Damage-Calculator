/**
 * 伤害百分比计算模块（中破率、大破率、击沉率）
 * 使用二分查找精确计算浮动系数阈值
 */

import { CalculationContext } from '../shared/models';
import { calculateAirstrikeReduction } from './airstrike';
import { calculateDamageForFloat } from './penetration';

/**
 * 二分查找伤害阈值所需的最小浮动系数
 */
function findDamageThreshold(
  baseAtk: number,
  floatMin: number,
  floatMax: number,
  threshold: number,
  armor: number,
  peneCoeff: number,
  skillMult: number,
  attackType: number,
  airstrikeReduction: number
): number {
  // 先检查边界情况
  const minDamage = calculateDamageForFloat(baseAtk, floatMin, armor, peneCoeff, skillMult, attackType, airstrikeReduction);
  const maxDamage = calculateDamageForFloat(baseAtk, floatMax, armor, peneCoeff, skillMult, attackType, airstrikeReduction);
  
  if (minDamage >= threshold) return floatMin;
  if (maxDamage < threshold) return floatMax + 1; // 表示无法达到阈值
  
  // 二分查找
  let left = floatMin;
  let right = floatMax;
  const epsilon = 0.0001;
  
  while (right - left > epsilon) {
    const mid = (left + right) / 2;
    const damage = calculateDamageForFloat(baseAtk, mid, armor, peneCoeff, skillMult, attackType, airstrikeReduction);
    
    if (damage >= threshold) {
      right = mid;
    } else {
      left = mid;
    }
  }
  
  return right;
}

/**
 * 计算单个伤害率（通用函数）
 * @param context 计算上下文
 * @param results 结果数组
 * @param hpRatio HP比例阈值（0.5为中破，0.75为大破，1为击沉）
 */
function calculateDamageRateByBinarySearch(
  context: CalculationContext,
  results: number[][][],
  hpRatio: number
): void {
  const enemyHp = context.other.enemyHp;
  const threshold = Math.ceil(hpRatio * enemyHp);
  const armor = context.other.armor;
  const skillMult = context.other.skillDamageMult;
  const peneCoeff = context.coefficient.pene;
  const attackType = context.attackType;
  
  // 航空战减伤系数
  let airstrikeReduction = 1;
  if (attackType === 0 || attackType === 1) {
    airstrikeReduction = calculateAirstrikeReduction(
      context.other.antiAirValue,
      context.other.shipSizeType,
      context.other.isArmoredCarrier,
      attackType === 0
    );
  }

  for (let i = 0; i < 2; i++) {
    // i=0 未暴击, i=1 暴击
    const floatMin = context.coefficient.float[0];
    const floatMax = context.coefficient.float[2];
    const critMult = i === 0 ? 1 : context.coefficient.crit;
    
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 5; k++) {
        // 获取不含浮动的基础系数
        const baseCoeff = context.directionCoefficients[j] * 
                          context.formationCoefficients[k] * 
                          context.tmpCoefficient * 
                          critMult;
        
        const baseAtk = context.batkValue * baseCoeff;
        
        // 使用二分查找找到达到阈值所需的最小浮动系数
        const floatThreshold = findDamageThreshold(
          baseAtk, floatMin, floatMax, threshold, armor, 
          peneCoeff, skillMult, attackType, airstrikeReduction
        );
        
        // 计算百分比
        let percent = 0;
        if (floatThreshold <= floatMin) {
          percent = 100; // 最小浮动也能达到
        } else if (floatThreshold >= floatMax) {
          percent = 0; // 最大浮动也不能达到
        } else {
          // 线性分布假设下的百分比
          percent = ((floatMax - floatThreshold) / (floatMax - floatMin)) * 100;
        }
        
        results[i][j][k] = parseFloat(Math.max(0, Math.min(100, percent)).toPrecision(4));
      }
    }
  }
}

/**
 * 计算中破率（使用二分查找）
 */
export function calculateMiddleDamagePercent(
  context: CalculationContext
): void {
  calculateDamageRateByBinarySearch(context, context.middleDamagePercent, 0.5);
}

/**
 * 计算大破率（使用二分查找）
 */
export function calculateHeavyDamagePercent(
  context: CalculationContext
): void {
  calculateDamageRateByBinarySearch(context, context.heavyDamagePercent, 0.75);
}

/**
 * 计算击沉率（使用二分查找）
 */
export function calculateSinkPercent(
  context: CalculationContext
): void {
  calculateDamageRateByBinarySearch(context, context.sinkPercent, 1);
}

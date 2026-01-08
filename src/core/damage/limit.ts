/**
 * 属性下限计算模块
 */

import { CalculationContext } from '../shared/models';
import { calculateCoefficientMatrix, calculateATKMatrix } from './coefficient';
import { calculatePenetrationDamage } from './penetration';

/**
 * 计算基础攻击力下限
 */
export function calculateBATKLimits(context: CalculationContext): void {
  const results = context.batkLimits;

  // 初始化结果为0（表示未找到）
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[0].length; j++) {
      for (let k = 0; k < results[0][0].length; k++) {
        results[i][j][k] = 0;
      }
    }
  }

  // 保存原始的 batkValue
  const originalBatkValue = context.batkValue;

  // 通过遍历基础攻击力来找到击沉下限
  for (let batk = 1; batk <= 400; batk++) {
    context.batkValue = batk;
    
    // 重新计算系数矩阵和伤害
    calculateCoefficientMatrix(context);
    calculateATKMatrix(context);
    calculatePenetrationDamage(context);

    // 检查未暴击下限(0)和暴击下限(3)的情况
    for (const conditionIdx of [0, 3]) {
      for (let j = 0; j < results[0].length; j++) {
        for (let k = 0; k < results[0][0].length; k++) {
          // 如果伤害 >= 敌方HP 且还未记录这个组合的下限
          if (
            context.penetrationDamageResults[conditionIdx][j][k] >= context.other.enemyHp &&
            results[conditionIdx][j][k] === 0
          ) {
            results[conditionIdx][j][k] = batk;
          }
        }
      }
    }

    // 检查是否所有组合都已找到下限
    let allFound = true;
    for (const conditionIdx of [0, 3]) {
      for (let j = 0; j < results[0].length; j++) {
        for (let k = 0; k < results[0][0].length; k++) {
          if (results[conditionIdx][j][k] === 0) {
            allFound = false;
            break;
          }
        }
        if (!allFound) break;
      }
      if (!allFound) break;
    }
    if (allFound) break;
  }

  // 恢复原始的 batkValue
  context.batkValue = originalBatkValue;
}

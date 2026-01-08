/**
 * 伤害计算模块入口
 * 统一导出所有伤害计算相关功能
 */

import { CalculationContext } from '../shared/models';
import * as Calculator from '../shared/calculator';

// 导出子模块
export { calculateCoefficientTmp, calculateCoefficientMatrix, calculateATKMatrix } from './coefficient';
export { calculateAirstrikeReduction } from './airstrike';
export { calculatePenetrationDamage, calculateDamageForFloat } from './penetration';
export { calculateMiddleDamagePercent, calculateHeavyDamagePercent, calculateSinkPercent } from './percent';
export { calculateBATKLimits } from './limit';

// 导入子模块用于完整计算
import { calculateCoefficientTmp, calculateCoefficientMatrix, calculateATKMatrix } from './coefficient';
import { calculatePenetrationDamage } from './penetration';
import { calculateMiddleDamagePercent, calculateHeavyDamagePercent, calculateSinkPercent } from './percent';

/**
 * 执行完整的伤害计算
 */
export function performDamageCalculation(context: CalculationContext): void {
  // 计算各个系数
  const tmpCoeff = Calculator.calculateTmpCoefficient(
    context.attackType,
    context.coefficient.airDomain,
    context.coefficient.sonar,
    context.coefficient.ammo,
    context.coefficient.torpedoBomber,
    context.coefficient.shipDamage,
    context.coefficient.skill
  );
  context.tmpCoefficient = tmpCoeff;

  // 计算基础攻击力（如果还未计算）
  if (context.batkValue === 0) {
    context.batkValue = Calculator.calculateBATK(context.attackType, context.batk);
  }

  // 计算临时系数
  context.coefficientResultsTmp = calculateCoefficientTmp(context);

  // 计算系数矩阵
  calculateCoefficientMatrix(context);

  // 计算实际攻击力
  calculateATKMatrix(context);

  // 计算穿甲伤害
  calculatePenetrationDamage(context);

  // 计算各类伤害率（使用二分查找）
  calculateMiddleDamagePercent(context);
  calculateHeavyDamagePercent(context);
  calculateSinkPercent(context);
}

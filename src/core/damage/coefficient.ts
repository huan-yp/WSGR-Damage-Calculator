/**
 * 系数计算模块
 */

import { CalculationContext } from '../shared/models';

/**
 * 计算系数临时值（浮动系数 × 暴击系数）
 */
export function calculateCoefficientTmp(
  context: CalculationContext
): number[] {
  const result: number[] = Array(6).fill(0);
  const floatCoeff = context.coefficient.float;

  // 未暴击：下限、平均、上限
  result[0] = floatCoeff[0];
  result[1] = floatCoeff[1];
  result[2] = floatCoeff[2];

  // 暴击：下限、平均、上限
  result[3] = context.coefficient.crit * floatCoeff[0];
  result[4] = context.coefficient.crit * floatCoeff[1];
  result[5] = context.coefficient.crit * floatCoeff[2];

  return result;
}

/**
 * 计算系数乘积矩阵
 */
export function calculateCoefficientMatrix(
  context: CalculationContext
): void {
  const results = context.coefficientResults;
  const tmpResults = context.coefficientResultsTmp;

  for (let i = 0; i < tmpResults.length; i++) {
    // 6种条件：未暴击(3种) + 暴击(3种)
    for (let j = 0; j < context.directionCoefficients.length; j++) {
      // 4种航向
      for (let k = 0; k < context.formationCoefficients.length; k++) {
        // 5种阵形
        results[i][j][k] =
          tmpResults[i] *
          context.directionCoefficients[j] *
          context.formationCoefficients[k] *
          context.tmpCoefficient;
      }
    }
  }
}

/**
 * 计算实际攻击力矩阵
 */
export function calculateATKMatrix(context: CalculationContext): void {
  const coeffResults = context.coefficientResults;
  const batkValue = context.batkValue;
  const results = context.atkResults;

  for (let i = 0; i < coeffResults.length; i++) {
    for (let j = 0; j < coeffResults[0].length; j++) {
      for (let k = 0; k < coeffResults[0][0].length; k++) {
        results[i][j][k] = coeffResults[i][j][k] * batkValue;
      }
    }
  }
}

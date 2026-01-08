/**
 * 系数计算模块
 */
import { CalculationContext } from '../shared/models';
/**
 * 计算系数临时值（浮动系数 × 暴击系数）
 */
export declare function calculateCoefficientTmp(context: CalculationContext): number[];
/**
 * 计算系数乘积矩阵
 */
export declare function calculateCoefficientMatrix(context: CalculationContext): void;
/**
 * 计算实际攻击力矩阵
 */
export declare function calculateATKMatrix(context: CalculationContext): void;

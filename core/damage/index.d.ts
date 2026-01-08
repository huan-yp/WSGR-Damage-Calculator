/**
 * 伤害计算模块入口
 * 统一导出所有伤害计算相关功能
 */
import { CalculationContext } from '../shared/models';
export { calculateCoefficientTmp, calculateCoefficientMatrix, calculateATKMatrix } from './coefficient';
export { calculateAirstrikeReduction } from './airstrike';
export { calculatePenetrationDamage, calculateDamageForFloat } from './penetration';
export { calculateMiddleDamagePercent, calculateHeavyDamagePercent, calculateSinkPercent } from './percent';
export { calculateBATKLimits } from './limit';
/**
 * 执行完整的伤害计算
 */
export declare function performDamageCalculation(context: CalculationContext): void;

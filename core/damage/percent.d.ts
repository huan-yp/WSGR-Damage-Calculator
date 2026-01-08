/**
 * 伤害百分比计算模块（中破率、大破率、击沉率）
 * 使用二分查找精确计算浮动系数阈值
 */
import { CalculationContext } from '../shared/models';
/**
 * 计算中破率（使用二分查找）
 */
export declare function calculateMiddleDamagePercent(context: CalculationContext): void;
/**
 * 计算大破率（使用二分查找）
 */
export declare function calculateHeavyDamagePercent(context: CalculationContext): void;
/**
 * 计算击沉率（使用二分查找）
 */
export declare function calculateSinkPercent(context: CalculationContext): void;

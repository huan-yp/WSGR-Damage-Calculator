/**
 * 穿甲伤害计算模块
 */
import { CalculationContext } from '../shared/models';
/**
 * 计算穿甲伤害
 */
export declare function calculatePenetrationDamage(context: CalculationContext): void;
/**
 * 根据浮动系数计算单次伤害（用于二分查找）
 */
export declare function calculateDamageForFloat(baseAtk: number, floatCoeff: number, armor: number, peneCoeff: number, skillMult: number, attackType: number, airstrikeReduction: number): number;

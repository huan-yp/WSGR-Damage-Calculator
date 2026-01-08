/**
 * 核心计算逻辑
 */
import { BATKParams } from "./models";
/**
 * 计算基础攻击力
 */
export declare function calculateBATK(attackType: number, batkParams: BATKParams): number;
/**
 * 获取基础攻击力计算公式字符串
 */
export declare function getBATKFormula(attackType: number, batkParams: BATKParams): string;
/**
 * 获取额外信息
 */
export declare function getExtraInfo(attackType: number): string;
/**
 * 计算弹药系数
 */
export declare function calculateAmmoCoefficient(ammoPercent: number): number;
/**
 * 计算暴击伤害系数
 */
export declare function calculateCritCoefficient(critPercent: number, defaultCrit?: number): number;
/**
 * 计算技能攻击力系数
 */
export declare function calculateSkillCoefficient(skillPercent: number): number;
/**
 * 计算声纳系数（仅用于某些反潜类型）
 */
export declare function calculateSonarCoefficient(sonarRaw: number, _attackType?: number): number;
/**
 * 计算穿甲系数
 */
export declare function calculatePenetrationCoefficient(baseCoefficient: number, penetrationAdd: number): number;
/**
 * 获取系数计算公式描述
 */
export declare function getCoefficientFormula(attackType: number): string;
/**
 * 计算临时系数（除了阵形、航向和浮动系数以外的系数乘积）
 */
export declare function calculateTmpCoefficient(attackType: number, airDomain: number, sonar: number, ammo: number, torpedoBomber: number, shipDamage: number, skill: number): number;
/**
 * 计算敌方装甲减伤系数（仅用于导弹战）
 */
export declare function calculateEnemyArmorReduceDamage(armor: number, penetrationCoefficient: number): number;
/**
 * 数值限制在区间内
 */
export declare function clampValue(value: number, min: number, max: number): number;
/**
 * 获取阵形系数表
 * 根据攻击类型返回对应的5个阵形系数（单纵、复纵、轮形、梯形、单横）
 */
export declare function getFormationCoefficients(attackType: number): number[];
/**
 * 获取航向系数表
 * 根据攻击类型返回对应的4个航向系数（T有利、同航战、反航战、T不利）
 */
export declare function getDirectionCoefficients(attackType: number): number[];
/**
 * 获取浮动系数表
 * 根据攻击类型返回对应的3个浮动系数（下限、平均、上限）
 */
export declare function getFloatCoefficients(attackType: number, useSuperHeavyShell?: boolean): number[];
/**
 * 获取穿甲系数
 * 根据攻击类型返回对应的穿甲系数
 */
export declare function getPenetrationCoefficient(attackType: number): number;
/**
 * 获取属性下限计算公式描述
 */
export declare function getLimitFormula(attackType: number): string;

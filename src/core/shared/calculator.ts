/**
 * 核心计算逻辑
 */

import * as Constants from "./constants";
import { CalculationContext, BATKParams } from "./models";

/**
 * 计算基础攻击力
 */
export function calculateBATK(
  attackType: number,
  batkParams: BATKParams
): number {
  const { v1, v2, v3, v4, v5 } = batkParams;

  switch (attackType) {
    case 0: // 航空战(轰炸机)
    case 1: // 航空战(鱼雷机)
      return Math.log(v1 + 1) * 2 * v2 + 25;

    case 2: // 反潜(轻母航战)
      return v1 + v2 * 2 + v3 / 2;

    case 3: // 反潜(驱逐巡洋)
      return v1 / 3 + Math.pow(v2, 1 / 3) * 20;

    case 4: // 炮击(航母系)
      return (v1 + v2 * 2 + v3) * Math.max(0, 1 - (v4 * v5) / 150) + 35;

    case 5: // 炮击(其他)
    case 6: // 昼战雷击
      return v1 + 5;

    case 7: // 夜战雷击
      return v1 + 10;

    case 8: // 夜战巡洋舰炮雷合击
      return v1 + v2 + 10;

    case 9: // 夜战巡洋舰炮击
    case 10: // 夜战其他炮击
      return v1 + 10;

    case 11: // 导弹战
    case 12: // 夜战导弹
      return v1 + v2 + v3 * 3;

    default:
      return 0;
  }
}

/**
 * 获取基础攻击力计算公式字符串
 */
export function getBATKFormula(
  attackType: number,
  batkParams: BATKParams
): string {
  const { v1, v2, v3, v4, v5 } = batkParams;

  switch (attackType) {
    case 0:
    case 1:
      return `ln( ${v1} + 1 ) × 2 × ${v2} + 25`;
    case 2:
      return `${v1} + 2 × ${v2} + ${v3} / 2`;
    case 3:
      return `${v1} / 3 + ${v2} ^ (1 / 3) * 20`;
    case 4:
      return `( ${v1} + ${v2} × 2 + ${v3} ) × MAX( 0 , 1 - ${v4} × ${v5} ÷ 150 ) + 35`;
    case 5:
    case 6:
      return `${v1} + 5`;
    case 7:
      return `${v1} + 10`;
    case 8:
      return `${v1} + ${v2} + 10`;
    case 9:
    case 10:
      return `${v1} + 10`;
    case 11:
    case 12:
      return `${v1} + ${v2} + ${v3} × 3`;
    default:
      return "";
  }
}

/**
 * 获取额外信息
 */
export function getExtraInfo(attackType: number): string {
  const descriptions: Record<number, string> = {
    0: "不可用",
    1: "不可用",
    2: "不可用",
    3: "不可用",
    4: "不可用",
    5: "基础攻击力=火力+5",
    6: "基础攻击力=鱼雷+5",
    7: "基础攻击力=鱼雷+10",
    8: "基础攻击力=火力+鱼雷+10",
    9: "基础攻击力=火力+10",
    10: "基础攻击力=火力+10",
    11: "基础攻击力=基础火力+导弹火力*3",
    12: "基础攻击力=基础火力+导弹火力*3",
  };

  return descriptions[attackType] || "不可用";
}

/**
 * 计算弹药系数
 */
export function calculateAmmoCoefficient(ammoPercent: number): number {
  return Math.min(1, (ammoPercent / 100) * 2);
}

/**
 * 计算暴击伤害系数
 */
export function calculateCritCoefficient(
  critPercent: number,
  defaultCrit: number = Constants.DEFAULT_CRIT_COEFFICIENT
): number {
  return defaultCrit + critPercent / 100;
}

/**
 * 计算技能攻击力系数
 */
export function calculateSkillCoefficient(skillPercent: number): number {
  return 1 + skillPercent / 100;
}

/**
 * 计算声纳系数（仅用于某些反潜类型）
 */
export function calculateSonarCoefficient(
  sonarRaw: number,
  _attackType: number = 3
): number {
  return 1 + sonarRaw / 10;
}

/**
 * 计算穿甲系数
 */
export function calculatePenetrationCoefficient(
  baseCoefficient: number,
  penetrationAdd: number
): number {
  return baseCoefficient + penetrationAdd / 100;
}

/**
 * 获取系数计算公式描述
 */
export function getCoefficientFormula(attackType: number): string {
  const formulas: Record<number, string> = {
    0: "制空系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    1: "鱼雷机系数 × 制空系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    2: "弹药系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    3: "声呐系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    4: "制空系数 × 弹药系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    5: "阵型系数 × 航向系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    6: "阵型系数 × 航向系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    7: "阵型系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    8: "阵型系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    9: "阵型系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    10: "阵型系数 × 弹药系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
    11: "阵型系数 × 舰损系数 × 浮动系数 × 暴击系数 × 敌方装甲减伤系数 × 技能攻击力系数",
    12: "阵型系数 × 舰损系数 × 浮动系数 × 暴击系数 × 技能攻击力系数",
  };

  return formulas[attackType] || "";
}

/**
 * 计算临时系数（除了阵形、航向和浮动系数以外的系数乘积）
 */
export function calculateTmpCoefficient(
  attackType: number,
  airDomain: number,
  sonar: number,
  ammo: number,
  torpedoBomber: number,
  shipDamage: number,
  skill: number
): number {
  let result = 1;

  // 根据攻击类型确定要乘哪些系数
  switch (attackType) {
    case 0: // 航空战(轰炸机)
      result = airDomain * ammo * shipDamage * skill;
      break;
    case 1: // 航空战(鱼雷机)
      result = torpedoBomber * airDomain * ammo * shipDamage * skill;
      break;
    case 2: // 反潜(轻母航战)
      result = ammo * skill;
      break;
    case 3: // 反潜(驱逐巡洋)
      result = sonar * ammo * shipDamage * skill;
      break;
    case 4: // 炮击(航母系)
      result = airDomain * ammo * skill;
      break;
    case 5: // 炮击(其他)
    case 6: // 昼战雷击
      result = ammo * shipDamage * skill;
      break;
    case 7: // 夜战雷击
    case 8: // 夜战巡洋舰炮雷合击
    case 9: // 夜战巡洋舰炮击
    case 10: // 夜战其他炮击
      result = ammo * shipDamage * skill;
      break;
    case 11: // 导弹战
    case 12: // 夜战导弹
      result = shipDamage * skill;
      break;
  }

  return result;
}

/**
 * 计算敌方装甲减伤系数（仅用于导弹战）
 */
export function calculateEnemyArmorReduceDamage(
  armor: number,
  penetrationCoefficient: number
): number {
  const denominator = 1 + Math.pow(armor / (65 * penetrationCoefficient), 5.4);
  return 1 / Math.sqrt(denominator);
}

/**
 * 数值限制在区间内
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 获取阵形系数表
 * 根据攻击类型返回对应的5个阵形系数（单纵、复纵、轮形、梯形、单横）
 */
export function getFormationCoefficients(attackType: number): number[] {
  // 阵形系数表索引:
  // 0: 导弹战（开幕）、炮击(非航母)
  // 1: 雷击
  // 2: 夜战
  // 3: 无影响
  
  let formationIndex: number;
  
  switch (attackType) {
    case 0: // 航空战(轰炸机)
    case 1: // 航空战(鱼雷机)
    case 2: // 反潜(轻母航战)
    case 3: // 反潜(驱逐巡洋)
    case 4: // 炮击(航母系)
      formationIndex = 3; // 无影响
      break;
    case 5: // 炮击(其他)
    case 11: // 导弹战
      formationIndex = 0; // 导弹战、炮击
      break;
    case 6: // 昼战雷击
      formationIndex = 1; // 雷击
      break;
    case 7: // 夜战雷击
    case 8: // 夜战巡洋舰炮雷合击
    case 9: // 夜战巡洋舰炮击
    case 10: // 夜战其他炮击
    case 12: // 夜战导弹
      formationIndex = 2; // 夜战
      break;
    default:
      formationIndex = 3;
  }
  
  return [...Constants.FORMATION_COEFFICIENTS[formationIndex]];
}

/**
 * 获取航向系数表
 * 根据攻击类型返回对应的4个航向系数（T有利、同航战、反航战、T不利）
 */
export function getDirectionCoefficients(attackType: number): number[] {
  // 航向系数表索引:
  // 0: 正常情况
  // 1: 无影响
  
  let directionIndex: number;
  
  switch (attackType) {
    case 5: // 炮击(其他)
    case 6: // 昼战雷击
      directionIndex = 0; // 正常情况
      break;
    default:
      directionIndex = 1; // 无影响
  }
  
  return [...Constants.DIRECTION_COEFFICIENTS[directionIndex]];
}

/**
 * 获取浮动系数表
 * 根据攻击类型返回对应的3个浮动系数（下限、平均、上限）
 */
export function getFloatCoefficients(attackType: number, useSuperHeavyShell: boolean = false): number[] {
  // 如果使用超重弹（仅对炮击非航母有效）
  if (useSuperHeavyShell && attackType === 5) {
    return [...Constants.SUPERHEAVY_SHELL_COEFFICIENTS];
  }
  return [...Constants.FLOAT_COEFFICIENTS[attackType]];
}

/**
 * 获取穿甲系数
 * 根据攻击类型返回对应的穿甲系数
 */
export function getPenetrationCoefficient(attackType: number): number {
  return Constants.PENETRATION_COEFFICIENTS[attackType];
}

/**
 * 获取属性下限计算公式描述
 */
export function getLimitFormula(attackType: number): string {
  const formulas: Record<number, string> = {
    5: '火力 = 基础攻击力 - 5',
    6: '鱼雷 = 基础攻击力 - 5',
    7: '鱼雷 = 基础攻击力 - 10',
    8: '火力 + 鱼雷 = 基础攻击力 - 10',
    9: '火力 = 基础攻击力 - 10',
    10: '火力 = 基础攻击力 - 10',
    11: '基础火力 + 导弹火力 × 3 = 基础攻击力',
    12: '基础火力 + 导弹火力 × 3 = 基础攻击力',
  };
  
  return formulas[attackType] || '不可用';
}

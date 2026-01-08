/**
 * 属性下限计算器类型定义和常量
 */
import { CalculationContext } from '../../core/shared/models';

// 阵形名称
export const FORMATION_NAMES = ['单纵阵', '复纵阵', '轮形阵', '梯形阵', '单横阵'];

// 航向名称
export const DIRECTION_NAMES_LIMIT = ['T有利', '同航战', '反航战', 'T不利'];

// 支持属性下限计算的攻击类型
export const SUPPORTED_ATTACK_TYPES = [5, 6, 7, 8, 9, 10, 11, 12];

// 攻击类型对应的属性名称
export const ATTACK_TYPE_ATTR_MAP: Record<number, string> = {
  5: '火力',
  6: '鱼雷',
  7: '鱼雷',
  8: '火力+鱼雷',
  9: '火力',
  10: '火力',
  11: '基础火力 + 导弹火力 × 3',
  12: '基础火力 + 导弹火力 × 3',
};

// 攻击类型对应的基础攻击力偏移量
export function getDecrement(attackType: number): number {
  if (attackType >= 11) return 0;
  if (attackType >= 7 && attackType <= 10) return 10;
  return 5;
}

// 公式说明
export const FORMULA_EXPLANATIONS: Record<number, string> = {
  0: '昼战炮击基础攻击力 = 火力 + 5',
  1: '昼战雷击基础攻击力 = 雷装',
  2: '闭幕雷基础攻击力 = 雷装',
  3: '先制反潜基础攻击力 = √(2 × 对潜) × (装备系数) + 装备攻击力',
  4: '开幕空袭基础攻击力 = 轰炸 + 雷装 × 0.8 + 爆伤 × 1.3',
  5: '夜战炮击基础攻击力 = 火力 + 雷装',
  6: '夜战雷击基础攻击力 = 火力 + 雷装',
  7: '昼战导弹基础攻击力 = √(2 × 对空)',
  8: '夜战导弹基础攻击力 = 火力 + √(2 × 对空)',
  9: '反潜轮基础攻击力 = √(2 × 对潜) × (装备系数) + 装备攻击力',
  10: '第一轮航空基础攻击力 = 轰炸 + 雷装 × 0.8 + 爆伤 × 1.3',
  11: '第二轮航空基础攻击力 = 轰炸 + 雷装 × 0.8 + 爆伤 × 1.3',
  12: '防空炮火基础攻击力 = 对空'
};

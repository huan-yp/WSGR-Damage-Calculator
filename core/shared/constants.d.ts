/**
 * 常量定义模块
 */
export declare const VERSION = "v1.5-ts";
export declare const ATTACK_TYPES: readonly ["航空战(轰炸机)", "航空战(鱼雷机)", "昼战反潜(轻母航战)", "昼战反潜(驱逐巡洋)", "昼战炮击(航母系)", "昼战炮击(其他)", "昼战雷击", "夜战雷击", "夜战巡洋舰炮雷合击", "夜战巡洋舰炮击", "夜战其他炮击", "导弹战", "夜战导弹"];
export declare const FUNCTION_TYPES: readonly ["计算伤害", "计算属性下限"];
export declare const DIRECTION_NAMES: readonly ["T有利", "同航战", "反航战", "T不利"];
export declare const CONDITION_NAMES: readonly ["未暴击下限", "未暴击平均", "未暴击上限", "暴击下限", "暴击平均", "暴击上限", "未暴击", "暴击"];
export declare const AIR_DOMAIN_COEFFICIENTS: readonly [1.1, 1.05, 1, 0.95, 0.9];
export declare const SHIP_DAMAGE_COEFFICIENTS: readonly [1, 0.6, 0.3];
export declare const FORMATION_COEFFICIENTS: readonly [readonly [1, 0.8, 0.75, 1, 0.8], readonly [1, 0.9, 0.8, 1, 0.8], readonly [1.1, 0.9, 1, 1, 1], readonly [1, 1, 1, 1, 1]];
export declare const DIRECTION_COEFFICIENTS: readonly [readonly [1.15, 1, 0.8, 0.65], readonly [1, 1, 1, 1]];
export declare const FLOAT_COEFFICIENTS: readonly [readonly [0.89, 1.055, 1.22], readonly [0.89, 1.055, 1.22], readonly [0.89, 1.055, 1.22], readonly [0.89, 1.055, 1.22], readonly [0.89, 1.055, 1.22], readonly [0.89, 1.055, 1.22], readonly [0.89, 1.055, 1.22], readonly [2.4, 2.7, 3], readonly [1.2, 1.5, 1.8], readonly [2.4, 3, 3.6], readonly [1.2, 1.5, 1.8], readonly [0.89, 1.055, 1.22], readonly [1.2, 1.35, 1.5]];
export declare const PENETRATION_COEFFICIENTS: readonly [1, 2, 10, 2, 1, 0.6, 1, 1, 0.8, 0.6, 0.6, 0, 1];
export declare const BATK_ENABLE_CONFIG: readonly [readonly [1, 1, 0, 0, 0], readonly [1, 1, 0, 0, 0], readonly [1, 1, 1, 0, 0], readonly [1, 1, 0, 0, 0], readonly [1, 1, 1, 1, 1], readonly [1, 0, 0, 0, 0], readonly [1, 0, 0, 0, 0], readonly [1, 0, 0, 0, 0], readonly [1, 1, 0, 0, 0], readonly [1, 0, 0, 0, 0], readonly [1, 0, 0, 0, 0], readonly [1, 1, 1, 0, 0], readonly [1, 1, 1, 0, 0]];
export declare const BATK_LABELS: readonly [readonly ["放飞机数：", "该格轰炸：", "不可用", "不可用", "不可用"], readonly ["放飞机数：", "该格鱼雷：", "不可用", "不可用", "不可用"], readonly ["舰船对潜：", "装备对潜", "索敌", "不可用", "不可用"], readonly ["舰船对潜：", "深弹对潜：", "不可用", "不可用", "不可用"], readonly ["火力：", "轰炸：", "鱼雷：", "对方总对空值：", "系数α(0~1)："], readonly ["火力：", "不可用", "不可用", "不可用", "不可用"], readonly ["鱼雷：", "不可用", "不可用", "不可用", "不可用"], readonly ["鱼雷：", "不可用", "不可用", "不可用", "不可用"], readonly ["火力：", "鱼雷：", "不可用", "不可用", "不可用"], readonly ["火力：", "不可用", "不可用", "不可用", "不可用"], readonly ["火力：", "不可用", "不可用", "不可用", "不可用"], readonly ["舰船火力：", "发射器火力：", "单格导弹火力：", "不可用", "不可用"], readonly ["舰船火力：", "发射器火力：", "单格导弹火力：", "不可用", "不可用"]];
export declare const COEFFICIENT_ENABLE_CONFIG: readonly [readonly [0, 0, 1, 0, 1, 0, 1, 1, 1, 1], readonly [0, 0, 1, 0, 1, 1, 1, 1, 1, 1], readonly [0, 0, 0, 1, 1, 0, 0, 1, 1, 1], readonly [0, 0, 0, 1, 1, 0, 1, 1, 1, 1], readonly [0, 0, 1, 0, 1, 0, 0, 1, 1, 1], readonly [1, 1, 0, 0, 1, 0, 1, 1, 1, 1], readonly [1, 1, 0, 0, 1, 0, 1, 1, 1, 1], readonly [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], readonly [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], readonly [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], readonly [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], readonly [1, 0, 0, 0, 0, 0, 1, 1, 1, 1], readonly [1, 0, 0, 0, 0, 0, 1, 1, 1, 1]];
export declare const SUPERHEAVY_SHELL_COEFFICIENTS: readonly [0.89, 1.18, 1.47];
export declare const DEFAULT_CRIT_COEFFICIENT: 1.5;

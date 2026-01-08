/**
 * 数据模型定义
 */

/**
 * 基础攻击力参数
 */
export interface BATKParams {
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
}

/**
 * 系数参数
 */
export interface CoefficientParams {
  airDomain: number; // 制空系数
  sonarRaw: number; // 声纳装备反潜值
  sonar: number; // 计算后的声纳系数
  ammoPercent: number; // 弹药百分数
  ammo: number; // 计算后的弹药系数
  torpedoBomber: number; // 鱼雷机系数
  shipDamage: number; // 舰损系数
  skill: number; // 技能攻击力系数
  skillPercent: number; // 技能百分数
  crit: number; // 暴击系数
  critPercent: number; // 额外暴击百分数
  float: number[]; // 浮动系数 [下限, 平均, 上限]
  pene: number; // 穿甲系数
  penetrationAdd: number; // 额外穿甲系数百分数
}

/**
 * 其他参数
 */
export interface OtherParams {
  armor: number; // 敌方装甲
  enemyHp: number; // 敌方血量
  skillDamageMult: number; // 技能伤害倍率
  skillDamageAdd: number; // 技能伤害倍率百分数
  // 航空战减伤参数
  antiAirValue: number; // 减伤对空值 = 本体对空+2.5*∑(装备对空值*防空倍率)
  shipSizeType: number; // 船型：0=大型，1=中型，2=小型
  isArmoredCarrier: boolean; // 是否装母（对轰炸机额外减伤0.25）
}

/**
 * 计算结果（3维数组：[条件状态][航向][阵形]）
 */
export type ResultMatrix3D = number[][][];

/**
 * 计算结果（4维数组：[不同属性][条件状态][航向][阵形]）
 */
export type ResultMatrix4D = number[][][][];

/**
 * 属性下限计算参数
 */
export interface LimitParams {
  formationCoeff: number;  // 阵形系数
  directionCoeff: number;  // 航向系数
  critCoeff: number;       // 暴击系数
  skillCoeff: number;      // 技能系数
  floatCoeff: number;      // 浮动系数
}

/**
 * 完整的计算上下文
 */
export interface CalculationContext {
  // 选择的参数
  attackType: number;
  functionType: number;
  useSuperHeavyShell: boolean;

  // 输入参数
  batk: BATKParams;
  coefficient: CoefficientParams;
  other: OtherParams;
  limitParams: LimitParams;  // 属性下限计算参数

  // 计算结果
  batkValue: number; // 计算后的基础攻击力
  coefficientResults: ResultMatrix3D; // 系数乘积结果
  atkResults: ResultMatrix3D; // 实际攻击力结果
  penetrationDamageResults: ResultMatrix3D; // 穿甲伤害结果
  middleDamagePercent: ResultMatrix3D; // 中破率
  heavyDamagePercent: ResultMatrix3D; // 大破率
  sinkPercent: ResultMatrix3D; // 击沉率
  batkLimits: ResultMatrix3D; // 基础攻击力下限

  // 临时变量
  tmpCoefficient: number; // 除了阵形、航向和浮动系数以外的系数乘积
  coefficientResultsTmp: number[]; // 浮动值与暴击的乘积
  directionCoefficients: number[]; // 当前航向系数
  formationCoefficients: number[]; // 当前阵形系数
}

/**
 * 初始化计算上下文
 */
export function createInitialContext(): CalculationContext {
  return {
    attackType: 0,
    functionType: 0,
    useSuperHeavyShell: false,
    batk: { v1: 0, v2: 0, v3: 0, v4: 0, v5: 0 },
    coefficient: {
      airDomain: 1.1,
      sonarRaw: 0,
      sonar: 1,
      ammoPercent: 100,
      ammo: 1,
      torpedoBomber: 1,
      shipDamage: 1,
      skill: 1,
      skillPercent: 0,
      crit: 1.5,
      critPercent: 0,
      float: [0.89, 1.055, 1.22],
      pene: 0.6,
      penetrationAdd: 0,
    },
    other: {
      armor: 0,
      enemyHp: 10,
      skillDamageMult: 1,
      skillDamageAdd: 0,
      antiAirValue: 0,
      shipSizeType: 0, // 默认大型
      isArmoredCarrier: false,
    },
    limitParams: {
      formationCoeff: 1,
      directionCoeff: 1,
      critCoeff: 1.5,
      skillCoeff: 1,
      floatCoeff: 1,
    },
    batkValue: 0,
    coefficientResults: Array(6)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    atkResults: Array(6)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    penetrationDamageResults: Array(6)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    middleDamagePercent: Array(2)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    heavyDamagePercent: Array(2)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    sinkPercent: Array(2)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    batkLimits: Array(6)
      .fill(null)
      .map(() => Array(4).fill(null).map(() => Array(5).fill(0))),
    tmpCoefficient: 1,
    coefficientResultsTmp: Array(6).fill(0),
    directionCoefficients: [1, 1, 1, 1],
    formationCoefficients: [1, 1, 1, 1, 1],
  };
}

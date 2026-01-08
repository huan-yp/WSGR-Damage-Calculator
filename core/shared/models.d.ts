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
    airDomain: number;
    sonarRaw: number;
    sonar: number;
    ammoPercent: number;
    ammo: number;
    torpedoBomber: number;
    shipDamage: number;
    skill: number;
    skillPercent: number;
    crit: number;
    critPercent: number;
    float: number[];
    pene: number;
    penetrationAdd: number;
}
/**
 * 其他参数
 */
export interface OtherParams {
    armor: number;
    enemyHp: number;
    skillDamageMult: number;
    skillDamageAdd: number;
    antiAirValue: number;
    shipSizeType: number;
    isArmoredCarrier: boolean;
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
    formationCoeff: number;
    directionCoeff: number;
    critCoeff: number;
    skillCoeff: number;
    floatCoeff: number;
}
/**
 * 完整的计算上下文
 */
export interface CalculationContext {
    attackType: number;
    functionType: number;
    useSuperHeavyShell: boolean;
    batk: BATKParams;
    coefficient: CoefficientParams;
    other: OtherParams;
    limitParams: LimitParams;
    batkValue: number;
    coefficientResults: ResultMatrix3D;
    atkResults: ResultMatrix3D;
    penetrationDamageResults: ResultMatrix3D;
    middleDamagePercent: ResultMatrix3D;
    heavyDamagePercent: ResultMatrix3D;
    sinkPercent: ResultMatrix3D;
    batkLimits: ResultMatrix3D;
    tmpCoefficient: number;
    coefficientResultsTmp: number[];
    directionCoefficients: number[];
    formationCoefficients: number[];
}
/**
 * 初始化计算上下文
 */
export declare function createInitialContext(): CalculationContext;

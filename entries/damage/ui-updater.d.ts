import { CalculationContext } from '../../core/shared/models';
/**
 * 更新 UI 可见性
 */
export declare function updateUIVisibility(context: CalculationContext): void;
/**
 * 更新公式显示
 */
export declare function updateFormulas(context: CalculationContext): void;
/**
 * 更新阵形和航向系数显示
 */
export declare function updateFormationAndDirectionCoefficients(context: CalculationContext): void;
/**
 * 计算航空战减伤系数值
 */
export declare function calculateAirstrikeReductionValue(context: CalculationContext): number;
/**
 * 更新航空战减伤系数显示
 */
export declare function updateAirstrikeReduction(context: CalculationContext): void;
/**
 * 从 UI 更新系数
 */
export declare function updateCoefficientsFromUI(context: CalculationContext): void;

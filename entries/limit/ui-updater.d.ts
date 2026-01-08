/**
 * UI 更新模块
 */
import { CalculationContext } from '../../core/shared/models';
/**
 * 更新 UI 显示
 */
export declare function updateUIVisibility(context: CalculationContext): void;
/**
 * 更新系数显示（只读展示）
 */
export declare function updateCoefficientDisplay(context: CalculationContext): void;
/**
 * 更新公式显示
 */
export declare function updateFormulas(context: CalculationContext): void;
/**
 * 从 UI 收集参数
 */
export declare function collectUIParams(context: CalculationContext): void;

import { CalculationContext } from '../../core/shared/models';
/**
 * 处理 BATK 输入变化
 */
export declare function onBATKChanged(context: CalculationContext, index: number, e: Event, onCalculate: () => void): void;
/**
 * 处理系数输入变化
 */
export declare function onCoefficientChanged(context: CalculationContext, type: string, e: Event, onCalculate: () => void): void;
/**
 * 处理其他参数输入变化
 */
export declare function onOtherParamChanged(context: CalculationContext, type: string, e: Event, onCalculate: () => void): void;
/**
 * 初始化下拉选项
 */
export declare function initializeSelects(): void;
/**
 * 初始化事件监听
 */
export declare function initializeEventListeners(context: CalculationContext, onCalculate: () => void): void;

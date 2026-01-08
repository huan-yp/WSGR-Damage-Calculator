/**
 * 伤害计算器类型定义
 */
import { CalculationContext } from '../../core/shared/models';
export declare const FORMATION_NAMES: string[];
export interface DamageCalculatorState {
    context: CalculationContext;
    onCalculate: () => void;
}

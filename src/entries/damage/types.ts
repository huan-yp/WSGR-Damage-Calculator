/**
 * 伤害计算器类型定义
 */
import { CalculationContext } from '../../core/shared/models';

// 阵形名称
export const FORMATION_NAMES = ['单纵阵', '复纵阵', '轮形阵', '梯形阵', '单横阵'];

// 模块间共享的状态接口
export interface DamageCalculatorState {
  context: CalculationContext;
  onCalculate: () => void;
}

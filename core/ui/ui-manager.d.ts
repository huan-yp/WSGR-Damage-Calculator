/**
 * UI 管理模块
 */
import { CalculationContext } from "../shared/models";
export declare class UIManager {
    private context;
    constructor(context: CalculationContext);
    /**
     * 根据攻击类型获取启用配置
     */
    getEnabledBATKFields(attackType: number): number[];
    /**
     * 根据攻击类型获取字段标签
     */
    getBATKLabels(attackType: number): string[];
    /**
     * 根据攻击类型获取启用系数配置
     */
    getEnabledCoefficientFields(attackType: number): number[];
    /**
     * 根据攻击类型获取阵形系数
     */
    getFormationCoefficients(attackType: number, coeffType: number): number[];
    /**
     * 根据攻击类型获取航向系数
     */
    getDirectionCoefficients(attackType: number, coeffType?: number): number[];
    /**
     * 格式化输出伤害计算结果
     */
    formatDamageOutput(): string;
    /**
     * 格式化输出属性下限结果
     */
    formatLimitOutput(): string;
}

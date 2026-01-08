/**
 * 计算逻辑模块
 */
import { CalculationContext } from '../../core/shared/models';
import { calculateBATKLimits, calculateCoefficientTmp } from '../../core/damage';
import * as Calculator from '../../core/shared/calculator';

/**
 * 初始化计算所需的上下文参数
 */
export function initializeCalculationContext(context: CalculationContext): void {
  const attackType = context.attackType;
  
  // 设置阵形系数和航向系数数组
  context.formationCoefficients = Calculator.getFormationCoefficients(attackType);
  context.directionCoefficients = Calculator.getDirectionCoefficients(attackType);
  
  // 设置浮动系数
  const floatCoeffs = Calculator.getFloatCoefficients(attackType, false);
  context.coefficient.float = [...floatCoeffs];
  
  // 设置暴击系数
  context.coefficient.crit = context.limitParams.critCoeff;
  
  // 设置技能系数
  context.coefficient.skill = context.limitParams.skillCoeff;
  
  // 设置穿甲系数
  context.coefficient.pene = Calculator.getPenetrationCoefficient(attackType);
  
  // 设置弹药系数（默认满弹）
  context.coefficient.ammo = 1;
  
  // 设置舰损系数（默认未中破）
  context.coefficient.shipDamage = 1;
  
  // 计算临时系数（除阵形、航向、浮动外的系数乘积）
  context.tmpCoefficient = Calculator.calculateTmpCoefficient(
    attackType,
    context.coefficient.airDomain,
    context.coefficient.sonar,
    context.coefficient.ammo,
    context.coefficient.torpedoBomber,
    context.coefficient.shipDamage,
    context.coefficient.skill
  );
  
  // 计算浮动系数与暴击的乘积
  context.coefficientResultsTmp = calculateCoefficientTmp(context);
}

/**
 * 执行属性下限计算
 */
export function doLimitCalculation(context: CalculationContext): void {
  // 初始化计算所需的上下文参数
  initializeCalculationContext(context);

  // 属性下限计算
  calculateBATKLimits(context);
}

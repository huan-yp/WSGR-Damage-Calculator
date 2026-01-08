/**
 * UI 更新模块
 */
import { CalculationContext } from '../../core/shared/models';
import * as Calculator from '../../core/shared/calculator';
import { FORMATION_NAMES, DIRECTION_NAMES_LIMIT, FORMULA_EXPLANATIONS } from './types';

/**
 * 更新 UI 显示
 */
export function updateUIVisibility(context: CalculationContext): void {
  // 更新公式显示
  updateFormulas(context);
  
  // 更新阵形系数和航向系数显示
  updateCoefficientDisplay(context);
}

/**
 * 更新系数显示（只读展示）
 */
export function updateCoefficientDisplay(context: CalculationContext): void {
  const attackType = context.attackType;
  
  // 获取阵形系数
  const formationCoeffs = Calculator.getFormationCoefficients(attackType);
  const formationDisplay = document.getElementById('formation-coeff-display');
  if (formationDisplay) {
    formationDisplay.innerHTML = FORMATION_NAMES.map((name, i) => 
      `<span class="coeff-badge">${name}: ${formationCoeffs[i]}</span>`
    ).join('');
  }
  
  // 获取航向系数
  const directionCoeffs = Calculator.getDirectionCoefficients(attackType);
  const directionDisplay = document.getElementById('direction-coeff-display');
  if (directionDisplay) {
    directionDisplay.innerHTML = DIRECTION_NAMES_LIMIT.map((name, i) => 
      `<span class="coeff-badge">${name}: ${directionCoeffs[i]}</span>`
    ).join('');
  }
}

/**
 * 更新公式显示
 */
export function updateFormulas(context: CalculationContext): void {
  const attackType = context.attackType;

  // 更新属性下限公式
  const formulaDisplay = document.getElementById('formula-display');
  if (formulaDisplay) {
    formulaDisplay.innerHTML = Calculator.getLimitFormula(attackType);
  }

  // 更新公式说明
  const formulaExplain = document.getElementById('formula-explain');
  if (formulaExplain) {
    formulaExplain.textContent = FORMULA_EXPLANATIONS[attackType] || '未知攻击类型';
  }
}

/**
 * 从 UI 收集参数
 */
export function collectUIParams(context: CalculationContext): void {
  // 目标伤害 -> 敌方HP
  const targetDamage = document.getElementById('target-damage') as HTMLInputElement;
  if (targetDamage) {
    context.other.enemyHp = parseFloat(targetDamage.value) || 100;
  }

  // 装甲
  const armor = document.getElementById('armor') as HTMLInputElement;
  if (armor) {
    context.other.armor = parseFloat(armor.value) || 0;
  }

  // 暴击系数和技能系数
  const critInput = document.getElementById('coeff-crit') as HTMLInputElement;
  if (critInput) {
    context.limitParams.critCoeff = parseFloat(critInput.value) || 1.5;
  }
  
  const skillInput = document.getElementById('coeff-skill') as HTMLInputElement;
  if (skillInput) {
    context.limitParams.skillCoeff = parseFloat(skillInput.value) || 1;
  }
}

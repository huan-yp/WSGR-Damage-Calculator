/**
 * UI 更新模块
 */
import { COEFFICIENT_ENABLE_CONFIG, BATK_LABELS, BATK_ENABLE_CONFIG } from '../../core/shared/constants';
import * as Calculator from '../../core/shared/calculator';
import { CalculationContext } from '../../core/shared/models';
import { FORMATION_NAMES } from './types';

/**
 * 更新 UI 可见性
 */
export function updateUIVisibility(context: CalculationContext): void {
  const attackType = context.attackType;
  const config = COEFFICIENT_ENABLE_CONFIG[attackType];

  // 显示/隐藏系数区域
  const coeffElements = [
    { id: 'coeff-airdomain', enabled: config[2] },
    { id: 'coeff-sonar', enabled: config[3] },
    { id: 'coeff-ammo', enabled: config[4] },
    { id: 'coeff-tb', enabled: config[5] },
    { id: 'coeff-damage', enabled: config[6] },
    { id: 'coeff-skill', enabled: config[7] },
    { id: 'coeff-crit', enabled: config[8] },
    { id: 'coeff-float', enabled: config[9] },
  ];

  coeffElements.forEach(({ id, enabled }) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = enabled ? '' : 'none';
    }
  });

  // 显示/隐藏航空战减伤参数（仅对航空战轰炸机和鱼雷机）
  const airstrikeParams = document.getElementById('airstrike-params');
  if (airstrikeParams) {
    airstrikeParams.style.display = (attackType === 0 || attackType === 1) ? '' : 'none';
  }

  // 更新 BATK 标签
  const batkLabels = BATK_LABELS[attackType];
  const batkEnables = BATK_ENABLE_CONFIG[attackType];

  for (let i = 0; i < 5; i++) {
    const label = document.getElementById(`lbl-batk-v${i + 1}`);
    const input = document.getElementById(`batk-v${i + 1}`) as HTMLInputElement;
    const group = input?.parentElement;

    if (label && input && group) {
      label.textContent = batkLabels[i];
      group.style.display = batkEnables[i] ? '' : 'none';
    }
  }

  // 更新公式显示
  updateFormulas(context);
  
  // 更新航空战减伤系数显示
  updateAirstrikeReduction(context);
}

/**
 * 更新公式显示
 */
export function updateFormulas(context: CalculationContext): void {
  const attackType = context.attackType;

  // 更新 BATK 公式
  const formulaLabel = document.getElementById('lbl-formula');
  if (formulaLabel) {
    formulaLabel.textContent = Calculator.getBATKFormula(attackType, context.batk);
  }

  // 更新系数公式
  const coeffFormulaLabel = document.getElementById('lbl-i-formula');
  if (coeffFormulaLabel) {
    coeffFormulaLabel.textContent = Calculator.getCoefficientFormula(attackType);
  }

  // 更新浮动系数显示
  const floatLabel = document.getElementById('lbl-i-float-result');
  if (floatLabel) {
    const floatCoeffs = Calculator.getFloatCoefficients(attackType, context.useSuperHeavyShell);
    floatLabel.textContent = `${floatCoeffs[0]} ~ ${floatCoeffs[2]}`;
  }

  // 更新穿甲系数显示
  const peneLabel = document.getElementById('lbl-pene');
  if (peneLabel) {
    peneLabel.textContent = Calculator.getPenetrationCoefficient(attackType).toString();
  }

  // 更新阵形和航向系数
  updateFormationAndDirectionCoefficients(context);
}

/**
 * 更新阵形和航向系数显示
 */
export function updateFormationAndDirectionCoefficients(context: CalculationContext): void {
  const attackType = context.attackType;
  
  // 获取当前攻击类型的阵形系数
  const formationCoeffs = Calculator.getFormationCoefficients(attackType);
  for (let i = 0; i < 5; i++) {
    const span = document.getElementById(`i-formation-${i + 1}`);
    if (span) {
      span.textContent = formationCoeffs[i].toString();
    }
  }
  context.formationCoefficients = formationCoeffs;

  // 获取当前攻击类型的航向系数
  const directionCoeffs = Calculator.getDirectionCoefficients(attackType);
  for (let i = 0; i < 4; i++) {
    const span = document.getElementById(`i-direction-${i + 1}`);
    if (span) {
      span.textContent = directionCoeffs[i].toString();
    }
  }
  context.directionCoefficients = directionCoeffs;
}

/**
 * 计算航空战减伤系数值
 */
export function calculateAirstrikeReductionValue(context: CalculationContext): number {
  const attackType = context.attackType;
  if (attackType !== 0 && attackType !== 1) return 1;
  
  const antiAirValue = context.other.antiAirValue;
  const shipSizeType = context.other.shipSizeType;
  const isArmoredCarrier = context.other.isArmoredCarrier;
  const isBomber = attackType === 0;
  
  const shipSizeBase = [150, 375, 1500][shipSizeType] || 150;
  let reduction = shipSizeBase / (shipSizeBase + antiAirValue);
  
  if (isArmoredCarrier && isBomber) {
    reduction *= 0.25;
  }
  
  return reduction;
}

/**
 * 更新航空战减伤系数显示
 */
export function updateAirstrikeReduction(context: CalculationContext): void {
  const label = document.getElementById('lbl-airstrike-reduction');
  if (label) {
    const reduction = calculateAirstrikeReductionValue(context);
    label.textContent = reduction.toFixed(4);
  }
}

/**
 * 从 UI 更新系数
 */
export function updateCoefficientsFromUI(context: CalculationContext): void {
  // 制空系数
  const airdomainRadios = document.querySelectorAll('input[name="airdomain"]');
  airdomainRadios.forEach((radio) => {
    if ((radio as HTMLInputElement).checked) {
      const value = parseInt((radio as HTMLInputElement).value);
      context.coefficient.airDomain = [1.1, 1.05, 1.0, 0.95, 0.9][value];
    }
  });

  // 舰损系数
  const shipDamageRadios = document.querySelectorAll('input[name="shipdamage"]');
  shipDamageRadios.forEach((radio) => {
    if ((radio as HTMLInputElement).checked) {
      const value = parseInt((radio as HTMLInputElement).value);
      context.coefficient.shipDamage = [1, 0.6, 0.3][value];
    }
  });

  // 超重弹
  const superHeavyShell = document.getElementById('use-superheavy-shell') as HTMLInputElement;
  if (superHeavyShell) {
    context.useSuperHeavyShell = superHeavyShell.checked;
  }

  // 更新浮动系数
  const floatCoeffs = Calculator.getFloatCoefficients(context.attackType, context.useSuperHeavyShell);
  context.coefficient.float = [...floatCoeffs];

  // 航空战减伤参数
  const antiAirInput = document.getElementById('anti-air-value') as HTMLInputElement;
  if (antiAirInput) {
    context.other.antiAirValue = parseFloat(antiAirInput.value) || 0;
  }
  
  const shipSizeSelect = document.getElementById('ship-size-type') as HTMLSelectElement;
  if (shipSizeSelect) {
    context.other.shipSizeType = parseInt(shipSizeSelect.value) || 0;
  }
  
  const armoredCarrierCheckbox = document.getElementById('is-armored-carrier') as HTMLInputElement;
  if (armoredCarrierCheckbox) {
    context.other.isArmoredCarrier = armoredCarrierCheckbox.checked;
  }
}

/**
 * 事件处理模块
 */
import { ATTACK_TYPES } from '../../core/shared/constants';
import { CalculationContext } from '../../core/shared/models';
import * as Calculator from '../../core/shared/calculator';
import { 
  updateUIVisibility, 
  updateFormulas, 
  updateCoefficientsFromUI, 
  updateAirstrikeReduction 
} from './ui-updater';

/**
 * 处理 BATK 输入变化
 */
export function onBATKChanged(
  context: CalculationContext, 
  index: number, 
  e: Event,
  onCalculate: () => void
): void {
  const input = e.target as HTMLInputElement;
  const value = parseFloat(input.value) || 0;

  if (index === 1) context.batk.v1 = value;
  else if (index === 2) context.batk.v2 = value;
  else if (index === 3) context.batk.v3 = value;
  else if (index === 4) context.batk.v4 = value;
  else if (index === 5) context.batk.v5 = value;

  // 计算并更新 BATK 结果
  const result = Calculator.calculateBATK(context.attackType, context.batk);
  context.batkValue = result;

  const resultLabel = document.getElementById('lbl-batk-result');
  if (resultLabel) {
    resultLabel.textContent = result.toString();
  }
  
  // 触发实时计算
  onCalculate();
}

/**
 * 处理系数输入变化
 */
export function onCoefficientChanged(
  context: CalculationContext, 
  type: string, 
  e: Event,
  onCalculate: () => void
): void {
  const input = e.target as HTMLInputElement;
  const value = parseFloat(input.value) || 0;

  switch (type) {
    case 'sonar':
      context.coefficient.sonarRaw = value;
      context.coefficient.sonar = Calculator.calculateSonarCoefficient(value);
      const sonarResult = document.getElementById('lbl-i-sonar-result');
      if (sonarResult) {
        sonarResult.textContent = `√(2 × ${value}) = ${context.coefficient.sonar.toFixed(3)}`;
      }
      break;

    case 'ammo':
      context.coefficient.ammoPercent = value;
      context.coefficient.ammo = Calculator.calculateAmmoCoefficient(value);
      const ammoResult = document.getElementById('lbl-i-ammo-result');
      if (ammoResult) {
        ammoResult.textContent = `${value}% → ${context.coefficient.ammo.toFixed(3)}`;
      }
      break;

    case 'tb':
      context.coefficient.torpedoBomber = Math.max(0.5, Math.min(1, value));
      break;

    case 'skill':
      context.coefficient.skillPercent = value;
      context.coefficient.skill = 1 + value / 100;
      const skillResult = document.getElementById('lbl-i-skill-result');
      if (skillResult) {
        skillResult.textContent = `${(context.coefficient.skill * 100).toFixed(0)}%`;
      }
      break;

    case 'crit':
      context.coefficient.critPercent = value;
      context.coefficient.crit = 1.5 + value / 100;
      const critResult = document.getElementById('lbl-i-crit-result');
      if (critResult) {
        critResult.textContent = `${(context.coefficient.crit * 100).toFixed(0)}%`;
      }
      break;
  }
  
  // 触发实时计算
  onCalculate();
}

/**
 * 处理其他参数输入变化
 */
export function onOtherParamChanged(
  context: CalculationContext, 
  type: string, 
  e: Event,
  onCalculate: () => void
): void {
  const input = e.target as HTMLInputElement;
  const value = parseFloat(input.value) || 0;

  switch (type) {
    case 'armor':
      context.other.armor = value;
      break;

    case 'enemyhp':
      context.other.enemyHp = Math.max(1, value);
      break;

    case 'skill-mult':
      context.other.skillDamageAdd = value;
      context.other.skillDamageMult = 1 + value / 100;
      const skillMultResult = document.getElementById('lbl-skill-result');
      if (skillMultResult) {
        skillMultResult.textContent = `${(context.other.skillDamageMult * 100).toFixed(0)}%`;
      }
      break;

    case 'pene':
      context.coefficient.penetrationAdd = value;
      const basePene = Calculator.getPenetrationCoefficient(context.attackType);
      context.coefficient.pene = basePene + value / 100;
      const peneResult = document.getElementById('lbl-pene-result');
      if (peneResult) {
        peneResult.textContent = context.coefficient.pene.toFixed(2);
      }
      break;
  }
  
  // 触发实时计算
  onCalculate();
}

/**
 * 初始化下拉选项
 */
export function initializeSelects(): void {
  const attackSelect = document.getElementById('attack-type') as HTMLSelectElement;

  // 填充攻击类型
  ATTACK_TYPES.forEach((type: string, index: number) => {
    const option = document.createElement('option');
    option.value = index.toString();
    option.textContent = type;
    attackSelect.appendChild(option);
  });
}

/**
 * 初始化事件监听
 */
export function initializeEventListeners(
  context: CalculationContext,
  onCalculate: () => void
): void {
  // 攻击类型变化
  const attackSelect = document.getElementById('attack-type') as HTMLSelectElement;
  attackSelect?.addEventListener('change', (e) => {
    context.attackType = parseInt((e.target as HTMLSelectElement).value);
    context.coefficient.pene = Calculator.getPenetrationCoefficient(context.attackType);
    updateUIVisibility(context);
    onCalculate();
  });

  // BATK 输入
  for (let i = 1; i <= 5; i++) {
    const input = document.getElementById(`batk-v${i}`);
    input?.addEventListener('input', (e) => onBATKChanged(context, i, e, onCalculate));
  }

  // 系数输入
  const coeffInputs = [
    { id: 'i-sonar', type: 'sonar' },
    { id: 'i-ammo', type: 'ammo' },
    { id: 'i-tb', type: 'tb' },
    { id: 'i-skill', type: 'skill' },
    { id: 'i-crit', type: 'crit' },
  ];

  coeffInputs.forEach(({ id, type }) => {
    const input = document.getElementById(id);
    input?.addEventListener('input', (e) => onCoefficientChanged(context, type, e, onCalculate));
  });

  // 其他参数输入
  const otherInputs = [
    { id: 'armor', type: 'armor' },
    { id: 'enemyhp', type: 'enemyhp' },
    { id: 'skill-mult', type: 'skill-mult' },
    { id: 'pene', type: 'pene' },
  ];

  otherInputs.forEach(({ id, type }) => {
    const input = document.getElementById(id);
    input?.addEventListener('input', (e) => onOtherParamChanged(context, type, e, onCalculate));
  });

  // 超重弹复选框
  const superHeavyShell = document.getElementById('use-superheavy-shell');
  superHeavyShell?.addEventListener('change', () => {
    updateFormulas(context);
    onCalculate();
  });

  // 制空系数
  const airdomainRadios = document.querySelectorAll('input[name="airdomain"]');
  airdomainRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateCoefficientsFromUI(context);
      onCalculate();
    });
  });

  // 舰损系数
  const shipDamageRadios = document.querySelectorAll('input[name="shipdamage"]');
  shipDamageRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateCoefficientsFromUI(context);
      onCalculate();
    });
  });

  // 航空战减伤参数
  const antiAirInput = document.getElementById('anti-air-value');
  antiAirInput?.addEventListener('input', () => {
    updateCoefficientsFromUI(context);
    updateAirstrikeReduction(context);
    onCalculate();
  });

  const shipSizeSelect = document.getElementById('ship-size-type');
  shipSizeSelect?.addEventListener('change', () => {
    updateCoefficientsFromUI(context);
    updateAirstrikeReduction(context);
    onCalculate();
  });

  const armoredCarrierCheckbox = document.getElementById('is-armored-carrier');
  armoredCarrierCheckbox?.addEventListener('change', () => {
    updateCoefficientsFromUI(context);
    updateAirstrikeReduction(context);
    onCalculate();
  });
}

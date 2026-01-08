/**
 * 结果渲染模块
 */
import { ATTACK_TYPES, DIRECTION_NAMES } from '../../core/shared/constants';
import { CalculationContext } from '../../core/shared/models';
import { FORMATION_NAMES } from './types';
import { calculateAirstrikeReductionValue } from './ui-updater';

/**
 * 渲染结果到表格
 */
export function renderResultTables(context: CalculationContext): void {
  // 渲染伤害值表格
  const damageContainer = document.getElementById('result-damage');
  if (damageContainer) {
    damageContainer.innerHTML = createDamageTable(context);
  }
  
  // 渲染中破率表格
  const middleContainer = document.getElementById('result-middle');
  if (middleContainer) {
    middleContainer.innerHTML = createPercentTable('中破率', context.middleDamagePercent);
  }
  
  // 渲染大破率表格
  const heavyContainer = document.getElementById('result-heavy');
  if (heavyContainer) {
    heavyContainer.innerHTML = createPercentTable('大破率', context.heavyDamagePercent);
  }
  
  // 渲染击沉率表格
  const sinkContainer = document.getElementById('result-sink');
  if (sinkContainer) {
    sinkContainer.innerHTML = createPercentTable('击沉率', context.sinkPercent);
  }
}

/**
 * 创建伤害值表格HTML（区间显示）
 */
function createDamageTable(context: CalculationContext): string {
  let html = '';
  
  // 基础信息
  html += `<div class="result-info">`;
  html += `<p><strong>攻击类型:</strong> ${ATTACK_TYPES[context.attackType]}</p>`;
  html += `<p><strong>基础攻击力:</strong> ${Math.floor(context.batkValue)} | <strong>穿甲系数:</strong> ${context.coefficient.pene.toFixed(2)} | <strong>舰损系数:</strong> ${context.coefficient.shipDamage}</p>`;
  if (context.attackType === 0 || context.attackType === 1) {
    const reduction = calculateAirstrikeReductionValue(context);
    html += `<p><strong>航空战减伤系数:</strong> ${reduction.toFixed(4)}</p>`;
  }
  html += `</div>`;
  
  // 未暴击伤害区间
  html += `<div class="result-table-wrapper">`;
  html += `<h4 class="result-table-title">未暴击伤害区间</h4>`;
  html += `<table class="result-table">`;
  html += `<thead><tr><th>航向</th>`;
  FORMATION_NAMES.forEach(name => {
    html += `<th>${name}</th>`;
  });
  html += `</tr></thead><tbody>`;
  
  for (let j = 0; j < 4; j++) {
    html += `<tr><td class="row-header">${DIRECTION_NAMES[j]}</td>`;
    for (let k = 0; k < 5; k++) {
      const min = context.penetrationDamageResults[0][j][k];
      const max = context.penetrationDamageResults[2][j][k];
      html += `<td class="value-damage">${min} ~ ${max}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;
  
  // 暴击伤害区间
  html += `<div class="result-table-wrapper">`;
  html += `<h4 class="result-table-title">暴击伤害区间</h4>`;
  html += `<table class="result-table">`;
  html += `<thead><tr><th>航向</th>`;
  FORMATION_NAMES.forEach(name => {
    html += `<th>${name}</th>`;
  });
  html += `</tr></thead><tbody>`;
  
  for (let j = 0; j < 4; j++) {
    html += `<tr><td class="row-header">${DIRECTION_NAMES[j]}</td>`;
    for (let k = 0; k < 5; k++) {
      const min = context.penetrationDamageResults[3][j][k];
      const max = context.penetrationDamageResults[5][j][k];
      html += `<td class="value-damage value-crit">${min} ~ ${max}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;
  
  return html;
}

/**
 * 创建百分比表格HTML（中破/大破/击沉率）
 */
function createPercentTable(title: string, data: number[][][]): string {
  let html = '';
  const conditionLabels = ['未暴击', '暴击'];
  
  for (let i = 0; i < 2; i++) {
    html += `<div class="result-table-wrapper">`;
    html += `<h4 class="result-table-title">${title} - ${conditionLabels[i]}</h4>`;
    html += `<table class="result-table">`;
    html += `<thead><tr><th>航向</th>`;
    FORMATION_NAMES.forEach(name => {
      html += `<th>${name}</th>`;
    });
    html += `</tr></thead><tbody>`;
    
    for (let j = 0; j < 4; j++) {
      html += `<tr><td class="row-header">${DIRECTION_NAMES[j]}</td>`;
      for (let k = 0; k < 5; k++) {
        const value = data[i][j][k];
        let cellClass = 'value-percent';
        if (value >= 100) cellClass = 'value-percent-high';
        else if (value >= 50) cellClass = 'value-percent-mid';
        else if (value > 0) cellClass = 'value-percent-low';
        html += `<td class="${cellClass}">${value.toFixed(2)}%</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table></div>`;
  }
  
  return html;
}

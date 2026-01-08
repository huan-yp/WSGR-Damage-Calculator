/**
 * 结果渲染模块
 */
import { CalculationContext } from '../../core/shared/models';
import { 
  FORMATION_NAMES, 
  DIRECTION_NAMES_LIMIT, 
  ATTACK_TYPE_ATTR_MAP, 
  getDecrement 
} from './types';

/**
 * 渲染结果到表格
 */
export function renderResultTables(context: CalculationContext): void {
  const normalContainer = document.getElementById('result-normal');
  const critContainer = document.getElementById('result-crit');
  
  if (!normalContainer || !critContainer) return;
  
  const attackType = context.attackType;
  const attrName = ATTACK_TYPE_ATTR_MAP[attackType] || '属性';
  const dec = getDecrement(attackType);
  
  // 渲染白字击沉表格
  normalContainer.innerHTML = createResultTable('白字确保击沉下限', attrName, context.batkLimits[0], dec);
  
  // 渲染暴击击沉表格
  critContainer.innerHTML = createResultTable('暴击确保击沉下限', attrName, context.batkLimits[3], dec);
}

/**
 * 创建结果表格HTML
 */
function createResultTable(
  title: string, 
  attrName: string, 
  data: number[][], 
  dec: number
): string {
  let html = `<div class="result-table-wrapper">`;
  html += `<h4 class="result-table-title">${title}</h4>`;
  html += `<p class="result-table-subtitle">计算值为 [${attrName}]</p>`;
  html += `<table class="result-table">`;
  html += `<thead><tr><th>航向</th>`;
  
  FORMATION_NAMES.forEach(name => {
    html += `<th>${name}</th>`;
  });
  html += `</tr></thead><tbody>`;
  
  for (let i = 0; i < 4; i++) {
    html += `<tr><td class="row-header">${DIRECTION_NAMES_LIMIT[i]}</td>`;
    for (let j = 0; j < 5; j++) {
      const val = data[i][j] - dec;
      if (val <= 0) {
        html += `<td class="value-na">无意义</td>`;
      } else {
        html += `<td class="value-good">${val}</td>`;
      }
    }
    html += `</tr>`;
  }
  
  html += `</tbody></table></div>`;
  return html;
}

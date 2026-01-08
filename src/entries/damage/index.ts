/**
 * 伤害计算器入口文件
 */
import '../../styles/main.css';

import { createInitialContext, CalculationContext } from '../../core/shared/models';
import { performDamageCalculation } from '../../core/damage';
import { UIManager } from '../../core/ui';
import { updateUIVisibility, updateCoefficientsFromUI } from './ui-updater';
import { initializeSelects, initializeEventListeners, onCoefficientChanged } from './event-handlers';
import { renderResultTables } from './result-renderer';

// 全局状态
let context: CalculationContext = createInitialContext();
let uiManager: UIManager = new UIManager(context);

// 防抖定时器
let calculateDebounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * 执行计算（带防抖）
 */
function performCalculation(): void {
  // 清除之前的定时器
  if (calculateDebounceTimer) {
    clearTimeout(calculateDebounceTimer);
  }
  
  // 设置新的防抖定时器
  calculateDebounceTimer = setTimeout(() => {
    doCalculation();
  }, 150);
}

/**
 * 实际执行计算
 */
function doCalculation(): void {
  // 更新系数
  updateCoefficientsFromUI(context);

  // 伤害计算
  performDamageCalculation(context);
  
  // 渲染结果到表格
  renderResultTables(context);
}

/**
 * 页面初始化
 */
function init(): void {
  initializeSelects();
  initializeEventListeners(context, performCalculation);
  updateUIVisibility(context);
  
  // 初始化默认值显示
  const ammoInput = document.getElementById('i-ammo') as HTMLInputElement;
  if (ammoInput) {
    onCoefficientChanged(context, 'ammo', { target: ammoInput } as unknown as Event, () => {});
  }
  
  // 初始化时执行一次计算
  doCalculation();
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

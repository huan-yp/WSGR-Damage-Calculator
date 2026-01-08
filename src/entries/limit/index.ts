/**
 * 属性下限计算器入口文件
 */
import '../../styles/main.css';

import { ATTACK_TYPES } from '../../core/shared/constants';
import { createInitialContext, CalculationContext } from '../../core/shared/models';
import { UIManager } from '../../core/ui';
import { SUPPORTED_ATTACK_TYPES } from './types';
import { updateUIVisibility, collectUIParams } from './ui-updater';
import { doLimitCalculation } from './calculator';
import { renderResultTables } from './result-renderer';

// 全局状态
let context: CalculationContext = createInitialContext();
let uiManager: UIManager = new UIManager(context);
context.functionType = 1; // 设置为属性下限计算模式

// 防抖定时器
let calculateDebounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * 初始化下拉选项
 */
function initializeSelects(): void {
  const attackSelect = document.getElementById('attack-type') as HTMLSelectElement;

  // 填充攻击类型（只保留支持属性下限计算的攻击类型）
  SUPPORTED_ATTACK_TYPES.forEach((index: number) => {
    const option = document.createElement('option');
    option.value = index.toString();
    option.textContent = ATTACK_TYPES[index];
    attackSelect.appendChild(option);
  });
  
  // 默认选择第一个支持的攻击类型
  context.attackType = 5;
}

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
  }, 200);
}

/**
 * 实际执行计算
 */
function doCalculation(): void {
  // 收集 UI 参数
  collectUIParams(context);
  
  // 执行计算
  doLimitCalculation(context);
  
  // 渲染结果到表格
  renderResultTables(context);
}

/**
 * 初始化事件监听
 */
function initializeEventListeners(): void {
  // 攻击类型变化
  const attackSelect = document.getElementById('attack-type') as HTMLSelectElement;
  attackSelect?.addEventListener('change', (e) => {
    context.attackType = parseInt((e.target as HTMLSelectElement).value);
    updateUIVisibility(context);
    performCalculation();
  });

  // 目标伤害输入
  document.getElementById('target-damage')?.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    context.other.enemyHp = parseFloat(input.value) || 100;
    performCalculation();
  });

  // 装甲输入
  document.getElementById('armor')?.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    context.other.armor = parseFloat(input.value) || 0;
    performCalculation();
  });

  // 暴击系数输入
  document.getElementById('coeff-crit')?.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    context.limitParams.critCoeff = parseFloat(input.value) || 1.5;
    performCalculation();
  });

  // 技能系数输入
  document.getElementById('coeff-skill')?.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    context.limitParams.skillCoeff = parseFloat(input.value) || 1;
    performCalculation();
  });
}

/**
 * 页面初始化
 */
function init(): void {
  initializeSelects();
  initializeEventListeners();
  updateUIVisibility(context);
  
  // 初始化时执行一次计算
  doCalculation();
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

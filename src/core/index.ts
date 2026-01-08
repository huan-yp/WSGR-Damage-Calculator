/**
 * 核心模块入口
 * 提供统一的导出接口
 */

// 共享模块
export * from './shared/constants';
export * from './shared/models';
export * as Calculator from './shared/calculator';

// 伤害计算模块
export * as DamageCalculator from './damage';

// UI 模块
export { UIManager } from './ui';

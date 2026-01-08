/**
 * 首页入口文件
 */
import '../styles/main.css';

// 首页动画和交互效果
document.addEventListener('DOMContentLoaded', () => {
  console.log('WSGR Calculator v2.0 - Home Page Loaded');
  
  // 功能卡片悬停效果增强
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card-hover');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('card-hover');
    });
  });
});

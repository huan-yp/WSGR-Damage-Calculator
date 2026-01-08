/**
 * 航空战减伤计算模块
 */

/**
 * 计算航空战减伤系数
 * 减伤对空值 = 本体对空+2.5*∑(装备对空值*防空倍率)
 * 大型船系数：150/(150+减伤对空值)
 * 中型船系数：375/(375+减伤对空值)
 * 小型船系数：1500/(1500+减伤对空值)
 */
export function calculateAirstrikeReduction(
  antiAirValue: number,
  shipSizeType: number,
  isArmoredCarrier: boolean,
  isBomber: boolean
): number {
  const shipSizeBase = [150, 375, 1500][shipSizeType] || 150;
  let reduction = shipSizeBase / (shipSizeBase + antiAirValue);
  
  // 装母特性：对轰炸机额外减伤0.25
  if (isArmoredCarrier && isBomber) {
    reduction *= 0.25;
  }
  
  return reduction;
}

/**
 * 穿甲伤害计算模块
 */

import { CalculationContext } from '../shared/models';
import { calculateAirstrikeReduction } from './airstrike';

/**
 * 计算穿甲伤害
 */
export function calculatePenetrationDamage(
  context: CalculationContext
): void {
  const atkResults = context.atkResults;
  const results = context.penetrationDamageResults;
  const armor = context.other.armor;
  const enemyHp = context.other.enemyHp;
  const skillMult = context.other.skillDamageMult;
  const peneCoeff = context.coefficient.pene;
  const batkValue = context.batkValue;
  const attackType = context.attackType;

  // 航空战减伤系数
  let airstrikeReduction = 1;
  if (attackType === 0 || attackType === 1) {
    // 航空战（轰炸机或鱼雷机）
    const isBomber = attackType === 0;
    airstrikeReduction = calculateAirstrikeReduction(
      context.other.antiAirValue,
      context.other.shipSizeType,
      context.other.isArmoredCarrier,
      isBomber
    );
  }

  for (let i = 0; i < atkResults.length; i++) {
    for (let j = 0; j < atkResults[0].length; j++) {
      for (let k = 0; k < atkResults[0][0].length; k++) {
        const atkValue = atkResults[i][j][k];

        if (attackType === 11) {
          // 导弹战：必定破甲
          let pene = 0;
          if (armor <= 50) {
            pene = 1 - (1.0 * armor * armor) / 12500;
          } else {
            pene = (1.0 * (armor - 150) * (armor - 150)) / 12500;
          }
          pene += peneCoeff;
          pene = Math.max(pene, 0.1);
          results[i][j][k] = Math.ceil(atkValue * pene * skillMult);
        } else {
          // 其他攻击：需计算破甲伤害
          const denominator = 0.5 * armor + peneCoeff * atkValue;
          let penetrationDamage = Math.ceil(
            atkValue * (1 - armor / denominator) * skillMult
          );

          // 航空战应用减伤系数
          if (attackType === 0 || attackType === 1) {
            penetrationDamage = Math.ceil(penetrationDamage * airstrikeReduction);
          }

          if (penetrationDamage > 0) {
            results[i][j][k] = penetrationDamage;
          } else {
            // 未击穿伤害
            results[i][j][k] = Math.ceil(Math.min(batkValue, enemyHp) * 0.1);
          }
        }
      }
    }
  }
}

/**
 * 根据浮动系数计算单次伤害（用于二分查找）
 */
export function calculateDamageForFloat(
  baseAtk: number,
  floatCoeff: number,
  armor: number,
  peneCoeff: number,
  skillMult: number,
  attackType: number,
  airstrikeReduction: number
): number {
  const atkValue = baseAtk * floatCoeff;
  
  if (attackType === 11) {
    // 导弹战
    let pene = 0;
    if (armor <= 50) {
      pene = 1 - (1.0 * armor * armor) / 12500;
    } else {
      pene = (1.0 * (armor - 150) * (armor - 150)) / 12500;
    }
    pene += peneCoeff;
    pene = Math.max(pene, 0.1);
    return Math.ceil(atkValue * pene * skillMult);
  } else {
    const denominator = 0.5 * armor + peneCoeff * atkValue;
    let penetrationDamage = Math.ceil(
      atkValue * (1 - armor / denominator) * skillMult
    );
    
    if (attackType === 0 || attackType === 1) {
      penetrationDamage = Math.ceil(penetrationDamage * airstrikeReduction);
    }
    
    return Math.max(penetrationDamage, 1);
  }
}

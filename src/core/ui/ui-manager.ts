/**
 * UI 管理模块
 */

import * as Constants from "../shared/constants";
import { CalculationContext } from "../shared/models";

export class UIManager {
  private context: CalculationContext;

  constructor(context: CalculationContext) {
    this.context = context;
  }

  /**
   * 根据攻击类型获取启用配置
   */
  getEnabledBATKFields(attackType: number): number[] {
    return [...Constants.BATK_ENABLE_CONFIG[attackType]];
  }

  /**
   * 根据攻击类型获取字段标签
   */
  getBATKLabels(attackType: number): string[] {
    return [...Constants.BATK_LABELS[attackType]];
  }

  /**
   * 根据攻击类型获取启用系数配置
   */
  getEnabledCoefficientFields(attackType: number): number[] {
    return [...Constants.COEFFICIENT_ENABLE_CONFIG[attackType]];
  }

  /**
   * 根据攻击类型获取阵形系数
   */
  getFormationCoefficients(attackType: number, coeffType: number): number[] {
    // 映射攻击类型到系数类型
    let idx = 3; // 默认：无影响

    if ([0, 1, 4].includes(attackType)) {
      idx = 3; // 无影响
    } else if (attackType === 6) {
      idx = 1; // 雷击
    } else if ([7, 8, 9, 10, 12].includes(attackType)) {
      idx = 2; // 夜战
    } else if ([5, 11].includes(attackType)) {
      idx = 0; // 导弹战、炮击
    }

    return [...Constants.FORMATION_COEFFICIENTS[idx]];
  }

  /**
   * 根据攻击类型获取航向系数
   */
  getDirectionCoefficients(
    attackType: number,
    coeffType: number = 0
  ): number[] {
    // 某些攻击类型航向无影响
    if ([0, 1, 2, 4, 7, 11, 12].includes(attackType)) {
      return [...Constants.DIRECTION_COEFFICIENTS[1]]; // 无影响
    }

    return [...Constants.DIRECTION_COEFFICIENTS[0]]; // 正常情况
  }

  /**
   * 格式化输出伤害计算结果
   */
  formatDamageOutput(): string {
    let result = "";
    const ctx = this.context;
    const atkType =
      Constants.ATTACK_TYPES[ctx.attackType] || "未知攻击类型";

    result += `伤害计算器${Constants.VERSION}版\n`;
    result += `${"─".repeat(90)}\n`;
    result += `攻击类型：${atkType}\t基础攻击力：${Math.floor(ctx.batkValue)}\t舰损系数：${ctx.coefficient.shipDamage}\t穿甲系数：${ctx.coefficient.pene.toFixed(2)}\n`;
    result += `敌方装甲：${ctx.other.armor}\t敌方HP：${ctx.other.enemyHp}\n\n`;

    // 伤害值表
    for (let i = 0; i < ctx.penetrationDamageResults.length; i++) {
      result += `${"─".repeat(90)}\n`;
      result += `${Constants.CONDITION_NAMES[i]}\t单纵阵\t\t复纵阵\t\t轮形阵\t\t梯形阵\t\t单横阵\n`;

      for (let j = 0; j < ctx.penetrationDamageResults[0].length; j++) {
        result += `${Constants.DIRECTION_NAMES[j]}\t`;

        for (let k = 0; k < ctx.penetrationDamageResults[0][0].length; k++) {
          const value = ctx.penetrationDamageResults[i][j][k];
          result += `${value}\t\t`;
        }

        result += `\n`;
      }
    }

    // 中破率
    result += `${"─".repeat(90)}\n\n`;
    result += `${"═".repeat(90)}\n`;
    result += `中破率：\n`;

    for (let i = 0; i < ctx.middleDamagePercent.length; i++) {
      result += `${"─".repeat(90)}\n`;
      result += `${Constants.CONDITION_NAMES[i + 6]}\t单纵阵\t\t复纵阵\t\t轮形阵\t\t梯形阵\t\t单横阵\n`;

      for (let j = 0; j < ctx.middleDamagePercent[0].length; j++) {
        result += `${Constants.DIRECTION_NAMES[j]}\t`;

        for (let k = 0; k < ctx.middleDamagePercent[0][0].length; k++) {
          const value = ctx.middleDamagePercent[i][j][k];
          result += `${value.toFixed(2)}%\t\t`;
        }

        result += `\n`;
      }
    }

    // 大破率
    result += `${"─".repeat(90)}\n\n`;
    result += `${"═".repeat(90)}\n`;
    result += `大破率：\n`;

    for (let i = 0; i < ctx.heavyDamagePercent.length; i++) {
      result += `${"─".repeat(90)}\n`;
      result += `${Constants.CONDITION_NAMES[i + 6]}\t单纵阵\t\t复纵阵\t\t轮形阵\t\t梯形阵\t\t单横阵\n`;

      for (let j = 0; j < ctx.heavyDamagePercent[0].length; j++) {
        result += `${Constants.DIRECTION_NAMES[j]}\t`;

        for (let k = 0; k < ctx.heavyDamagePercent[0][0].length; k++) {
          const value = ctx.heavyDamagePercent[i][j][k];
          result += `${value.toFixed(2)}%\t\t`;
        }

        result += `\n`;
      }
    }

    // 击沉率
    result += `${"─".repeat(90)}\n\n`;
    result += `${"═".repeat(90)}\n`;
    result += `击沉率：\n`;

    for (let i = 0; i < ctx.sinkPercent.length; i++) {
      result += `${"─".repeat(90)}\n`;
      result += `${Constants.CONDITION_NAMES[i + 6]}\t单纵阵\t\t复纵阵\t\t轮形阵\t\t梯形阵\t\t单横阵\n`;

      for (let j = 0; j < ctx.sinkPercent[0].length; j++) {
        result += `${Constants.DIRECTION_NAMES[j]}\t`;

        for (let k = 0; k < ctx.sinkPercent[0][0].length; k++) {
          const value = ctx.sinkPercent[i][j][k];
          result += `${value.toFixed(2)}%\t\t`;
        }

        result += `\n`;
      }
    }

    result += `${"═".repeat(90)}`;
    return result;
  }

  /**
   * 格式化输出属性下限结果
   */
  formatLimitOutput(): string {
    let result = "";
    const ctx = this.context;
    const atkType =
      Constants.ATTACK_TYPES[ctx.attackType] || "未知攻击类型";

    const infoMap: Record<number, string> = {
      5: "火力",
      6: "鱼雷",
      7: "鱼雷",
      8: "火力+鱼雷",
      9: "火力",
      10: "火力",
      11: "基础火力 + 导弹火力 × 3",
      12: "基础火力 + 导弹火力 × 3",
    };

    let info = infoMap[ctx.attackType] || "不可用";
    let dec = 5;
    if (ctx.attackType >= 11) dec = 0;
    if (ctx.attackType >= 7 && ctx.attackType <= 10) dec = 10;

    result += `属性下限计算器${Constants.VERSION}版\n`;
    result += `${"─".repeat(90)}\n`;
    result += `攻击类型：${atkType}\t舰损系数：${ctx.coefficient.shipDamage}\t穿甲系数：${ctx.coefficient.pene.toFixed(2)}\n`;
    result += `敌方装甲：${ctx.other.armor}\t敌方HP：${ctx.other.enemyHp}\n`;
    result += `计算结果：${info}\n\n`;

    result += `${"═".repeat(90)}\n`;
    result += `白字击沉基础属性下限\n`;
    result += `航向\t单纵阵\t\t复纵阵\t\t轮形阵\t\t梯形阵\t\t单横阵\n`;

    for (let i = 0; i < 4; i++) {
      result += `${Constants.DIRECTION_NAMES[i]}\t`;

      for (let j = 0; j < 5; j++) {
        const val = ctx.batkLimits[0][i][j] - dec;
        if (val <= 0) {
          result += `无意义\t\t`;
        } else {
          result += `${val}\t\t`;
        }
      }

      result += `\n`;
    }

    result += `\n暴击击沉基础属性下限\n`;
    result += `航向\t单纵阵\t\t复纵阵\t\t轮形阵\t\t梯形阵\t\t单横阵\n`;

    for (let i = 0; i < 4; i++) {
      result += `${Constants.DIRECTION_NAMES[i]}\t`;

      for (let j = 0; j < 5; j++) {
        const val = ctx.batkLimits[3][i][j] - dec;
        if (val <= 0) {
          result += `无意义\t\t`;
        } else {
          result += `${val}\t\t`;
        }
      }

      result += `\n`;
    }

    return result;
  }
}

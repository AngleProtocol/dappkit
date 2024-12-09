import { parseUnits } from "viem";

export class FormatterService {
  public static address(value?: string, format?: "short" | "prefix") {
    if (!value) return;
    switch (format) {
      case "short":
        return `${value?.slice(0, 2 + 5)}...${value?.slice(-5)}`;
      case "prefix":
        return value?.slice(0, 5);
      default:
        return value;
    }
  }

  toNumber(value: bigint | string, decimals = 18): number {
    const bi = BigInt(value);

    const fractionalPart = Number.parseFloat((bi % BigInt(10 ** decimals)).toString()) / 10 ** decimals;
    let integerPart = bi / BigInt(10 ** decimals);

    // trim the integer part if it's too large to avoid potential overflows
    if (integerPart > BigInt(Number.MAX_SAFE_INTEGER)) {
      integerPart = BigInt(Number.MAX_SAFE_INTEGER) / BigInt(10 ** 10);
    }
    if (integerPart < -1n * BigInt(Number.MAX_SAFE_INTEGER)) {
      integerPart = (-1n * BigInt(Number.MAX_SAFE_INTEGER)) / BigInt(10 ** 10);
    }

    return Number.parseFloat(integerPart.toString()) + fractionalPart;
  }

  toBigInt(value: number, decimals = 18): bigint {
    return parseUnits(value.toString(), decimals);
  }
}

export { FormatterService as Fmt };

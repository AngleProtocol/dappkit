// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class Format {
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
}

// ANSIエスケープシーケンスの定義
// 定義することで、コードを読みやすくします
const COLORS = {
  RESET: "\x1b[0m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
};

export const consoleDebug = (color: "RED" | "GREEN" | "RESET", msg: string, data?: any) => {
  const _color = color == "RED" ? COLORS.RED : color == "GREEN" ? COLORS.GREEN : COLORS.RESET;
  console.log(`${_color}${msg}${COLORS.RESET}`, data);
};

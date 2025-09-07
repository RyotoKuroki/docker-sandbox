/**
 * 3秒間待機するPromiseを作成
 * （sleep, wait）
 * @returns 解決（resolve）されたPromise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    // 指定したミリ秒数（ms）待機してからresolveを呼び出す
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

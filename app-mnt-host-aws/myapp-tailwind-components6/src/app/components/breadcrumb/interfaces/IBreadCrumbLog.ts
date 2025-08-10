/** 画面ごとの抽象インターフェイス */
export interface IBreadCrumbLog {
  /** URL */
  path: string;
  /** パンくず表示ラベル */
  label: string;
}

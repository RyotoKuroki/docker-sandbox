/** 画面ごとの抽象インターフェイス */
export interface IBreadCrumbLog {
  /** URL */
  path: string;
  /** パンくず表示ラベル */
  label: string;
  /** 画面間パラメータ */
  //params: JSON;
  //args: any; // { [key: string]: string | number | Date };

  // toJsonStr: () => string;
  // fromJsonStr: (value: string) => void;
}

/** 画面ごとの抽象インターフェイス */
export interface BreadCrumbPageParamsInterface {
  breadDisplayLabel: string;
  pagePath: string;

  toJsonStr: () => string;
  fromJsonStr: (value: string) => void;
}

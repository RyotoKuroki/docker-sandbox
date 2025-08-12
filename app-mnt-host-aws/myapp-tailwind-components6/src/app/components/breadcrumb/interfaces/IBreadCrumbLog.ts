/** 画面ごとの抽象インターフェイス */
export interface IBreadCrumbLog {
  /**
   * URLパス
   * 純粋なパスのみ
   */
  path: string;
  /**
   * URLパス
   * URLに付与されたパラメータ（?以降の部分のみ）
   **/
  queryParams: string;

  /** パンくず表示ラベル */
  label: string;

  args: any;

  // /**
  //  * 画面遷移パラメータ
  //  * 画面遷移時に遷移元から受け取るパラメータ
  //  **/
  // initArgs: any;
  // /**
  //  * 画面操作パラメータ
  //  * 画面操作により発生する情報（検索条件など）
  //  **/
  // opeArgs: any;
}

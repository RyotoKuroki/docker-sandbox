import { IBreadCrumbLog } from "./IBreadCrumbLog";

export const STORAGE_KEY = "bread-crumb-store";

/** パンくずで利用する画面履歴情報 */
export interface IBreadCrumbStore {
  //sessionKey: string;
  logs: IBreadCrumbLog[]; // { lable: string; path: string; args: { [key: string]: string | number | Date } }[];
}

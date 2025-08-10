import { IBreadCrumbLog } from "./IBreadCrumbLog";

export const STORAGE_KEY = "bread-crumb-store";

/** パンくずで利用する画面履歴情報 */
export interface IBreadCrumbStore {
  logs: IBreadCrumbLog[];
}

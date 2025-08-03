import { BreadCrumbPageParamsInterface } from "./BreadCrumbPageParamsInterface";

export const STORAGE_KEY = "breadcrumb-logs";

/** パンくずで利用する画面履歴情報 */
export interface BreadCrumbLogsInterface<T extends BreadCrumbPageParamsInterface> {
  logs: T[];
}

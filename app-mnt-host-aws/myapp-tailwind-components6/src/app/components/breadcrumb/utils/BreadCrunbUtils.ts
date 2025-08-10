import { IBreadCrumbStore, STORAGE_KEY } from "../interfaces/IBreadCrumbStore";
import { IBreadCrumbLog } from "../interfaces/IBreadCrumbLog";

const breadCrumbStoreTemplate = "{ lable: string; path: string; args: { [key: string]: string | number | Date } }[];";
const overwriteBreadcrumbStorage = (store: IBreadCrumbStore) => {
  const storeStr = JSON.stringify(store);
  sessionStorage.setItem(STORAGE_KEY, storeStr);
};

const getBreadcrumbStorage = () => {
  let currentStorageStr = sessionStorage[STORAGE_KEY];
  if (!currentStorageStr) {
    const store = {
      //sessionKey: STORAGE_KEY,
      logs: [] as IBreadCrumbLog[],
    };
    overwriteBreadcrumbStorage(store as IBreadCrumbStore);
  }
  const currentStorage = JSON.parse(currentStorageStr) as IBreadCrumbStore;
  return currentStorage;
};

export const getBreadcrumbLogs = () => {
  const currentStorage = getBreadcrumbStorage();
  return currentStorage.logs as IBreadCrumbLog[]; // { lable: string; path: string; args: { [key: string]: string | number | Date } }[];
};

export const getBreadcrumbLog = (path: string) => {
  const currentStorage = getBreadcrumbStorage();
  const logs = currentStorage.logs;
  for (let index = 0; index < logs.length; index++) {
    const log = logs[index];
    if (log.path == path) {
      return {
        logIndex: index,
        logMaxIndex: logs.length - 1,
        value: log,
      };
    }
  }

  return null;
};

export const removeBreadcrumbLog = (path: string) => {
  const currentLogObj = getBreadcrumbLog(path);
  if (!currentLogObj) {
    return false;
  }

  const currentStorage = getBreadcrumbStorage();

  if (currentLogObj.logIndex == 0) {
    currentStorage.logs = [];
  } else {
    currentStorage.logs = currentStorage.logs.slice(0, currentLogObj.logIndex);
  }

  overwriteBreadcrumbStorage(currentStorage);

  return true;
};

export const addBreadcrumbLog = (value: IBreadCrumbLog) => {
  const removed = removeBreadcrumbLog(value.path);

  const currentStorage = getBreadcrumbStorage();
  currentStorage.logs.push(value);
  overwriteBreadcrumbStorage(currentStorage);
};

export const clearBreadcrumbLogs = () => {
  const newStore = { logs: [] } as IBreadCrumbStore;
  overwriteBreadcrumbStorage(newStore);
};

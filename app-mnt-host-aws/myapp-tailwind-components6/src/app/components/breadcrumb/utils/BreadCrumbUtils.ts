import { BreadCrumbLogsInterface, STORAGE_KEY } from "../interfaces/BreadCrumbLogsInterface";
import { BreadCrumbPageParamsInterface } from "../interfaces/BreadCrumbPageParamsInterface";

const getBreadcrumbStorage = <T extends BreadCrumbPageParamsInterface>(key: string) => {
  let currentStorageStr = sessionStorage[key];
  if (!currentStorageStr) {
    const newObj = {
      logs: new Array(),
    } as BreadCrumbLogsInterface<T>;
    currentStorageStr = JSON.stringify(newObj);
    sessionStorage.setItem(key, currentStorageStr);
  }
  const currentStorage = JSON.parse(currentStorageStr) as BreadCrumbLogsInterface<T>;
  return currentStorage;
};

export const getBreadcrumbLogs = <T extends BreadCrumbPageParamsInterface>() => {
  const currentStorage = getBreadcrumbStorage(STORAGE_KEY);
  return currentStorage.logs;
};

export const getBreadcrumbLog = <T extends BreadCrumbPageParamsInterface>(path: string) => {
  const currentStorage = getBreadcrumbStorage(STORAGE_KEY);
  const logs = currentStorage.logs;
  for (let index = 0; index < logs.length; index++) {
    const log = logs[index];
    if (log.pagePath == path) {
      return {
        logIndex: index,
        logMaxIndex: logs.length - 1,
        value: log,
      };
    }
  }

  return null;
};

export const removeBreadcrumbLog = <T extends BreadCrumbPageParamsInterface>(path: string) => {
  const currentLogObj = getBreadcrumbLog(path);
  if (!currentLogObj) {
    return false;
  }

  const currentStorage = getBreadcrumbStorage(STORAGE_KEY);
  const logs = currentStorage.logs;

  if (currentLogObj.logIndex == 0) {
    currentStorage.logs = [];
  } else {
    currentStorage.logs = logs.slice(0, currentLogObj.logIndex);
  }

  return true;
};

export const addBreadcrumbLog = <T extends BreadCrumbPageParamsInterface>(value: T) => {
  const removed = removeBreadcrumbLog(value.pagePath);

  removeBreadcrumbLog(value.pagePath);
  addBreadcrumbLog(value);
};

export const clearBreadcrumbLogs = <T extends BreadCrumbPageParamsInterface>() => {
  const currentStorage = getBreadcrumbStorage(STORAGE_KEY);
  currentStorage.logs = [];
};

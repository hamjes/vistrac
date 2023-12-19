export const readChromeStorageCount = async (key: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        resolve(0);
      } else {
        resolve(result[key]);
      }
    });
  });
};

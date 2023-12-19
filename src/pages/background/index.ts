import { readChromeStorageCount } from '@root/src/shared/utils/readChromeStorageCount';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

chrome.webNavigation.onCompleted.addListener(async function (details) {
  // Check if the entered URL matches your target website
  const currentDomain = new URL(details.url).origin;

  // Retrieve the lastVisitedDomain from chrome.storage.local
  chrome.storage.local.get('lastVisitedDomain', async function (result) {
    const lastVisitedDomain = result.lastVisitedDomain || null;

    // Check if the domain has changed
    if (lastVisitedDomain !== currentDomain) {
      // Update lastVisitedDomain in chrome.storage.local
      chrome.storage.local.set({ 'lastVisitedDomain': currentDomain }, function () {
        console.log('Last visited domain updated in chrome.storage.local');
      });

      // Get the old count
      const oldCount = await readChromeStorageCount(currentDomain);

      // Update the count in chrome.storage.local
      chrome.storage.local.set({ [currentDomain]: oldCount + 1 }, function () {
        console.log('Data stored in background script');
      });

    }
  });
});

export const faviconFromUrl = (url?: string, size?: number) => {
    // if url is undefined, return undefined
    if (!url) return;
  
    // make it work even tho url might be missing protocol
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }
  
    let urlObject: URL;
  
    try {
      urlObject = new URL(url);
    } catch {
      return;
    }
  
    if (!urlObject.hostname) return;
  
    // check if returns 404, then return undefined
    // if (await fetch(urlObject.href).then((res) => res.status) === 404) return;
  
    return `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=${size ?? 128}`;
  };
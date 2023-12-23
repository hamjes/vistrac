import { useCurrentTabInfo } from '../hooks/useCurrentTabInfo';
import { useQuery } from '@tanstack/react-query';
import { readChromeStorageCount } from '@root/src/shared/utils/readChromeStorageCount';
import { faviconFromUrl } from '../utils/favicon';

export const Homepage = () => {
  const currentpage = useCurrentTabInfo();

  const visits = useQuery({
    queryKey: ['visits', currentpage.data],
    enabled: currentpage.data !== undefined,
    queryFn: async () => {
      console.log('data', currentpage.data);
      const number = await readChromeStorageCount(currentpage.data.origin);

      return number;
    },
  });

  // Define a function to clear the storage
  function clearStorage() {
    chrome.storage.local.clear(function () {
      console.log('Chrome storage cleared.');
      visits.refetch();
    });
  }

  // Define a function to clear the storage
  function clearPage() {
    chrome.storage.local.remove(currentpage?.data?.origin, function () {
      console.log('Chrome storage cleared.');
      visits.refetch();
    });
  }

  return (
    <div className="App">
      <img src="/logo.png" alt="Vistrac logo" className='t' />
      <div className="visit">Visits:</div>
      <div className='url'>
        <img src={faviconFromUrl (currentpage?.data?.origin)} alt="site logo" className='icon' />
        <div className="sitename">{currentpage?.data?.origin}</div>
      </div>
      {currentpage.isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <p className="numbers">{visits?.data?.toString()}</p>
        </>
      )}
      <button className="reset" onClick={clearPage}>
        Reset page
      </button>
      <button className="clear" onClick={clearStorage}>
        Reset all
      </button>
    </div>
  );
};

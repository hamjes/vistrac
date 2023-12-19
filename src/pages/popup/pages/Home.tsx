import { useEffect } from 'react';
import { useCurrentTabInfo } from '../hooks/useCurrentTabInfo';
import { useVisitStore } from '../hooks/useVisitStorage';
import { useQuery } from '@tanstack/react-query';
import { readChromeStorageCount } from '@root/src/shared/utils/readChromeStorageCount';

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

  return (
    <div className="App">
      <img src="/logo.png" alt="Vistrac logo" />
      <div className="visit">Visits:</div>
      <div className="sitename">{currentpage?.data?.origin}</div>
      {currentpage.isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <p className="numbers">{visits?.data?.toString()}</p>
        </>
      )}
      <button className='reset' onClick={clearStorage}>Reset counter</button>
    </div>
  );
};
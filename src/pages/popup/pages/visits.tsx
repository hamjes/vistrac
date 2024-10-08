import { useCurrentTabInfo } from '../hooks/useCurrentTabInfo';
import { useQuery } from '@tanstack/react-query';
import { readChromeStorageCount } from '@root/src/shared/utils/readChromeStorageCount';
import { faviconFromUrl } from '../utils/favicon';
import { FC } from 'react';

export const VisitsPage: FC<{ goBack: () => void }> = ({ goBack }) => {
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

  return (
    <div className="App">
      <div>
      <button className="home" onClick={goBack}>
          HOME
        </button>
      </div>
      <div className="allvisits">ALL VISITS:</div>
      <div className="allurl">
        <img src={faviconFromUrl(currentpage?.data?.origin)} alt="site logo" className="icon" />
        <div className="allsitenames">{currentpage?.data?.origin}</div>
      </div>
      <>
        <div className="allnumbers">{visits?.data?.toString()}</div>
      </>
    </div>
  );
};

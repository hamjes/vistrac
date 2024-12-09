import { useEffect, useState } from 'react';
import { FC } from 'react';
import { faviconFromUrl } from '../utils/favicon';  // You may need to adjust this import based on your project

export const VisitsPage: FC<{ goBack: () => void }> = ({ goBack }) => {
  // State to store all visited URLs and their counts
  const [visitsData, setVisitsData] = useState<{ [url: string]: number }>({});

  useEffect(() => {
    // Fetch all stored URLs and their visit counts from chrome.storage
    chrome.storage.local.get(null, (result) => {
      setVisitsData(result);  // result is an object with URLs as keys and visit counts as values
    });
  }, []);

  return (
    <div className="App">
      <div>
        <button className="home" onClick={goBack}>
          HOME
        </button>
      </div>
      <div className="allvisits">ALL VISITS:</div>

      {/* Loop through all visited URLs and their visit counts */}
      <div className="allurls">
        {Object.keys(visitsData).map((url, index) => (
          <div key={index} className="allurl">
            <img src={faviconFromUrl(url)} alt="site logo" className="icon" />
            <div className="allsitenames">{url}</div>
            <div className="allnumbers">{visitsData[url]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

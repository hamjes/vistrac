import { useCurrentTabInfo } from '../hooks/useCurrentTabInfo';
import { useQuery } from '@tanstack/react-query';
import { readChromeStorageCount } from '@root/src/shared/utils/readChromeStorageCount';
import { faviconFromUrl } from '../utils/favicon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

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
      <img src="/logo.png" alt="Vistrac logo" className="t mx-auto mt-5" />
      <div className="visit">Visits:</div>
      <div className="url">
        <img src={faviconFromUrl(currentpage?.data?.origin)} alt="site logo" className="icon" />
        <div className="sitename">{currentpage?.data?.origin}</div>
      </div>
      {currentpage.isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <p className="numbers">{visits?.data?.toString()}</p>
        </>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="reset bg-primary">
            Reset page
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your visit count.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearPage}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="clear bg-primary">
            Reset all
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your visit count.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearStorage}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

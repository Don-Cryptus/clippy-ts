import { useEffect } from 'react';
import useAppStore from '../../store/AppStore';
import { Clipboard } from '../../../main/prisma/client/index';
import Clipboards from './Clipboards';

const RecentClipboards = () => {
  const { clipboards, setClipboards } = useAppStore();

  useEffect(() => {
    const getClipboards = async () =>
      setClipboards(await window.electron.getClipboards({}));
    getClipboards();
  }, [setClipboards]);

  useEffect(() => {
    window.electron.on('addClipboard', (clipboard: Clipboard) =>
      setClipboards([clipboard, ...clipboards])
    );
  }, [clipboards, setClipboards]);

  return <Clipboards />;
};

export default RecentClipboards;
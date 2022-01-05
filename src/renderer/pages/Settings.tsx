import useSettingsStore from '../store/SettingsStore';
import Tabs from '../elements/Tabs';
import Account from '../components/settings/Account';
import General from '../components/settings/General';
import History from '../components/settings/History';

const Settings = () => {
  const { tabs } = useSettingsStore();
  const currentTab = tabs.find((tab) => tab.current)?.name;

  return (
    <div className="absolute w-full h-full dark:bg-dark bg-white dark:text-white text-black flex flex-col overflow-hidden">
      <Tabs />
      <div className="p-5 dark:text-white ">
        {currentTab === 'General' && <General />}
        {currentTab === 'Account' && <Account />}
        {currentTab === 'History' && <History />}
      </div>
    </div>
  );
};

export default Settings;
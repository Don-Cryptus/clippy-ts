import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { log } from 'console';
import { ExtendedHotKey, prismaClientConfig } from '../utils/constants';
import { PrismaClient, Prisma } from './client/index';

function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const prisma = new PrismaClient(prismaClientConfig());

const settingsData: Prisma.SettingsCreateInput = {
  id: 1,
  darkmode: true,
  notification: false,
  startup: true,
  synchronize: false,
};

const keys: ExtendedHotKey[] = [
  {
    id: 1,
    event: 'windowDisplayToggle',
    ctrl: true,
    alt: false,
    shift: false,
    key: 'D',
    status: true,
    name: 'Clippy Display Toggle',
    icon: JSON.stringify(['far', 'keyboard'] as IconProp),
  },
  {
    id: 2,
    event: 'setTab',
    ctrl: false,
    alt: false,
    shift: false,
    key: 'H',
    status: true,
    name: 'Recent Clipboards',
    icon: JSON.stringify(['fas', 'history'] as IconProp),
  },
];

async function seed() {
  log(`Start seeding ...`);

  await prisma.settings.upsert({
    where: { id: settingsData.id },
    create: settingsData,
    update: { id: settingsData.id },
  });

  await Promise.all(
    keys.map(async (key) => {
      await pause(50);
      return prisma.hotkey.upsert({
        where: { id: key.id },
        create: key,
        update: key,
      });
    })
  );
}

// (async () => {
//   await seed();
// })();

seed();

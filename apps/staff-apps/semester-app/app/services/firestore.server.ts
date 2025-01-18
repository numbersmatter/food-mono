import { getServerEnv } from '../env.server';
import { initializeFirestoreFoodPantryDb } from '@food-mono/firedb';

const { SERVICE_ACCOUNT, FIREBASE_APP_NAME } = getServerEnv();

export const { foodPantryDb } = initializeFirestoreFoodPantryDb({
  FIREBASE_APP_NAME,
  SERVICE_ACCOUNT,
  collectionPaths: {
    users: 'users',
    applications: 'applications',
    events: 'events',
    registrations: 'registrations',
    reservations: 'reservations',
  },
});

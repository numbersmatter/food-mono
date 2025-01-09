import {
  getApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { applicationsDb } from './applications/applications-crud.server';
import { eventsDb } from './events/crud.server';
import { registrationsDb } from './registrations/registrations-crud.server';
import { reservationsDb } from './reservations/crud.server';
import { UserDb } from './users/crud.server';

const initFirebase = ({
  FIREBASE_APP_NAME,
  SERVICE_ACCOUNT,
}: {
  FIREBASE_APP_NAME: string;
  SERVICE_ACCOUNT: string;
}) => {
  const config = {
    credential: serverCert(JSON.parse(SERVICE_ACCOUNT)),
  };

  if (getApps().length > 0) {
    const allApps = getApps();
    const app = allApps.find((app) => app.name === FIREBASE_APP_NAME);
    return app ? app : initializeServerApp(config, FIREBASE_APP_NAME);
  }
  return initializeServerApp(config, FIREBASE_APP_NAME);
};

type CollectionPaths = {
  applications?: string;
  events?: string;
  registrations?: string;
  reservations?: string;
  users?: string;
};

export const initializeFirestoreFoodPantryDb = ({
  FIREBASE_APP_NAME,
  SERVICE_ACCOUNT,
  collectionPaths,
}: {
  FIREBASE_APP_NAME: string;
  SERVICE_ACCOUNT: string;
  collectionPaths: CollectionPaths;
}) => {
  const fireApp = initFirebase({ FIREBASE_APP_NAME, SERVICE_ACCOUNT });
  const firestore = getFirestore(fireApp);

  const applicationsPath = collectionPaths.applications ?? 'applications';
  const eventsPath = collectionPaths.events ?? 'events';
  const registrationsPath = collectionPaths.registrations ?? 'registrations';
  const reservationsPath = collectionPaths.reservations ?? 'reservations';
  const usersPath = collectionPaths.users ?? 'users';

  const applications = applicationsDb({ firestore, path: applicationsPath });
  const events = eventsDb({ firestore, path: eventsPath });
  const registrations = registrationsDb({ firestore, path: registrationsPath });
  const reservations = reservationsDb({ firestore, path: reservationsPath });
  const users = UserDb({ firestore, path: usersPath });

  const foodPantryDb = {
    applications,
    events,
    registrations,
    reservations,
    users,
  };
  return {
    foodPantryDb,
  };
};

// const firestoreDb = () => {
//   const fireApp = initFirebase();
//   const firestore = getFirestore(fireApp);

//   return firestore;
// };

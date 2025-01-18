import { initializeFirestoreFoodPantryDb } from './firestore/firestore';
import * as semesterSchemas from './firestore/semesters/semester-schemas';

export const schemas = {
  semesters: semesterSchemas,
};

export { initializeFirestoreFoodPantryDb };

import * as admin from "firebase-admin";
import {FirebaseSettingsModel} from "@app/models";

const firebaseServiceAccountFile = './fptu-library-booking-firebase-adminsdk-gbxgk-75d2eb543f.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const firebaseSettings = JSON.parse(fs.readFileSync(firebaseServiceAccountFile, 'utf-8')) as FirebaseSettingsModel;

export const initializeFirebaseApp = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseSettings.project_id,
      clientEmail: firebaseSettings.client_email,
      privateKey: firebaseSettings.private_key.replace(/\\n/g, '\n'),
    } as Partial<admin.ServiceAccount>)
  });
  return firebaseSettings.project_id;
};

export default admin;

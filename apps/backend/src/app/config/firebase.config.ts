import * as admin from "firebase-admin";
import {FirebaseSettingsModel} from "@app/models";
import {Logger} from "@nestjs/common";

const firebaseServiceAccountFile = './fptu-library-booking-firebase-adminsdk-gbxgk-75d2eb543f.json';


const firebaseConfig = {
  apiKey: "AIzaSyBu0hVHThHGd5OQLxQWnNZLSgdLGiYsfZE",
  authDomain: "fptu-library-booking.firebaseapp.com",
  projectId: "fptu-library-booking",
  storageBucket: "fptu-library-booking.appspot.com",
  messagingSenderId: "1013204251190",
  appId: "1:1013204251190:web:52aeef762a7eb980e51e97",
  measurementId: "G-MQLQ866QXQ"
};
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
  Logger.log(`🔥 Firebase initialized with project id: ${firebaseSettings.project_id}`);

};

export default admin;

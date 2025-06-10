import serviceAccount from "../../src/config/firebaseServiceAccountKey.json";
import admin from "firebase-admin";

const projectId = process.env.ID_PROJECT_FIREBASE;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
});

export default admin;

import serviceAccount from "../../src/config/firebaseServiceAccountKey.json";
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export default admin;
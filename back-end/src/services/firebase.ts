// firebase.ts
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const base64url = process.env.FIREBASE_SERVICE_ACCOUNT_B64URL;

if (!base64url) {
  throw new Error("❌ Thiếu biến môi trường FIREBASE_SERVICE_ACCOUNT_B64URL");
}

// ✅ Hàm decode base64url
function decodeBase64url(b64url: string): string {
  let base64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) base64 += "=";
  return Buffer.from(base64, "base64").toString("utf-8");
}

// ✅ Parse service account JSON
const decodedJson = decodeBase64url(base64url);
let serviceAccount: admin.ServiceAccount;

try {
  serviceAccount = JSON.parse(decodedJson);
} catch (error) {
  throw new Error("❌ Không thể parse JSON từ biến môi trường: " + (error as any).message);
}

// ✅ Init Firebase
const projectId = process.env.ID_PROJECT_FIREBASE;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
});

export default admin;

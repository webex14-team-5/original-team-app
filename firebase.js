// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAZMtb3rWXyqz6zo_BEmbSNEkuyBP6A_0U",
  authDomain: "team5-original-app.firebaseapp.com",
  projectId: "team5-original-app",
  storageBucket: "team5-original-app.appspot.com",
  messagingSenderId: "660697903211",
  appId: "1:660697903211:web:61dcdc00bd74732959812e",
  measurementId: "G-Y3BL61SCVG",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)

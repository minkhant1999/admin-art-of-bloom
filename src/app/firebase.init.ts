import { initializeApp } from "firebase/app";

export default function initializeFirebaseApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyDaxtmylED-R-252XLmtDkDFhApZzWTp4U",
        authDomain: "art-of-bloom.firebaseapp.com",
        databaseURL: "https://art-of-bloom-default-rtdb.firebaseio.com",
        projectId: "art-of-bloom",
        storageBucket: "art-of-bloom.appspot.com",
        messagingSenderId: "516107650324",
        appId: "1:516107650324:web:6438a949cabc6cf28b2e01",
        measurementId: "G-RHCLNGV29Y"
    };

    return () => initializeApp(firebaseConfig);
}
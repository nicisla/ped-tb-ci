// Remove these import statements
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';


console.log("Script loaded successfully"); // To check if the script is running


const firebaseConfig = {
    apiKey: "AIzaSyC-OyuMqGyYxGmdq6jVwlJawK0YeX1bCPQ",
    authDomain: "pedtb-ci.firebaseapp.com",
    projectId: "pedtb-ci",
    storageBucket: "pedtb-ci.appspot.com",
    messagingSenderId: "579965593563",
    appId: "1:579965593563:web:c9e65a0a13db50b8b4e9fe",
    measurementId: "G-812M331VVC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
const colRef = db.collection('patientinfo');  

// Real-time listener to monitor data updates (optional)
colRef.onSnapshot((snapshot) => {
    let patientinfo = [];
    snapshot.docs.forEach(doc => {
        patientinfo.push({ ...doc.data(), id: doc.id });
    });
    console.log("Snapshot of Firestore data:", patientinfo);
});
// Form Submission Logic
const patientForm = document.querySelector('form');
patientForm.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
    const formData = {
        fullName: patientForm.fullName.value,
        alias: patientForm.alias.value,
        birthdate: patientForm.birthdate.value,
        age: patientForm.age.value,
        gender: patientForm.gender.value,
        height: patientForm.height.value,
        weight: patientForm.weight.value,
        parentGuardianName: patientForm.parentGuardianName.value,
        parentGuardianEmail: patientForm.parentGuardianEmail.value,
        parentGuardianContactNumber: patientForm.parentGuardianContactNumber.value,
        parentGuardianRelationship: patientForm.parentGuardianRelationship.value,
        secondaryContact: patientForm.secondaryContact.value,
        secondaryContactNumber: patientForm.secondaryContactNumber.value,
        emergencyContactPerson: patientForm.emergencyContactPerson.value,
        emergencyContactNumber: patientForm.emergencyContactNumber.value,
        houseBlockStreet: patientForm.houseBlockStreet.value,
        barangay: patientForm.barangay.value,
        city: patientForm.city.value,
        province: patientForm.province.value,
        chestXray: document.querySelector('input[name="chestXray"]:checked').value,
        tbDrugTreatment: document.querySelector('input[name="tbDrugTreatment"]:checked').value,
        recentSymptoms: document.querySelector('input[name="recentSymptoms"]:checked').value
    };

    console.log("Form Data:", formData); // Print out form data to console

    db.collection('patientinfo').add(formData)
    .then((docRef) => {
        console.log("Firestore response:", docRef);
        alert("Document written with ID: " + docRef.id);
        patientForm.reset();
    })
    .catch((error) => {
        console.error("Firestore error:", error);
        alert("Error adding document: " + error);
    });

} catch (listenerError) {
    console.error("Error in form event listener:", listenerError);
}
});
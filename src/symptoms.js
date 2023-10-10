
    /* const symptoms = [];
    const checkboxes = form.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            symptoms.push(checkbox.nextElementSibling.textContent);
        }
    })
    
    const checkboxes = form.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            formData.symptoms.push(checkbox.nextElementSibling.textContent);
            formData.symptoms = formData.symptoms.join(", ");
        }
    });

    cough: document.querySelector('#cough').checked ? 'Yes' : 'No', 
        fever: document.querySelector('#fever').checked ? 'Yes' : 'No',
        weightLoss: document.querySelector('#weightLoss').checked ? 'Yes' : 'No',
        nightSweats: document.querySelector('#nightSweats').checked ? 'Yes' : 'No',
        backOrChestPain: document.querySelector('#backOrChestPain').checked ? 'Yes' : 'No',
    */

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
const colRef = db.collection('symptoms');  

// Real-time listener to monitor data updates (optional)
colRef.onSnapshot((snapshot) => {
    let symptoms = [];
    snapshot.docs.forEach(doc => {
        symptoms.push({ ...doc.data(), id: doc.id });
    });
    console.log("Snapshot of Firestore data:", symptoms);
});
// Form Submission Logic
const symptomsForm = document.querySelector('form');
symptomsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
    const formData = {
        patientName: symptomsForm.patientName.value,
        reviewDate: symptomsForm.reviewDate.value,
        symptoms: "",
        additionalNotes: symptomsForm.additionalNotes.value
    }; 
 
    const symptomCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedSymptomsArray = [];
    symptomCheckboxes.forEach((checkbox) => {
    selectedSymptomsArray.push(checkbox.nextElementSibling.textContent);
});

    formData.symptoms = selectedSymptomsArray.join(", ");

    
    console.log("Form Data:", formData); // Print out form data to console
   
    db.collection('symptoms').add(formData)
    .then((docRef) => {
        console.log("Firestore response:", docRef);
        //alert("Document written with ID: " + docRef.id);
        symptomsForm.reset();
    })
    .catch((error) => {
        console.error("Firestore error:", error);
       // alert("Error adding document: " + error);
    });

} catch (listenerError) {
    console.error("Error in form event listener:", listenerError);
}
});

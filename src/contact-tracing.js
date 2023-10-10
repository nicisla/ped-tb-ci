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
const colRef = db.collection('contactTracing');  

// Real-time listener to monitor data updates (optional)
colRef.onSnapshot((snapshot) => {
    let contactTracing = [];
    snapshot.docs.forEach(doc => {
        contactTracing.push({ ...doc.data(), id: doc.id });
    });
    console.log("Snapshot of Firestore data:", contactTracing);
});
// Form Submission Logic
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
    const formData = {
        name: contactForm.Name.value,
        dateOfBirth: contactForm.birthDate.value, 
        gender: contactForm.gender.value,
        relationToPatient: contactForm.relPatient.value,
        contactNumber: contactForm.contactNumber.value,
        email: contactForm.email.value,
        initScreening: contactForm.initScreening.value,
        ffup: contactForm.ffup.value,
        remarks: contactForm.remarks.value
    }; 
 
    console.log("Form Data:", formData); // Print out form data to console
   
    db.collection('contactTracing').add(formData)
    .then((docRef) => {
        console.log("Firestore response:", docRef);
        // alert("Document written with ID: " + docRef.id);
        contactForm.reset();
    })
    .catch((error) => {
        console.error("Firestore error:", error);
        // alert("Error adding document: " + error);
    });

} catch (listenerError) {
    console.error("Error in form event listener:", listenerError);
}
});

    /* deleting patient 
    const deletePatientForm = document.querySelector('.delete')
    deletePatientForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const docRef = doc(db, 'patient', deletePatientForm.id.value)
        deleteDoc(docRef)
        .then(() => {
            deletePatientForm.reset()
        })
    })
    
    patient_name: addContactForm.patient_name.value,
            patient_gender: addContactForm.gender.value,
            contact_name: addContactForm.contact_name.value,
            contact_relationship: addContactForm.contact_relationship.value,
            contact_phone: ddContactForm.contact_phone.value,
            exposure_date: addContactForm.exposure_date.value,
            symptoms: addContactForm.symptoms.value,
            addtitional: addContactForm.additional_notes.value
*/
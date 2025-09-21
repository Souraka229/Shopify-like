// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    setDoc, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2guxEEaWzxQmnp-Gy7tPY2xwgWCuMlow",
    authDomain: "marketplace-ben-63ddf.firebaseapp.com",
    projectId: "marketplace-ben-63ddf",
    storageBucket: "marketplace-ben-63ddf.firebasestorage.app",
    messagingSenderId: "691020926408",
    appId: "1:691020926408:web:20a8e52a2c3da9d489c4fd"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Gestion de l'authentification
const authForm = document.getElementById('authForm');
const authButton = document.getElementById('authButton');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');

if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const shopName = document.getElementById('shopName')?.value;
        const isRegister = authButton.textContent === 'S’inscrire';

        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "shops", userCredential.user.uid), {
                    name: shopName || "Ma Boutique",
                    ownerId: userCredential.user.uid,
                    createdAt: new Date()
                });
                alert('Compte créé avec succès !');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Connexion réussie !');
            }
            document.getElementById('authModal').style.display = 'none';
        } catch (error) {
            alert(`Erreur : ${error.message}`);
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await signOut(auth);
        alert('Déconnexion réussie !');
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
});

window.register = () => {
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Inscription';
    document.getElementById('authButton').textContent = 'S’inscrire';
    document.getElementById('shopNameGroup').style.display = 'block';
};

window.login = () => {
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Connexion';
    document.getElementById('authButton').textContent = 'Se connecter';
    document.getElementById('shopNameGroup').style.display = 'none';
};

export { auth, db, collection, addDoc, setDoc, doc, getDoc, getDocs, query, where };
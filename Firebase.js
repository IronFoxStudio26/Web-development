  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBGIzE6lez1If199RMVu7hB04RrYgxJhao",
    authDomain: "iron-fox-studio-601c.firebaseapp.com",
    projectId: "iron-fox-studio-601c",
    storageBucket: "iron-fox-studio-601c.firebasestorage.app",
    messagingSenderId: "592824666808",
    appId: "1:592824666808:web:e73b4903b734b9ea0e024d",
    measurementId: "G-DMBMEL4836"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const analytics = getAnalytics(app);
  const signUpBtn = document.getElementById("signUpBtn");
  const profileMenu = document.getElementById("profileMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const db = getFirestore(app);
 
  




 window.signUp = async function () {

    try{

        const result = await signInWithPopup(auth, provider);

        alert("Welcome " + result.user.displayName);

        console.log(result.user);

        await setDoc(doc(db,"users",result.user.uid),{

            displayName:result.user.displayName,

            email:result.user.email,

            photoURL:result.user.photoURL,

            createdAt:new Date(),

            games:[]

        });

    }

    catch(error){

        alert(error.message);

    }


}
onAuthStateChanged(auth, (user) => {
    if (user) {
       signUpBtn.innerHTML = `
        <img id="topAvatar"
         src="${user.photoURL}"
         style="width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:8px;">
         ${user.displayName}
`;
       signUpBtn.onclick = function(){

        profileMenu.classList.toggle("show");

}
    }
    else {
        signUpBtn.innerHTML = "Sign Up";
        signUpBtn.onclick = window.signUp;
    }
});
if(logoutBtn){

    logoutBtn.onclick = function(e){

        e.preventDefault();

        signOut(auth);

        if(profileMenu){
            profileMenu.classList.remove("show");
        }

    }


}
const page = window.location.href;
if (page.includes("Profile.html")) {

    onAuthStateChanged(auth, (user) => {

        if (!user) {
            location.href = "HTMLPage1.html";
            return;
        }

        document.getElementById("avatar").src = user.photoURL;
        document.getElementById("username").innerHTML = user.displayName;
        document.getElementById("email").innerHTML = user.email;

    });

}
if (page.includes("Settings.html")) {

    onAuthStateChanged(auth, (user) => {
        const avatar = document.getElementById("avatar");
        const username = document.getElementById("username");
        const email = document.getElementById("email");

       

        if (!user) {
            location.href = "HTMLPage1.html";
            return;
           
          
        }
            if (avatar) avatar.src = user.photoURL;
            if (username) username.textContent = user.displayName;
            if (email) email.textContent = user.email;

        document.getElementById("avatar").src = user.photoURL;
        document.getElementById("name").innerHTML = user.displayName;
        document.getElementById("email").innerHTML = user.email;

    });
 
 
}
function openImage(src) {
    document.getElementById("bigImage").src = src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeImage() {
    document.getElementById("lightbox").style.display = "none";
}

window.openImage = openImage;
window.closeImage = closeImage;

window.openImage = function(src) {
    document.getElementById("bigImage").src = src;
    document.getElementById("lightbox").style.display = "flex";
};

window.closeImage = function() {
    document.getElementById("lightbox").style.display = "none";
    
};
const gallery = [...document.querySelectorAll(".screenshots img")];

let currentImage = 0;

window.openImage = function(src){

    currentImage = [...gallery].findIndex(img => img.src === src);

    document.getElementById("bigImage").src = src;
    document.getElementById("lightbox").style.display = "flex";
}
window.nextImage = function(){

    currentImage++;

    if(currentImage >= gallery.length){
        currentImage = 0;
    }

    document.getElementById("bigImage").src = gallery[currentImage].src;
}
window.prevImage = function(){

    currentImage--;

    if(currentImage < 0){
        currentImage = gallery.length - 1;
    }

    document.getElementById("bigImage").src = gallery[currentImage].src;
}
window.closeImage = function(){

    document.getElementById("lightbox").style.display = "none";
}



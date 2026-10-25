document.addEventListener("DOMContentLoaded", () => {

    initializeAccount();
    initializeTheme();
    initializeLanguage();
    initializeNotifications();
    initializePrivacy();
    

});

function initializeAccount(){

    console.log("Account loaded");
    
    const avatar = document.getElementById("avatar");
    const photoInput = document.getElementById("photoInput");

    photoInput.addEventListener("change", function (event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

    avatar.src = e.target.result;

    const topAvatar = document.getElementById("topAvatar");

    if(topAvatar){
        topAvatar.src = e.target.result;
    }

}
    reader.readAsDataURL(file);

});
    
    const removeButton = document.querySelector(".removePhotoBtn");

    removeButton.addEventListener("click", () => {

    avatar.src = "images/default-avatar.png";
    photoInput.value = "";

});
    const saveButton = document.querySelector(".saveBtn");

    saveButton.addEventListener("click", () => {

    console.log("Saving account...");

});

}
 function initializeTheme(){

    console.log("Theme loaded");

    const buttons = document.querySelectorAll(".theme");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

            const theme = button.dataset.theme;

            console.log(theme);

            document.body.setAttribute("data-theme",theme);

            localStorage.setItem("theme",theme);

        });

    });

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme){

        document.body.setAttribute("data-theme",savedTheme);

    }

{

    

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme){

        document.body.setAttribute("data-theme",savedTheme);

        buttons.forEach(btn=>{

            btn.classList.toggle("active",btn.dataset.theme===savedTheme);

        });

    }


}
}



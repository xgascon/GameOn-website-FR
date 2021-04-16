function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalInitial = document.getElementById("bground-initial");
const modalSuccess = document.getElementById("bground-success");
const closeModalInitial = document.getElementById("close-modal-initial");
const closeModalSuccess = document.getElementById("close-modal-success");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const submitBtn = document.getElementById("submitBtn");
const successBtn = document.getElementById("successBtn");
const form = document.getElementById("form");
const locationBtns = document.getElementsByName("location");
const locationFrame = document.getElementById("location-frame");
const conditions = document.getElementById("checkbox1");
const conditionsLabel = document.getElementById("conditions-label");
const alerteFirst = document.getElementById("alerte-prenom");
const alerteLast = document.getElementById("alerte-nom");
const alerteEmail = document.getElementById("alerte-email");
const alerteBirthdate = document.getElementById("alerte-birthdate");
const alerteQuantity = document.getElementById("alerte-quantity");
const alerteLocation = document.getElementById("alerte-location");
const alerteConditions = document.getElementById("alerte-conditions");

// launch modal initial event
modalBtn.forEach((btn) => btn.addEventListener("click", function () {
  launchModal(modalInitial)
}));

// launch modals
function launchModal(modal) {
  modal.style.display = "block";
}

// close modal initial event
closeModalInitial.addEventListener("click", function() {
  closeModal(modalInitial)
});

// close modal success event
closeModalSuccess.addEventListener("click", function() {
  closeModal(modalSuccess)
});

// close modals
function closeModal(modal) {
  modal.style.display = "none";
}

// Variable filled on click of a location button 
var locationChecked;
locationBtns.forEach((btn) => btn.addEventListener('click', function() {
  locationChecked = btn.id;
  validationInput(alerteLocation, locationFrame)
}))

// RegEx to verify email input 
var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*+[a-z]{2}$/;

// RegEx to verify number input 
var numberLess100RegExp = /^[0-9]{0,1}[0-9]$/;

// RegEx to verify date input 
var dateRegExp = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;

// Verification inputs on change of their data events
first.addEventListener('input', function() {
  verificationInput2Characters(alerteFirst, first)
});

last.addEventListener('input', function() {
  verificationInput2Characters(alerteLast, last)
});

email.addEventListener('input', function() {
  verificationInputEmail(alerteEmail, email)
});

birthdate.addEventListener('input', function() {
  verificationInputDate(alerteBirthdate, birthdate)
});

quantity.addEventListener('input', function() {
  verificationInputNumberLess100(alerteQuantity, quantity)
});


// Verification for inputs requiring 2 characters 
let messageVerificationInput2Characters = "Veuillez entrer 2 caractères ou plus pour le champ !";
function verificationInput2Characters(alerteElement, input) {
  if(input.value.substr(1) === '') {
    var erreur;
    erreur = messageVerificationInput2Characters;
    erreurInput(alerteElement, erreur, input)
  } else {
    validationInput(alerteElement, input)
  }
}

// Verification for inputs requiring an email
let messageVerificationInputEmail = "Veuillez renseigner une adresse email correcte !";
function verificationInputEmail(alerteElement, input) {
  if(!emailRegExp.test(input.value)) {
    var erreur;
    erreur = messageVerificationInputEmail;
    erreurInput(alerteElement, erreur, input)
  } else {
    validationInput(alerteElement, input)
  }
}

// Verification for inputs requiring a date
let messageVerificationInputDate = "Veuillez renseigner une date au format JJ/MM/AAAA!";
function verificationInputDate(alerteElement, input) {
  if(!dateRegExp.test(input.value)) {
    var erreur;
    erreur = messageVerificationInputDate;
    erreurInput(alerteElement, erreur, input)
  } else {
    validationInput(alerteElement, input)
  }
}

// Verification for inputs requiring a Number between 0 and 99
let messageVerificationInputNumberLess100 = "Veuillez renseigner un nombre entre 0 et 99 !";
function verificationInputNumberLess100(alerteElement, input) {
  if(!numberLess100RegExp.test(input.value)) {
    var erreur;
    erreur = messageVerificationInputNumberLess100;
    erreurInput(alerteElement, erreur, input)
  } else {
    validationInput(alerteElement, input)
  }
}

// Alert notification for wrong input
function erreurInput(alerteElement, erreur, input) {
  alerteElement.innerHTML = erreur;
  alerteElement.style.color = '#FF0000';
  input.style.border = "2px solid #FF0000";
}

// Success notification for correct input
let validationInputMessage = "Champ correctement rempli."
function validationInput(alerteElement, input) {
  alerteElement.innerHTML = validationInputMessage;
  alerteElement.style.color = '#279e7a';
  input.style.border = 'none';
}

// Verify input elements on submission click event
submitBtn.addEventListener('click', inputVerificationAll);

// Launch modal success and close modal initial event
form.addEventListener('submit', function(event) {
  event.preventDefault();
  closeModal(modalInitial);
  launchModal(modalSuccess);
});


function inputVerification(event, alerteElement, input, message){
  if(alerteElement.textContent != validationInputMessage){
    event.preventDefault();
    // alert("Veuillez compléter tous les champs.");
    erreurInput(alerteElement, message, input );
  } 
}

// Verify input elements on submission click
function inputVerificationAll(event) {
  inputVerification(event, alerteFirst, first, messageVerificationInput2Characters);
  inputVerification(event, alerteLast, last, messageVerificationInput2Characters);
  inputVerification(event, alerteEmail, email, messageVerificationInputEmail);
  inputVerification(event, alerteBirthdate, birthdate, messageVerificationInputDate);
  inputVerification(event, alerteQuantity, quantity, messageVerificationInputNumberLess100); 

  if(!locationChecked) {
    event.preventDefault();
    var erreur = "Veuillez sélectionner une ville !";
    erreurInput(alerteLocation, erreur, locationFrame)
  }
  
  if(!conditions.checked) {
    event.preventDefault();
    var erreur = "Vous devez accepter les conditions d'utilisation pour poursuivre !";
    erreurInput(alerteConditions, erreur, conditionsLabel)
  }
}

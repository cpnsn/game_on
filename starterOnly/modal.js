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
const modalSpan = document.querySelectorAll(".close");
const modalCloseBtn = document.querySelector(".close-thanks");
const thanks = document.querySelector(".thanks");
const form = document.forms["reserve"]
const today = new Date().toISOString().split('T')[0];
  document.getElementById('birthdate').max = today;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// open modal form
function launchModal() {
  modalbg.style.display = "block";
}


// launch form events
modalCloseBtn.addEventListener("click", function() {
  closeModal();
});

modalSpan.forEach(span => {
  span.addEventListener("click", function() {
    closeModal();
  });
});

// close modal form and thank you message
function closeModal() {
  modalbg.style.display = "none";
  thanks.style.display = "none";
}

// text-control inputs validation
function validateInputs() {
  let isValid = true;
  const inputs = form.querySelectorAll('.text-control');

  for (const input of inputs) {
    const error = document.getElementById(`error-${input.id}`);
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]{2,}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    let isValidInput = true;
    if (input.id === 'first' && !nameRegex.test(input.value)) {
      error.style.display = "block";
      isValidInput = false;
    } else if (input.id === 'last' && !nameRegex.test(input.value)) {
      error.style.display = "block";
      isValidInput = false;
    } else if (input.id === 'email' && !emailRegex.test(input.value)) {
      error.style.display = "block";
      isValidInput = false;
    } else if (input.id === 'birthdate' && !input.value) {
      error.style.display = "block";
      isValidInput = false;
    } else if (input.id === 'quantity' && (input.value.length < 1 || isNaN(input.value))) {
      error.style.display = "block";
      isValidInput = false;
    } else {
      error.style.display = "none";
    }
    
    if (!isValidInput) {
      isValid = false;
    }
  }
  return isValid;
}

// location checkboxes validation
function validateLocation() {
  let isValid = false;
  const locationInputs = form.querySelectorAll('input[name="location"]');
  let locationChecked = false;
  
  locationInputs.forEach(input => {
    if (input.checked) {
      locationChecked = true;
    }
  });
  
  const errorLocation = document.getElementById('error-location');
  if (!locationChecked) {
    errorLocation.style.display = "block";
  } else {
    errorLocation.style.display = "none";
    isValid = true;
  }
  return isValid;
}

// condition validation
function validateCondition() {
  let isValid = false;
  const errorCondition = document.getElementById('error-checkbox1');
  const conditionInput = document.getElementById('checkbox1');
  if (!conditionInput.checked) {
    errorCondition.style.display = "block";
  } else {
    errorCondition.style.display = "none";
    isValid = true;
  }
  return isValid;
}

// form validation
function validate() {
  const isValidInputs = validateInputs();
  const isValidLocation = validateLocation();
  const isValidCondition = validateCondition();

  return isValidInputs && isValidLocation && isValidCondition;
}

// form submition
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validate()) {
    thanks.style.display = "flex";
    modalbg.style.display = "none";
    form.reset();
  } 
})
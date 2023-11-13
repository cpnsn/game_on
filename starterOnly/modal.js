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
const modalSpan = document.querySelectorAll(".close");
const modalCloseBtn = document.querySelector(".close-thanks");
const thanks = document.querySelector(".thanks");
const form = document.forms["reserve"]

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

// form validation
  function validate() {
  const inputs = form.querySelectorAll('.text-control');
  let formIsValid = true;

  inputs.forEach(input => {
    const error = document.getElementById(`error-${input.id}`);
    if (input.id === 'first' && !/^[A-Za-zÀ-ÖØ-öø-ÿ-' ]{2,}$/.test(input.value)) {
      error.style.display = "block";
      formIsValid = false; 
    } else if (input.id === 'last' && !/^[A-Za-zÀ-ÖØ-öø-ÿ-' ]{2,}$/.test(input.value)) {
      error.style.display = "block";
      formIsValid = false;
    } else if (input.id === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
      error.style.display = "block";
      formIsValid = false;
    } else if (input.id === 'birthdate' && !input.value) {
      error.style.display = "block";
      formIsValid = false;
    } else if (input.id === 'quantity' && (input.value.length < 1 || isNaN(input.value))) {
      error.style.display = "block";
      formIsValid = false;
    } else {
      error.style.display = "none";
    }
  });

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
    formIsValid = false;
  } else {
    errorLocation.style.display = "none";
  }

  const errorCondition = document.getElementById('error-checkbox1');
  const conditionInput = document.getElementById('checkbox1');
  if (!conditionInput.checked) {
    errorCondition.style.display = "block";
    formIsValid = false;
  } else {
    errorCondition.style.display = "none";
  }

  if (formIsValid) {
    thanks.style.display = "flex";
    modalbg.style.display = "none";
  }

  return formIsValid;
}

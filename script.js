const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const emailTwo = document.getElementById("emailconfirm");
const message = document.getElementById("message");
const button = document.querySelector("button");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
emailTwo.addEventListener("paste", (e) => e.preventDefault());

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check email match
function checkEMailsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "email adresses don't match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([firstName, lastName, email, emailTwo, message]);
  checkLength(firstName, 3, 15);
  checkLength(lastName, 3, 15);
  checkEmail(email);
  checkEMailsMatch(email, emailTwo);

  fetch("message.php", {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      button.innerHTML = "Message Sent";
      button.style.backgroundColor = "green";

      setTimeout(function () {
        button.innerHTML = "Submit";
        button.style.backgroundColor = "#3498db";
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        emailTwo.value = "";
        message.value = "";
      }, 3000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

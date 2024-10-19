document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration");

  registrationForm.addEventListener("submit", function (event) {
    // Prevent the form from submitting if there are validation errors
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  getTripTypes();
  getPackages();

  function validateForm() {
    let isValid = true;

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());

    // Validate Name
    const fNameField = document.getElementById("custFirstName");
    if (fNameField.value.trim() === "") {
      showError(fNameField, "First name is required.");
      isValid = false;
    }

    const lNameField = document.getElementById("custLastName");
    if (lNameField.value.trim() === "") {
      showError(lNameField, "Last name is required.");
      isValid = false;
    }

    // Validate Email
    const emailField = document.getElementById("email");
    if (!validateEmail(emailField.value)) {
      showError(emailField, "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Address
    const addressField = document.getElementById("address");
    if (addressField.value.trim() === "") {
      showError(addressField, "Address is required.");
      isValid = false;
    }

    // Validate City
    const cityField = document.getElementById("city");
    if (cityField.value.trim() === "") {
      showError(cityField, "City is required.");
      isValid = false;
    }

    // Validate Postal Code
    const postalCodeField = document.getElementById("postal-code");
    if (!validatePostalCode(postalCodeField.value)) {
      showError(postalCodeField, "Please enter a valid postal code.");
      isValid = false;
    }

    // Validate User ID
    const userIdField = document.getElementById("userId");
    if (userIdField.value.trim() === "") {
      showError(userIdField, "User ID is required.");
      isValid = false;
    }

    // Validate Password
    const passwordField = document.getElementById("password");
    if (passwordField.value.length < 6) {
      showError(passwordField, "Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  }

  function showError(field, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "red";
    errorDiv.innerText = message;

    field.parentElement.appendChild(errorDiv);
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  function validatePostalCode(postalCode) {
    // Example regex for Canadian postal codes (A1A 1A1)
    const re = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return re.test(postalCode);
  }
  async function getTripTypes() {
    const tripTypeSelector = document.getElementById("tripType");

    try {
      const res = await fetch("http://localhost:3000/triptypes");
      const data = await res.json();

      tripTypeSelector.innerHTML = `<option disabled  selected>Select your trip type</option>`;

      data.forEach((triptype) => {
        const optionHTML = `<option value="${triptype.TripTypeId}">${triptype.TTName}</option>`;
        tripTypeSelector.innerHTML += optionHTML;
      });
    } catch (error) {
      console.error("Can't not fetch the triptypes: ", error);
      tripTypeSelector.innerHTML += `<option>Couldn't load data from server</option>`;
    }
  }

  async function getPackages() {
    const packageSelector = document.getElementById("package");

    try {
      const res = await fetch("http://localhost:3000/packages");
      const data = await res.json();

      packageSelector.innerHTML = `<option disabled selected> Choose your vacation package</option>`;

      data.forEach((package) => {
        const optionHTML = `<option value="${package.PackageId}">${package.PkgName}</option>`;
        packageSelector.innerHTML += optionHTML;
      });
    } catch (error) {
      console.error("Can't not fetch the packages: ", error);
      packageSelector.innerHTML += `<option>Couldn't load data from server</option>`;
    }
  }
});

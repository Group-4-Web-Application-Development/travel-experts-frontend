document.addEventListener("DOMContentLoaded", function () {
  // register fetching function
  getTripTypes();
  getPackages();

  const registrationForm = document.getElementById("registration");
  registrationForm.addEventListener("submit", async function (event) {
    // Prevent the form from submitting if there are validation errors
    event.preventDefault();
    document.getElementById("submissionError").innerHTML = "";
    if (!validateForm()) {
      return;
    }

    const form = event.target;
    // James: to manipulate the request and response data, I need to send request manually
    // and force to use URLSearchparam(). If not, it will use multipart/form-data
    const formData = new URLSearchParams();
    for (const element of form.elements) {
      if (element.name) {
        formData.append(element.name, element.value);
      }
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        handleError(errorData.error.message);
      } else {
        window.location.href = "/thank-you.html";
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      handleError("Something went wrong, please try again later.");
    }
  });

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
    const emailField = document.getElementById("custEmail");
    if (!validateEmail(emailField.value)) {
      showError(emailField, "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Address
    const addressField = document.getElementById("custAddress");
    if (addressField.value.trim() === "") {
      showError(addressField, "Address is required.");
      isValid = false;
    }

    // Validate City
    const cityField = document.getElementById("custCity");
    if (cityField.value.trim() === "") {
      showError(cityField, "City is required.");
      isValid = false;
    }

    // Validate Postal Code
    const postalCodeField = document.getElementById("custPostal");
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

    // Validate trip type
    const tripTypeField = document.getElementById("tripType");
    if (tripTypeField.value.trim() === "") {
      showError(tripTypeField, "Trip type is required. Please try again.");
      isValid = false;
    }

    // Validate package
    const packageField = document.getElementById("package");
    if (packageField.value.trim() === "") {
      showError(packageField, "Package is required. Please try again");
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

      tripTypeSelector.innerHTML = `<option disabled selected value="">Select your trip type</option>`;

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

      packageSelector.innerHTML = `<option disabled selected value=""> Choose your vacation package</option>`;

      data.forEach((package) => {
        const optionHTML = `<option value="${package.PackageId}">${package.PkgName}</option>`;
        packageSelector.innerHTML += optionHTML;
      });
    } catch (error) {
      console.error("Can't not fetch the packages: ", error);
      packageSelector.innerHTML += `<option>Couldn't load data from server</option>`;
    }
  }

  function handleError(message) {
    document.getElementById("submissionError").innerHTML = message;
  }
});

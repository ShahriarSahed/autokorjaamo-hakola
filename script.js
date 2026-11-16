// Client-side checks for the service request form.
// This script checks the form in the browser. It does not send the form to the workshop.

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("service-request-form");

    // The script is only used on contact.html.
    if (!form) {
        return;
    }

    const registrationInput = document.getElementById("registration");
    const preferredDayInput = document.getElementById("preferred-day");
    const statusMessage = document.getElementById("form-status");

    // Use the visitor's local date, not a UTC date, when setting the earliest day.
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayString = `${year}-${month}-${day}`;

    preferredDayInput.min = todayString;

    function checkRegistrationNumber() {
        const value = registrationInput.value.trim().toUpperCase();
        const registrationPattern = /^[A-Z]{2,3}-?[0-9]{1,3}$/;

        if (value === "") {
            registrationInput.setCustomValidity("");
            return;
        }

        // A phone number usually contains only digits and phone punctuation.
        if (/^[+0-9\s()-]+$/.test(value)) {
            registrationInput.setCustomValidity(
                "This looks like a phone number. Enter the vehicle registration number here, for example ABC-123."
            );
        } else if (!registrationPattern.test(value)) {
            registrationInput.setCustomValidity(
                "Enter a valid-looking registration number, for example ABC-123."
            );
        } else {
            registrationInput.setCustomValidity("");
        }
    }

    function checkPreferredDay() {
        if (preferredDayInput.value !== "" && preferredDayInput.value < todayString) {
            preferredDayInput.setCustomValidity("Please choose today or a future date.");
        } else {
            preferredDayInput.setCustomValidity("");
        }
    }

    registrationInput.addEventListener("input", checkRegistrationNumber);
    registrationInput.addEventListener("blur", checkRegistrationNumber);
    preferredDayInput.addEventListener("change", checkPreferredDay);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        checkRegistrationNumber();
        checkPreferredDay();

        if (!form.reportValidity()) {
            statusMessage.textContent = "Please correct the information marked by the browser and try again.";
            return;
        }

        statusMessage.textContent =
            "The information is valid. This demonstration form has not been sent. The workshop's IT partner must connect the form to the workshop's email before it can receive online requests. The workshop will call you to confirm the appointment time.";
    });
});

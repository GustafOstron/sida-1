


function setupRegister(){
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let termsChecked = document.getElementById("terms").checked;

        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let confirmPasswordError = document.getElementById("confirmPasswordError");
        let termsError = document.getElementById("termsError");
        let successMessage = document.getElementById("successMessage");

        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        termsError.textContent = "";
        successMessage.textContent = "";


        if (!email.includes("@") || !email.includes(".")) {
            emailError.textContent = "E-post måste innehålla '@' och '.'";
            return;
        }
        if (password.length < 6) {
            passwordError.textContent = "Lösenordet måste vara minst 6 tecken långt.";
            return;
        }

        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Lösenorden matchar inte.";
            return;
        }
        if (!termsChecked) {
            termsError.textContent = "Du måste godkänna villkoren.";
            return;
        }


        //inlognings skit
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let userExists = users.some(user => user.email === email);
        if (userExists) {
            emailError.textContent = "Den här e-posten är redan registrerad.";
            return;
        }
        users.push({ email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));

        successMessage.textContent = "Du är nu registrerad: " + email;

        setTimeout(function() {
            window.location.href = "index.html";
        }, 3000);
    })
}

function setupLogin(){
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();  // Stoppar sidans omladdning

        // Hämta värden
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Felmeddelanden
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let noACcountMessage = document.getElementById("noAccountError");
        let successMessage = document.getElementById("successMessage");

        // Nollställ felmeddelanden
        emailError.textContent = "";
        passwordError.textContent = "";
        noACcountMessage.textContent = ""
        successMessage.textContent = "";


        if (!email.includes("@") || !email.includes(".")) {
            emailError.textContent = "E-post måste innehålla '@' och '.'";
            return;
        }

        if (password.length < 6) {
            passwordError.textContent = "Lösenordet måste vara minst 6 tecken långt.";
            return;
        }


        let users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            noACcountMessage.textContent = "Fel e-post eller lösenord.";
            return;
        }

        // Save logged-in user
        localStorage.setItem("loggedInUser", email);

        successMessage.textContent = "Du är nu inloggad som: " + email;
        setTimeout(3000)
        setTimeout(function() {
            window.location.href = "index.html";
        }, 3000);
    })
}
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Perform registration logic here (e.g., validation, storing in database, etc.)
    // For simplicity, let's assume registration is successful if fields are not empty
    if (username.trim() !== "" && password.trim() !== "") {
        // Redirect to password manager page upon successful registration
        window.location.href = "password_manager.html";
    } else {
        alert("Please fill in all fields to register.");
    }
});

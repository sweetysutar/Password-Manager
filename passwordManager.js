// Function to verify password
function verifyPassword(enteredPassword, storedHash) {
    // Hash the entered password using the same algorithm and parameters
    const enteredHash = CryptoJS.SHA256(enteredPassword).toString();

    // Compare the entered hash with the stored hash
    return enteredHash === storedHash;
}

// Function to hash password using Crypto.js
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

// Function to mask password
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

// Function to copy text to clipboard
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

// Function to delete password entry
function deletePassword(website) {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website;
    });
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

// Function to display stored passwords
function showPasswords() {
    let tb = document.querySelector("#passwordTable");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
                </td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
                </td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
                </td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str;
    }
}

document.getElementById("passwordForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let passwords = localStorage.getItem("passwords");
    let passwordData = passwords ? JSON.parse(passwords) : [];

    passwordData.push({
        website: website,
        username: username,
        password: hashPassword(password)
    });

    localStorage.setItem("passwords", JSON.stringify(passwordData));
    alert("Password Saved");
    showPasswords();
});

// Initial display of stored passwords
showPasswords();

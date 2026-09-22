let users = [];

function submitForm() {
    let form = document.getElementById("user-form");
    
    // Get values from the form inputs
    let fname = form["first-name"].value;
    let lname = form["last-name"].value;
    let email = form["email"].value;
    let colour = form["profile-colour"].value;
    let phone = form["phone"].value;
    let address = form["billing-address"].value;

    // Create the user object with all fields
    const user = {
        firstName: fname,
        lastName: lname,
        email: email,
        profileColour: colour,
        phone: phone,
        billingAddress: address
    };

    // Add the user to the array
    users.push(user);
    
    // Update the webpage to show the users
    loadUsers();
    
    // Clear the form fields after submission
    form.reset();
}

function loadUsers() {
    let userList = document.getElementById("user-list");
    
    // Clear previous entries to prevent duplicates
    userList.innerHTML = "";

    // Loop over the users array and create a div for each user
    for (let i = 0; i < users.length; i++) {
        let userDiv = document.createElement("div");
        userDiv.classList.add("user");
        
        // Add a border or some spacing just to make it readable
        userDiv.style.border = "1px solid #ccc";
        userDiv.style.margin = "10px 0";
        userDiv.style.padding = "10px";

        // Populate the div with all user data
        userDiv.innerHTML = `
            <strong>Name:</strong> ${users[i].firstName} ${users[i].lastName} <br>
            <strong>Email:</strong> ${users[i].email} <br>
            <strong>Profile Colour:</strong> ${users[i].profileColour} <br>
            <strong>Phone:</strong> ${users[i].phone} <br>
            <strong>Billing Address:</strong> ${users[i].billingAddress}
        `;

        // Add the div to the section
        userList.appendChild(userDiv);
    }
}

// Event listener linking the click event to the submitForm function
document.getElementById("user-form-submit").addEventListener("click", submitForm);
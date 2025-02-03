document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const name = document.getElementById("Fname");
    const lastName = document.getElementById("LName");
    const phone = document.getElementById("PhoneNum");
    const userName = document.getElementById("UName");
    const password = document.getElementById("password");

    form.addEventListener('submit', (e) => {
        let errors = [];

        if (name) {
            // If we have a firstname input then we are in the signup
            errors = getSignupFormErrors(name.value, lastName.value, phone.value, userName.value, password.value);
            if (errors.length === 0) {
                // Store signup information in localStorage
                const signupData = {
                    name: name.value,
                    lastName: lastName.value,
                    phone: phone.value,
                    userName: userName.value,
                    password: password.value
                };
                localStorage.setItem('signupData', JSON.stringify(signupData));
                console.log('Signup data stored:', signupData);
            }
        } else {
            // If we don't have a firstname input then we are in the login
            errors = getLoginFormErrors(userName.value, password.value);
            if (errors.length === 0) {
                // Verify login information against stored signup information
                const signupData = JSON.parse(localStorage.getItem('signupData'));
                console.log('Stored signup data:', signupData);
                console.log('Login attempt with:', { userName: userName.value, password: password.value });
                if (signupData && signupData.userName === userName.value && signupData.password === password.value) {
                    // Redirect to profile.html on successful login
                    console.log('Login successful, redirecting to profile.html');
                    window.location.href = "profile.html";
                } else {
                    errors.push('Invalid username or password');
                    console.log('Login failed: Invalid username or password');
                }
            }
        }

        if (errors.length > 0) {
            // If there are any errors
            e.preventDefault();
            error_message.innerText = errors.join(". ");
        }
    });

    function getSignupFormErrors(name, lastName, phone, userName, password) {
        let errors = [];

        if (name === '' || name == null) {
            errors.push('Firstname is required');
            name.parentElement.classList.add('incorrect');
        }
        if (lastName === '' || lastName == null) {
            errors.push('Lastname is required');
            lastName.parentElement.classList.add('incorrect');
        }
        if (phone === '' || phone == null) {
            errors.push('Phone number is required');
            phone.parentElement.classList.add('incorrect');
        }
        if (userName === '' || userName == null) {
            errors.push('Username is required');
            userName.parentElement.classList.add('incorrect');
        }
        if (password === '' || password == null) {
            errors.push('Password is required');
            password.parentElement.classList.add('incorrect');
        }
        if (password.length < 8) {
            errors.push('Password must have at least 8 characters');
            password.parentElement.classList.add('incorrect');
        }

        return errors;
    }

    function getLoginFormErrors(userName, password) {
        let errors = [];

        if (userName === '' || userName == null) {
            errors.push('Username is required');
            userName.parentElement.classList.add('incorrect');
        }
        if (password === '' || password == null) {
            errors.push('Password is required');
            password.parentElement.classList.add('incorrect');
        }

        return errors;
    }
});

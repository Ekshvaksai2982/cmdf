document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validation: Check if all fields are filled
    if (!firstName || !email || !phone) {
        alert('Please fill in all fields!');
        return;
    }

    // Validation: Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Validation: Check phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }

    // Capture the user's local date and time
    const localDate = new Date();
    const localDateString = localDate.toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Prepare data to send to the server
    const signupData = {
        firstName,
        email,
        phone,
        signupDate: localDateString,
        timeZone: timeZone
    };

    // Send data to the server
    fetch('https://cmd-q2zw.onrender.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Welcome, ${firstName}! Your signup was successful.\nEmail: ${email}\nPhone: ${phone}`);
            this.reset(); // Reset the form
            window.location.href = `https://cmdf.onrender.com/index1.html?firstName=${encodeURIComponent(firstName)}`; // Redirect to frontend domain
        } else {
            alert('Error during signup: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while signing up. Please try again.');
    });
});

// Input focus/blur effects for labels
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.transform = 'translateY(-5px)';
    });
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').style.transform = 'translateY(0)';
        }
    });
});
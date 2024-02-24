document.getElementById('check-button').addEventListener('click', function() {
    var password = document.getElementById('password').value;
    var resultElement = document.getElementById('result');
    var result = checkPasswordStrength(password);
    
    resultElement.textContent = 'Result: ' + result;
    
    if (result === "Weak") {
        resultElement.style.color = 'red';
    } else if (result === "Moderate") {
        resultElement.style.color = 'yellow';
    } else {
        resultElement.style.color = 'green';
    }
});

function checkPasswordStrength(password) {
    var score = 0;

    // Check for length
    if (password.length >= 8) {
        score++;
    }

    // Check for lower case letters
    if (/[a-z]/.test(password)) {
        score++;
    }

    // Check for upper case letters
    if (/[A-Z]/.test(password)) {
        score++;
    }

    // Check for digits
    if (/\d/.test(password)) {
        score++;
    }

    // Check for special characters
    if (/[!@#$%^&*()_+=\-`~?;:'<>.,|]/.test(password)) {
        score++;
    }

    // Evaluate score
    if (score < 3) {
        return "Weak";
    } else if (score < 5) {
        return "Moderate";
    } else {
        return "Strong";
    }
}

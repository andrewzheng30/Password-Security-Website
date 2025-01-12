document.getElementById('check-button').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const resultElement = document.getElementById('result');

    if (!password) {
        resultElement.textContent = "Please enter a password.";
        resultElement.style.color = "red";
        return;
    }

    const score = checkPasswordStrength(password);
    resultElement.textContent = `Password Strength: ${score}`;
    resultElement.style.color = score === "Weak" ? "red" : score === "Moderate" ? "orange" : "green";
});

function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score < 3) return "Weak";
    if (score < 5) return "Moderate";
    return "Strong";
}

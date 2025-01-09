document.getElementById('check-breach').addEventListener('click', async function () {
    const password = document.getElementById('password').value;
    const breachResultElement = document.getElementById('breach-result');

    if (!password) {
        breachResultElement.textContent = "Please enter a password.";
        breachResultElement.style.color = "red";
        return;
    }

    try {
        const breached = await checkPasswordBreach(password);
        breachResultElement.textContent = breached
            ? "Your password has been exposed in a data breach."
            : "Your password is safe.";
        breachResultElement.style.color = breached ? "red" : "green";
    } catch (error) {
        breachResultElement.textContent = "Error checking password breach.";
        breachResultElement.style.color = "orange";
    }
});

async function checkPasswordBreach(password) {
    const hash = await sha1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5).toUpperCase();

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();

    return data.includes(suffix);
}

async function sha1(message) {
    const buffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

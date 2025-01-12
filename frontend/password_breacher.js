document.getElementById('check-breach').addEventListener('click', async function () {
    const password = document.getElementById('password').value;
    const breachResultElement = document.getElementById('breach-result');

    if (!password) {
        breachResultElement.textContent = "Please enter a password.";
        breachResultElement.style.color = "red";
        return;
    }

    // Show loading message
    breachResultElement.textContent = "Checking password...";
    breachResultElement.style.color = "blue";

    try {
        const breachCount = await checkPasswordBreach(password);
        if (breachCount > 0) {
            breachResultElement.textContent = `Your password has been exposed in ${breachCount} breaches. Please change it immediately!`;
            breachResultElement.style.color = "red";
        } else {
            breachResultElement.textContent = "Your password is safe and has not been found in any breaches.";
            breachResultElement.style.color = "green";
        }
    } catch (error) {
        breachResultElement.textContent = "Error checking password breach. Please try again.";
        breachResultElement.style.color = "orange";
        console.error("Error:", error);
    }
});

async function checkPasswordBreach(password) {
    const hash = await sha1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5).toUpperCase();

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data from Have I Been Pwned API");
    }

    const data = await response.text();

    // Check for the hash suffix in the API response and get the breach count
    const matches = data.split('\n').find(line => line.startsWith(suffix));
    if (matches) {
        const count = parseInt(matches.split(':')[1], 10); // Extract breach count
        return count;
    }

    return 0; // No matches found
}

async function sha1(message) {
    const buffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

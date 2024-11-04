async function subscribe() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subscribeBtn = document.getElementById('subscribeBtn');

    console.log(name,email)
    // Basic validation
    if (!name || !email) {
        alert('Please fill in both fields.');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Disable button to prevent multiple submissions
    subscribeBtn.disabled = true;
    subscribeBtn.innerText = 'Subscribing...';

    try {
        const response = await fetch('http://localhost:5000/api/furni/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            alert('Subscribed successfully!');
            

        } else {
            const errorData = await response.json();
            alert(`Failed to subscribe: ${errorData.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    } finally {
        // Re-enable button
        subscribeBtn.disabled = false;
        subscribeBtn.innerHTML = '<span class="fa fa-paper-plane"></span> Subscribe';
    }
}
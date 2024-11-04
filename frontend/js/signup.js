async function register(event) {

    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const passwordHash = document.getElementById('password').value;
    const registerBtn = document.getElementById('register_btn');

console.log(name);
      // Basic validation
      if (!name || !email ||!passwordHash) {

        alert('Please fill in all fields.');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Disable button to prevent multiple submissions
    registerBtn.disabled = true;
    registerBtn.innerText = 'creating account...';



    try {
        const response = await fetch('http://localhost:5000/api/furni/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email,passwordHash }),
        });

        if (response.ok) {
            alert('registered successfully!');
            

        } else {
            const errorData = await response.json();
            alert(`Failed to register: ${errorData.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    } finally {
        // Re-enable button
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<span class="fa fa-paper-plane"></span> Subscribe';
    }





}
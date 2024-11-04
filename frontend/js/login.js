async function login(event) {
    event.preventDefault();

    const passwordHash = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const loginBtn = document.querySelector('.form-btn');

    if (!passwordHash || !email) {
        alert('Please fill in both fields.');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.innerText = 'Logging in...';

    try {
        const response = await fetch('http://localhost:5000/api/furni/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passwordHash, email }),
        });

        if (response.ok) {
            const responseData = await response.json();
            alert('Login successful!');
            localStorage.setItem('token', responseData.token); 
            console.log(responseData.token);// Store token in local storage

            window.location.href = 'index.html'; 
            
        } else {
            const errorData = await response.json();
            alert(`Failed to Login: ${errorData.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    } finally {
        loginBtn.disabled = false;
        loginBtn.innerText = 'Log in';
    }
}

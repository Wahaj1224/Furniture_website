async function Feedback() {
    const firstName = document.getElementById('Fname').value.trim();
    const lastName = document.getElementById('Lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
  
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(message);
  
    const data={firstName,lastName,email,message};
    // Basic validation
    if (!firstName || !lastName || !email || !message) {
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
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';
  
    try {
      const response = await fetch('http://localhost:5000/api/furni/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ firstName, lastName, email, message })
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        alert('Message sent successfully!');

        // Clear form fields after successful submission
        document.getElementById('Fname').value = '';
        document.getElementById('Lname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.innerText = 'Send Message';
    }
}

// Event listener for form submission
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    await Feedback(); // Call Feedback function when form is submitted
});

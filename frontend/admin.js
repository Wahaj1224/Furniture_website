async function blog_post(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const blog_body = document.getElementById('blog_body').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const blog_button = document.getElementById('blog_button');

    // Basic validation
    if (!title || !author || !blog_body || !fileInput) {
        alert('Please fill in all fields and select an image.');
        return;
    }

    // Disable button to prevent multiple submissions
    blog_button.disabled = true;
    blog_button.innerText = 'Uploading...';

    const formData = new FormData();
    formData.append('blog_name', title);
    formData.append('blog_author', author);
    formData.append('blog_body', blog_body);
    formData.append('blog_image', fileInput);

    try {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg1MGY5ZjMxYWJiNzA0NDZjNzkwMGEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjMyODc3MzksImV4cCI6MTcyMzM3NDEzOX0.hhCz-y9wiFp3FkLJ5YotDCXzC1HOCVGPqk_PrJg2NHk';
        const token = localStorage.getItem('token'); 
        console.log(token)
        const response = await fetch('http://localhost:5000/api/furni/blog', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // credentials: 'include',
            body: formData,
        });

        if (response.ok) {
            alert('Uploaded successfully!');
        } else {
            const errorData = await response.json();
            alert(`Failed to upload: ${errorData.error}`);
        }
    } catch (error) {
        alert(`An error occurred. Please try again later.${error}`);
    } finally {
        // Re-enable button
        blog_button.disabled = false;
        blog_button.innerHTML = 'Upload Image <span class="fa fa-paper-plane"></span>';
    }
}

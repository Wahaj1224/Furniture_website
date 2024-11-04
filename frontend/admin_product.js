async function product_post(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const product_name = document.getElementById('product_name').value;
    const price = document.getElementById('price').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const uploadButton = document.getElementById('uploadButton');

    // Basic validation
    if (!product_name || !price || !fileInput) {
        alert('Please fill in all fields and select an image.');
        return;
    }

    // Disable button to prevent multiple submissions
    uploadButton.disabled = true;
    uploadButton.innerText = 'Uploading...';

    const formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('product_price', price);
    formData.append('product_image', fileInput);

    try {
        const response = await fetch('http://localhost:5000/api/furni/product', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Uploaded successfully!');
        } else {
            const errorData = await response.json();
            alert(`Failed to upload: ${errorData.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    } finally {
        // Re-enable button
        uploadButton.disabled = false;
        uploadButton.innerHTML = 'Upload Image <span class="fa fa-paper-plane"></span>';
    }
}

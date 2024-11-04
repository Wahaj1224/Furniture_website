import { storage } from './firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js';

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const imageURLContainer = document.getElementById('imageURLContainer');

let uploading = false;

fileInput.addEventListener('change', handleImageChange);

async function handleImageChange(e) {
    const image = e.target.files[0];
    if (image) {
        try {
            setUploading(true);
            const storageRef = ref(storage, 'images/' + image.name);
            await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(storageRef);
            console.log(downloadURL);
            imageURLContainer.innerHTML = `<p>Image URL: <a href="${downloadURL}" target="_blank">${downloadURL}</a></p>`;
        } catch (error) {
            console.log(error);
        } finally {
            setUploading(false);
        }
    }
}

function setUploading(state) {
    uploading = state;
    uploadButton.disabled = state;
    uploadButton.textContent = state ? 'Uploading...' : 'Upload Image';
}

uploadButton.addEventListener('click', () => {
    if (!uploading) {
        fileInput.click();
    }
});

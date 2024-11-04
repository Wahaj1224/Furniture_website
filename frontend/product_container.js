// const baseURL = 'http://localhost:5000'; // Backend base URL
// const frontendURL = 'http://127.0.0.1:8080/frontend'; // Frontend base URL

async function fetchProducts() {
    try {
        const response = await fetch(`http://localhost:5000/api/furni/content`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        // console.log('Fetched data:', data); // Log fetched data
        
        createProductArray(data);

    } catch (error) {
        // console.error('Error fetching products:', error);
        alert('An error occurred while fetching products. Please try again later.');
    }
}

function createProductArray(data) {
    const productArray = data.map(item => {
        // Remove the first 5 characters from item.product_image
        const trimmedImageURL = item.product_image.slice(4);

        return {
            frontendImageURL: trimmedImageURL,
            productName: item.product_name || 'No Name',
            productPrice: item.product_price || 'No Price',
        };
    });

    // console.log('Product Array:', productArray); // Log the array of objects
    displayProductshome(productArray);
    displayRecentProducts(productArray);
}

function displayProductshome(productArray) {
    const productContainer = document.getElementById('productContainerhome');
    productContainer.innerHTML = '';

    if (!productContainer) {
        console.log("No recent product container found");
        return;
    }

    // Loop through the first 3 products in the productArray
    for (let i = 0;  i < productArray.length; i++) {
        const product = productArray[i];
        const productDivhome = document.createElement('div');
        productDivhome.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-5', 'mb-md-0');
        // console.log("checking is " +product.frontendImageURL);

        productDivhome.innerHTML = `
            <a class="product-item" href="#">
                <img src="${product.frontendImageURL}" class="img-fluid product-thumbnail" alt="${product.productName}">
                
                <h3 class="product-title">${product.productName}</h3>
                <strong class="product-price">${product.productPrice}</strong>
                <span class="icon-cross">
                    <img src="images/cross.svg" class="img-fluid">
                </span>
            </a>
        `;
        productContainer.appendChild(productDivhome);
    }
}




// function displayRecentProducts(ProductArray) {
//     console.log('Initial ProductArray:', ProductArray);

//     // Sort products by a relevant timestamp or property if available
//     const sortedProducts = ProductArray.sort((a, b) => new Date(b.productTimestamp) - new Date(a.productTimestamp));
//     console.log('Sorted Products:', sortedProducts);

//     // Get the top 3 recent products
//     const recentProducts = sortedProducts.slice(0, 3);
//     console.log('Recent Products:', recentProducts);

//     // Find the container for recent products
//     const recentProductContainer = document.getElementsByClassName("recentproducts_new");
//     if (!recentProductContainer) {
//         console.log("No recent product container found");
//         return;
//     }
     
//     // Clear the entire recentProductContainer
//     recentProductContainer.innerHTML = '';

//     // Create a new row container for the products
//     const newRow = document.createElement('div');
//     newRow.classList.add('row');

//     // Iterate through the recent products and create HTML elements for each
//     recentProducts.forEach((Product) => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-5', 'mb-md-0');
        
//         productDiv.innerHTML = `
//             <a class="product-item" href="#">
//                 <img src="${Product.frontendImageURL}" class="img-fluid product-thumbnail" alt="${Product.productName}">
//                 <h3 class="product-title">${Product.productName}</h3>
//                 <strong class="product-price">${Product.productPrice}</strong>
//                 <span class="icon-cross">
//                     <img src="images/cross.svg" class="img-fluid">
//                 </span>
//             </a>
//         `;
        
//         // Append the product item to the new row container
//         newRow.appendChild(productDiv);
//         console.log('Appended Product:', Product);
//     });

//     // Append the new row to the recentProductContainer
//     recentProductContainer.appendChild(newRow);
// }

// Call the function to fetch and display products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

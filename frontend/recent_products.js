document.addEventListener('DOMContentLoaded', fetchProducts);

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
        console.log('Fetched data:', data); // Log fetched data
        
        createProductArray(data);

    } catch (error) {
        console.error('Error fetching products:', error);
        alert('An error occurred while fetching products. Please try again later.');
    }
}

function createProductArray(data) {
    const productArray = data.map(item => {
        const trimmedImageURL = item.product_image.slice(4);
        return {
            frontendImageURL: trimmedImageURL,
            productName: item.product_name || 'No Name',
            productPrice: item.product_price || 'No Price',
        };
    });

    console.log('Product Array:', productArray); // Log the array of objects
    displayRecentProducts(productArray);
}

function displayRecentProducts(ProductArray) {
    console.log('Initial ProductArray:', ProductArray);

    // Sort products by a relevant timestamp or property if available
    const sortedProducts = ProductArray.sort((a, b) => new Date(b.productTimestamp) - new Date(a.productTimestamp));
    console.log('Sorted Products:', sortedProducts);

    // Get the top 3 recent products
    const recentProducts = sortedProducts.slice(0, 3);
    console.log('Recent Products:', recentProducts);

    // Find the container for recent products
    const recentProductContainer = document.getElementById("recent-products-row");
    if (!recentProductContainer) {
        console.log("No recent product container found");
        return;
    }
     
    // Clear the entire recentProductContainer except the first child
    while (recentProductContainer.children.length > 1) {
        recentProductContainer.removeChild(recentProductContainer.lastChild);
    }

    // Iterate through the recent products and create HTML elements for each
    recentProducts.forEach((Product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-5', 'mb-md-0');
        
        productDiv.innerHTML = `
            <a class="product-item" href="#">
                <img src="${Product.frontendImageURL}" class="img-fluid product-thumbnail" alt="${Product.productName}">
                <h3 class="product-title">${Product.productName}</h3>
                <strong class="product-price">$${Product.productPrice}</strong>
                <span class="icon-cross">
                    <img src="images/cross.svg" class="img-fluid">
                </span>
            </a>
        `;
        
        // Append the product item to the recentProductContainer
        recentProductContainer.appendChild(productDiv);
        console.log('Appended Product:', Product);
    });
}
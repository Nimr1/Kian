document.addEventListener('DOMContentLoaded', function() {
    // This is our mock database. In a real application, this would come from a server.
    // We use localStorage to persist data between page loads.
    const initialProducts = [
        {
            id: 1,
            name: "Vintage Denim Jacket",
            price: "£45.00",
            description: "A classic 90s denim jacket in great condition. Perfect for a layered look.",
            image: "images/item1.jpg"
        },
        {
            id: 2,
            name: "Floral Summer Dress",
            price: "£25.00",
            description: "Light and airy floral dress, ideal for sunny days. Size M.",
            image: "images/item2.jpg"
        },
        {
            id: 3,
            name: "Leather Ankle Boots",
            price: "£55.00",
            description: "Stylish and durable leather boots. Barely worn. Size 7.",
            image: "images/item3.jpg"
        },
        {
            id: 4,
            name: "Retro Graphic T-Shirt",
            price: "£15.00",
            description: "Soft cotton t-shirt with a cool, faded retro print. Unisex.",
            image: "images/item4.jpg"
        },
        {
            id: 5,
            name: "High-Waisted Jeans",
            price: "£30.00",
            description: "Comfortable and fashionable high-waisted mom jeans. Size 12.",
            image: "images/item5.jpg"
        },
        {
            id: 6,
            name: "Wool Blend Scarf",
            price: "£18.00",
            description: "A cozy and warm scarf, perfect for chilly evenings.",
            image: "images/item6.jpg"
        }
    ];

    // Check if products exist in localStorage, if not, initialize with default data
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    // Load products from localStorage
    const products = JSON.parse(localStorage.getItem('products'));

    const productList = document.getElementById('product-list');

    // Function to render products
    function renderProducts() {
        productList.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <div class="product-header">
                        <h3>${product.name}</h3>
                        <span class="price">${product.price}</span>
                    </div>
                    <p>${product.description}</p>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    // Initial render
    renderProducts();
});
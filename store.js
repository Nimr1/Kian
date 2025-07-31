document.addEventListener('DOMContentLoaded', function() {
    
    // This is our mock database. In a real application, this would come from a server.
    // We use localStorage to persist data between page loads.
    // IMPORTANT: Each product now has a 'stripePriceId' which you must get from your Stripe dashboard.
    const initialProducts = [
        {
            id: 1,
            name: "Vintage Denim Jacket",
            price: "£45.00",
            description: "A classic 90s denim jacket in great condition. Perfect for a layered look.",
            image: "images/item1.jpg",
            stripePriceId: "price_REPLACE_WITH_YOUR_ID" // <-- REPLACE
        },
        {
            id: 2,
            name: "Floral Summer Dress",
            price: "£25.00",
            description: "Light and airy floral dress, ideal for sunny days. Size M.",
            image: "images/item2.jpg",
            stripePriceId: "price_REPLACE_WITH_YOUR_ID" // <-- REPLACE
        },
        {
            id: 3,
            name: "Leather Ankle Boots",
            price: "£55.00",
            description: "Stylish and durable leather boots. Barely worn. Size 7.",
            image: "images/item3.jpg",
            stripePriceId: "price_REPLACE_WITH_YOUR_ID" // <-- REPLACE
        },
        {
            id: 4,
            name: "Retro Graphic T-Shirt",
            price: "£15.00",
            description: "Soft cotton t-shirt with a cool, faded retro print. Unisex.",
            image: "images/item4.jpg",
            stripePriceId: "price_REPLACE_WITH_YOUR_ID" // <-- REPLACE
        },
        {
            id: 5,
            name: "High-Waisted Jeans",
            price: "£30.00",
            description: "Comfortable and fashionable high-waisted mom jeans. Size 12.",
            image: "images/item5.jpg",
            stripePriceId: "price_REPLACE_WITH_YOUR_ID" // <-- REPLACE
        },
        {
            id: 6,
            name: "Wool Blend Scarf",
            price: "£18.00",
            description: "A cozy and warm scarf, perfect for chilly evenings.",
            image: "images/item6.jpg",
            stripePriceId: "price_REPLACE_WITH_YOUR_ID" // <-- REPLACE
        }
    ];

    // Check if products exist in localStorage, if not, initialize with default data
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    // Load products from localStorage
    const products = JSON.parse(localStorage.getItem('products'));

    // --- SHOPPING CART LOGIC ---

    // Load cart from localStorage or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to save the cart back to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Function to add a product to the cart
    function addToCart(productId) {
        // Find the full product details from our 'products' list
        const product = products.find(p => p.id == productId);
        if (!product) {
            console.error("Product not found!");
            return;
        }

        // Check if the item is already in the cart
        const cartItem = cart.find(item => item.id == productId);

        if (cartItem) {
            // If it exists, just increase the quantity
            cartItem.quantity += 1;
        } else {
            // If it's a new item, add it to the cart with quantity 1
            cart.push({ 
                id: productId, 
                name: product.name, 
                price: product.price, 
                image: product.image, 
                quantity: 1 
            });
        }
        
        saveCart();
        alert(`${product.name} has been added to your cart!`);
    }

    // Function to update the number in the cart link in the header
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    }

    // --- PAGE RENDERING LOGIC ---
    const productList = document.getElementById('product-list');

    // Function to render all products onto the page
    function renderProducts() {
        productList.innerHTML = ''; // Clear existing products to prevent duplicates
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            // Create the HTML for each product card
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <div class="product-header">
                        <h3>${product.name}</h3>
                        <span class="price">${product.price}</span>
                    </div>
                    <p>${product.description}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productList.appendChild(productItem);
        });

        // After creating the buttons, add event listeners to them
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Get the product ID from the button's data-id attribute
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    // --- INITIALIZATION ---
    // These functions run when the page first loads

    renderProducts();   // Draw all the product cards
    updateCartCount();  // Update the cart count in the header to show the current state
});
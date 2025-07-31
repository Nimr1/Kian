document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalEl = document.getElementById('cart-total');
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        // Update count in header on both store and cart pages
        const cartCountEls = document.querySelectorAll('#cart-count');
        cartCountEls.forEach(el => el.textContent = cartCount);
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            cartContainer.style.display = 'flex';
            emptyCartMessage.style.display = 'none';

            let total = 0;
            cart.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                
                // Note: Parsing the price string to a number for calculation
                const itemPrice = parseFloat(item.price.replace('£', ''));
                total += itemPrice * item.quantity;
                
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <p class="price">£${(itemPrice * item.quantity).toFixed(2)}</p>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsList.appendChild(itemEl);
            });
            cartTotalEl.textContent = `£${total.toFixed(2)}`;
        }
        addRemoveListeners();
    }

    function addRemoveListeners() {
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1); // Remove item from cart array
                saveCart();
            });
        });
    }

    // --- Initial Load ---
    updateCartCount();
    renderCart();
});
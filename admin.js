document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const productForm = document.getElementById('product-form');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productDescriptionInput = document.getElementById('product-description');
    const productImageInput = document.getElementById('product-image');
    const editSelect = document.getElementById('edit-select');
    const deleteBtn = document.getElementById('delete-btn');
    const clearFormBtn = document.getElementById('clear-form-btn');
    const feedbackMessage = document.getElementById('feedback-message');

    // Load products from localStorage or use an empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // --- FUNCTIONS ---

    // Function to populate the dropdown for editing
    function populateEditSelect() {
        editSelect.innerHTML = '<option value="">-- Add New Item --</option>'; // Reset
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            editSelect.appendChild(option);
        });
    }

    // Function to show feedback message
    function showFeedback(message, isSuccess) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = isSuccess ? 'feedback success' : 'feedback error';
        setTimeout(() => {
            feedbackMessage.textContent = '';
            feedbackMessage.className = 'feedback';
        }, 3000);
    }

    // Function to clear the form fields and reset state
    function clearForm() {
        productForm.reset();
        productIdInput.value = '';
        editSelect.value = '';
        deleteBtn.style.display = 'none';
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback';
    }
    
    // Function to save products array to localStorage
    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }


    // --- EVENT LISTENERS ---

    // Handle dropdown change to populate form for editing
    editSelect.addEventListener('change', function() {
        const selectedId = this.value;
        if (selectedId) {
            const productToEdit = products.find(p => p.id == selectedId);
            if (productToEdit) {
                productIdInput.value = productToEdit.id;
                productNameInput.value = productToEdit.name;
                productPriceInput.value = productToEdit.price;
                productDescriptionInput.value = productToEdit.description;
                productImageInput.value = productToEdit.image;
                deleteBtn.style.display = 'inline-block'; // Show delete button
            }
        } else {
            // If "-- Add New Item --" is selected, clear form
            clearForm();
        }
    });

    // Handle form submission for adding or updating a product
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = productIdInput.value;
        const productData = {
            name: productNameInput.value,
            price: productPriceInput.value,
            description: productDescriptionInput.value,
            image: productImageInput.value,
        };

        if (id) {
            // Update existing item
            const index = products.findIndex(p => p.id == id);
            if (index > -1) {
                products[index] = { ...products[index], ...productData };
                showFeedback('Item updated successfully!', true);
            }
        } else {
            // Add new item
            productData.id = Date.now(); // Simple unique ID
            products.push(productData);
            showFeedback('New item added successfully!', true);
        }

        saveProducts();
        populateEditSelect();
        clearForm();
    });

    // Handle delete button click
    deleteBtn.addEventListener('click', function() {
        const id = productIdInput.value;
        if (id && confirm('Are you sure you want to delete this item?')) {
            products = products.filter(p => p.id != id);
            saveProducts();
            populateEditSelect();
            clearForm();
            showFeedback('Item deleted successfully!', true);
        }
    });
    
    // Handle clear form button click
    clearFormBtn.addEventListener('click', clearForm);

    // --- INITIALIZATION ---

    // Initial population of the dropdown
    populateEditSelect();
});
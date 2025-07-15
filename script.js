document.addEventListener('DOMContentLoaded', () => {

const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartContent = cartSidebar.querySelector('.cart-content');
const checkoutButton = document.querySelector('.checkout-button');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartTotalDisplay = document.getElementById('cart-total-display');

function updateTotal() {
    let total = 0;
    const cartItems = cartContent.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const priceText = item.getAttribute('data-price') || '0';
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        total += price;
    });
    if (cartTotal) {
        cartTotal.textContent = `Total: Rp${total.toLocaleString()}`;
    }
    if (cartTotalDisplay) {
        cartTotalDisplay.textContent = `Total: Rp${total.toLocaleString()}`;
    }
}

cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-price', productPrice);
        cartItem.innerHTML = `
            <span>${productName} - ${productPrice}</span>
            <button class="remove-item">✕</button>
        `;

        const emptyMessage = cartContent.querySelector('p');
        if (emptyMessage) emptyMessage.remove();

        cartContent.appendChild(cartItem);
        updateCartCount();
        updateTotal();

        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            cartItem.remove();
            if (!cartContent.querySelector('.cart-item')) {
                cartContent.innerHTML = '<p>Keranjang Anda masih kosong.</p>';
            }
            updateCartCount();
            updateTotal();
        });
    }
});

function updateCartCount() {
    const itemCount = cartContent.querySelectorAll('.cart-item').length;
    cartCount.textContent = itemCount;
    cartCount.style.display = itemCount > 0 ? 'inline-block' : 'none';
}

// === CHECKOUT BUTTON: Tampilkan Ringkasan Pesanan ===
checkoutButton.addEventListener('click', () => {
    const cartItems = cartContent.querySelectorAll('.cart-item span');
    if (cartItems.length === 0) {
        alert('Keranjang masih kosong.');
        return;
    }

    let summaryText = 'Pesanan Anda:\n\n';
    cartItems.forEach(item => {
        summaryText += `- ${item.textContent}\n`;
    });

    const totalText = cartTotalDisplay ? cartTotalDisplay.textContent : '';
    summaryText += `\n${totalText}`;

    alert(summaryText);
});

// Initialize on load
updateTotal();

});

document.getElementById('contact-button').addEventListener('click', function() {
    const options = document.getElementById('contact-options');
    options.classList.toggle('hidden');
});

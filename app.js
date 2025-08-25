// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('section nav');
    const toggle = nav.querySelector('.menu-toggle');
    const menuList = nav.querySelector('ul');

    if (!toggle) return;

    // toggle open/close
    toggle.addEventListener('click', function (e) {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        const icon = toggle.querySelector('i');
        if (isOpen) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // close when clicking a nav link (useful on mobile)
    menuList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // ensure nav resets when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });
});
// ...existing code...











// Wishlist toggle
const wishlistButtons = document.querySelectorAll('.small_card i');
wishlistButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});

// Cart logic
const cartIcon = document.querySelector('.fa-cart-shopping');
const orderButtons = document.querySelectorAll('.menu_btn');
let cart = [];

// Cart badge
const cartBadge = document.createElement('span');
cartBadge.style.position = 'absolute';
cartBadge.style.top = '5px';
cartBadge.style.right = '10px';
cartBadge.style.background = '#fac031';
cartBadge.style.color = '#fff';
cartBadge.style.borderRadius = '50%';
cartBadge.style.padding = '3px 7px';
cartBadge.style.fontSize = '14px';
cartBadge.innerText = '0';
cartIcon.style.position = 'relative';
cartIcon.appendChild(cartBadge);

// Sidebar elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout');

// Show sidebar when cart icon clicked
cartIcon.addEventListener('click', () => {
    cartSidebar.style.display = 'block';
});

// Close sidebar
closeCartBtn.addEventListener('click', () => {
    cartSidebar.style.display = 'none';
});

// Checkout action
checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    cartSidebar.style.display = 'none';
});

// Add items to cart
orderButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const card = this.closest('.menu_card');
        const name = card.querySelector('h2').innerText;
        const priceText = card.querySelector('h3').innerText.replace('$','');
        const price = parseFloat(priceText);

        // Check if item already in cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({name, price, quantity: 1});
        }
        updateCartUI();
    });
});

function updateCartUI() {
    // Update badge
    cartBadge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart list
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';
        li.innerHTML = `
            <span>${item.name}</span>
            <div style="display:flex; align-items:center;">
                <button style="padding:5px; background:#ccc; border:none; cursor:pointer;" onclick="decreaseQty(${index})">-</button>
                <span style="margin:0 10px;">${item.quantity}</span>
                <button style="padding:5px; background:#ccc; border:none; cursor:pointer;" onclick="increaseQty(${index})">+</button>
                <span style="margin-left:10px;">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.appendChild(li);
    });
    cartTotalEl.innerText = total.toFixed(2);
}

window.increaseQty = function(index) {
    cart[index].quantity += 1;
    updateCartUI();
}

window.decreaseQty = function(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // remove if quantity is 0
    }
    updateCartUI();
}


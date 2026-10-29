const cartItems = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");


// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display cart
function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 😢</h2>
                <p>Add some products to your cart.</p>
            </div>
        `;

        totalItems.textContent = "0";
        totalPrice.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach(function(product, index) {

        // Convert price like ₹2,499 to number
        let price = Number(
            product.price.replace("₹", "").replace(/,/g, "")
        );

        total += price;


        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            
            <div class="cart-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="cart-product-details">

                <h3>${product.name}</h3>

                <p>⭐ ${product.rating}</p>

                <p class="cart-price">
                    ${product.price}
                </p>

                <p class="cart-discount">
                    ${product.discount}
                </p>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        `;

        cartItems.appendChild(item);

    });


    // Show totals

    totalItems.textContent = cart.length;

    totalPrice.textContent =
        "₹" + total.toLocaleString("en-IN");

}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// Display when page loads
displayCart();


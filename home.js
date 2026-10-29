

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

function searchProducts() {

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        return;
    }

    window.location.href =
        "products.html?search=" +
        encodeURIComponent(searchText);
}


searchButton.addEventListener(
    "click",
    searchProducts
);


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            searchProducts();
        }

    }
);


// ==============================
// ADD TO CART
// ==============================

// Get all Add to Cart buttons
const cartButtons =
    document.querySelectorAll(".add-cart");


// Get existing cart
let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// Product information
const products = [

    {
        id: 1,
        name: "boAt Wave Call Smartwatch",
        image: "smartwatch.webp",
        rating: "4.5",
        reviews: "1,245",
        discount: "50% OFF",
        price: "₹2,499",
        oldPrice: "₹4,999"
    },

    {
        id: 2,
        name: "Nike Air Max Sneakers",
        image: "nike.webp",
        rating: "4.6",
        reviews: "890",
        discount: "40% OFF",
        price: "₹1,499",
        oldPrice: "₹2,499"
    },

    {
        id: 3,
        name: "Safari Laptop Backpack",
        image: "bag.webp",
        rating: "4.4",
        reviews: "756",
        discount: "44% OFF",
        price: "₹899",
        oldPrice: "₹1,599"
    },

    {
        id: 4,
        name: "boAt Rockerz 550 Headphones",
        image: "headphone.jpg",
        rating: "4.5",
        reviews: "1,102",
        discount: "45% OFF",
        price: "₹1,649",
        oldPrice: "₹2,999"
    },

    {
        id: 5,
        name: "Wild Stone Perfume",
        image: "wildstone.webp",
        rating: "4.3",
        reviews: "632",
        discount: "30% OFF",
        price: "₹349",
        oldPrice: "₹499"
    },

    {
        id: 6,
        name: "Milton Thermosteel Bottle",
        image: "bottle.webp",
        rating: "4.4",
        reviews: "512",
        discount: "35% OFF",
        price: "₹649",
        oldPrice: "₹999"
    },

    {
        id: 7,
        name: "Dynamite Original Pre Workout For Men",
        image: "pre.webp",
        rating: "4.3",
        reviews: "416",
        discount: "30% OFF",
        price: "₹1200",
        oldPrice: "₹4000"
    },

    {
        id: 8,
        name: "WBD 608 Pullback Fully Metal Gun Lighter",
        image: "gun.webp",
        rating: "4.3",
        reviews: "420",
        discount: "30% OFF",
        price: "₹1034",
        oldPrice: "₹3478"
    },

    {
        id: 9,
        name: "Monster Energy Drink",
        image: "monster.webp",
        rating: "4.3",
        reviews: "416",
        discount: "30% OFF",
        price: "₹125",
        oldPrice: "₹416"
    },

    {
        id: 10,
        name: "Acer Nitro 5 Laptop",
        image: "laptop.webp",
        rating: "4.4",
        reviews: "512",
        discount: "35% OFF",
        price: "₹147,990",
        oldPrice: "₹559,996"
    },

    {
        id: 11,
        name: "Drone with Dual 4K Camera",
        image: "drone.webp",
        rating: "4.3",
        reviews: "632",
        discount: "30% OFF",
        price: "₹1395",
        oldPrice: "₹4650"
    },

    {
        id: 12,
        name: "Kadence Acoustic Guitar",
        image: "guitarr.webp",
        rating: "4.3",
        reviews: "632",
        discount: "30% OFF",
        price: "₹8999",
        oldPrice: "₹29,996"
    }

];


// ==============================
// ADD PRODUCT TO CART
// ==============================

cartButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
            function () {

                const product =
                    products[index];

                // Check if product already exists
                const existingProduct =
                    cart.find(
                        item =>
                            item.id === product.id
                    );


                if (existingProduct) {

                    // Increase quantity
                    existingProduct.quantity++;

                } else {

                    // Add new product
                    cart.push({

                        ...product,

                        quantity: 1

                    });

                }


                // Save cart
                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                // Message
                alert(
                    product.name +
                    " added to cart 🛒"
                );

            }
        );

    });


// ==============================
// CART ICON
// ==============================

const cartElement =
    document.querySelector(".cart");


if (cartElement) {

    cartElement.addEventListener(
        "click",
        function () {

            window.location.href =
                "cart.html";

        }
    );

}

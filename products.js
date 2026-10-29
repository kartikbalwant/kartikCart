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
        name: "Dynamite Original Pre Workout For Men, Valencia Orange, 30 Servings",
        image: "pre.webp",
        rating: "4.3",
        reviews: "416",
        discount: "30% OFF",
        price: "₹1200",
        oldPrice: "₹4000"
    },

    {
        id: 8,
        name: "WBD 608 Pullback - Fully Metal Gun Lighter(Grey)",
        image: "gun.webp",
        rating: "4.3",
        reviews: "420",
        discount: "30% OFF",
        price: "₹1034",
        oldPrice: "₹3478"
    },

    {
        id: 9,
        name: "Monster Energy Drink | Peach Flavour",
        image: "monster.webp",
        rating: "4.3",
        reviews: "416",
        discount: "30% OFF",
        price: "₹125",
        oldPrice: "₹416"
    },

    {
        id: 10,
        name: "Acer Nitro 5, Intel Core i7-14650HX",
        image: "laptop.webp",
        rating: "4.4",
        reviews: "512",
        discount: "35% OFF",
        price: "₹147,990",
        oldPrice: "₹559,996"
    },

    {
        id: 11,
        name: "Drone with Dual 4K Camera for Adults",
        image: "drone.webp",
        rating: "4.3",
        reviews: "632",
        discount: "30% OFF",
        price: "₹1395",
        oldPrice: "₹4650"
    },

    {
        id: 12,
        name: "Kadence A06EQ-N Acoustica 40 Electro Acoustic Guitar",
        image: "guitarr.webp",
        rating: "4.3",
        reviews: "632",
        discount: "30% OFF",
        price: "₹8999",
        oldPrice: "₹29,996"
    }
];


// Get search text from URL
const urlParams = new URLSearchParams(window.location.search);

const searchText = (urlParams.get("search") || "").toLowerCase().trim();


// Find product using search
const product = products.find(function(item) {

    return item.name.toLowerCase().includes(searchText);

});


// Display product
if (product) {

    document.getElementById("productImage").src = product.image;

    document.getElementById("productName").textContent = product.name;

    document.getElementById("productRating").textContent = product.rating;

    document.getElementById("productReviews").textContent = product.reviews;

    document.getElementById("productDiscount").textContent = product.discount;

    document.getElementById("productPrice").textContent = product.price;

    document.getElementById("productOldPrice").textContent = product.oldPrice;

} else {

    document.getElementById("productName").textContent =
        "Product Not Found";

    document.getElementById("productImage").src = "";

    document.getElementById("productRating").textContent = "";

    document.getElementById("productReviews").textContent = "";

    document.getElementById("productDiscount").textContent = "";

    document.getElementById("productPrice").textContent = "";

    document.getElementById("productOldPrice").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Shortcut function
    const $ = (id) => document.getElementById(id);

    // Address fields
    const fields = [
        "fullName",
        "mobile",
        "pincode",
        "address",
        "city",
        "state"
    ];

    // Format price
    function money(number) {
        return "₹" + Number(number || 0).toLocaleString("en-IN");
    }

    // Convert price into number
    function getNumber(value) {

        if (typeof value === "number") {
            return value;
        }

        return Number(
            String(value || "").replace(/[₹,]/g, "")
        ) || 0;
    }

    // Get product quantity
    function getQuantity(product) {
        return Number(
            product.quantity ||
            product.qty ||
            1
        );
    }


    /* =========================
       SAVE ADDRESS
    ========================= */

    function saveAddress() {

        let addressData = {};

        fields.forEach((id) => {

            const field = $(id);

            if (field) {
                addressData[id] = field.value.trim();
            }

        });

        localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(addressData)
        );
    }


    /* =========================
       LOAD SAVED ADDRESS
    ========================= */

    function loadAddress() {

        const savedAddress =
            JSON.parse(
                localStorage.getItem("deliveryAddress")
            ) || {};

        fields.forEach((id) => {

            const field = $(id);

            if (field && savedAddress[id]) {
                field.value = savedAddress[id];
            }

        });
    }


    /* =========================
       SAVE ADDRESS WHILE TYPING
    ========================= */

    fields.forEach((id) => {

        const field = $(id);

        if (field) {

            field.addEventListener(
                "input",
                saveAddress
            );

            field.addEventListener(
                "change",
                saveAddress
            );

        }

    });


    /* =========================
       CALCULATE TOTAL
    ========================= */

    function calculateTotal() {

        return cart.reduce(
            (total, product) => {

                const price =
                    getNumber(product.price);

                const quantity =
                    getQuantity(product);

                return total + price * quantity;

            },
            0
        );
    }


    /* =========================
       DISPLAY CART PRODUCTS
    ========================= */

    function renderProducts() {

        const productList =
            $("productList");

        productList.innerHTML = "";

        if (cart.length === 0) {

            productList.innerHTML = `
                <div class="empty">
                    Your cart is empty.
                </div>
            `;

            updateTotal();

            return;
        }


        cart.forEach((product) => {

            const quantity =
                getQuantity(product);

            const price =
                getNumber(product.price);

            const image =
                product.image ||
                product.img ||
                "";

            const item =
                document.createElement("div");

            item.className = "product";

            item.innerHTML = `
                <img
                    src="${image}"
                    alt="${product.name || "Product"}"
                >

                <div class="product-info">

                    <h4>
                        ${product.name || "Product"}
                    </h4>

                    <small>
                        Qty: ${quantity}
                    </small>

                </div>

                <b>
                    ${money(price * quantity)}
                </b>
            `;

            productList.appendChild(item);

        });

        updateTotal();
    }


    /* =========================
       UPDATE TOTAL
    ========================= */

    function updateTotal() {

        const total =
            calculateTotal();

        $("subtotal").textContent =
            money(total);

        $("total").textContent =
            money(total);

        $("payAmount").textContent =
            money(total);
    }


    /* =========================
       PAYMENT DETAILS
    ========================= */

    function showPaymentDetails(method) {

        const paymentDetails =
            $("paymentDetails");


        // Active payment option

        document
            .querySelectorAll(".payment-option")
            .forEach((option) => {

                const radio =
                    option.querySelector("input");

                option.classList.toggle(
                    "active",
                    radio && radio.checked
                );

            });


        /* UPI */

        if (method === "UPI") {

            paymentDetails.innerHTML = `

                <div class="detail">

                    <label>
                        UPI ID
                    </label>

                    <input
                        type="text"
                        id="upiId"
                        placeholder="example@upi"
                    >

                </div>

            `;

            $("payText").textContent =
                "Continue to Pay";
        }


        /* CARD */

        else if (method === "Card") {

            paymentDetails.innerHTML = `

                <div class="detail">

                    <div class="two">

                        <div class="full2">

                            <label>
                                Card Number
                            </label>

                            <input
                                type="text"
                                id="card"
                                maxlength="19"
                                placeholder="1234 5678 9012 3456"
                            >

                        </div>


                        <div>

                            <label>
                                Expiry
                            </label>

                            <input
                                type="text"
                                id="expiry"
                                maxlength="5"
                                placeholder="MM/YY"
                            >

                        </div>


                        <div>

                            <label>
                                CVV
                            </label>

                            <input
                                type="password"
                                id="cvv"
                                maxlength="4"
                                placeholder="***"
                            >

                        </div>

                    </div>

                </div>

            `;

            $("payText").textContent =
                "Continue to Pay";
        }


        /* NET BANKING */

        else if (method === "Net Banking") {

            paymentDetails.innerHTML = `

                <div class="detail">

                    <label>
                        Select Bank
                    </label>

                    <select id="bank">

                        <option value="">
                            Choose your bank
                        </option>

                        <option>
                            State Bank of India
                        </option>

                        <option>
                            HDFC Bank
                        </option>

                        <option>
                            ICICI Bank
                        </option>

                        <option>
                            Axis Bank
                        </option>

                        <option>
                            Punjab National Bank
                        </option>

                    </select>

                </div>

            `;

            $("payText").textContent =
                "Continue to Pay";
        }


        /* CASH ON DELIVERY */

        else {

            paymentDetails.innerHTML = `

                <div class="detail">

                    <b>
                        Cash on Delivery
                    </b>

                    <p style="
                        margin-top:6px;
                        color:#66809e;
                    ">
                        Pay when your order is delivered.
                    </p>

                </div>

            `;

            $("payText").textContent =
                "Place Order";
        }
    }


    /* =========================
       PAYMENT RADIO BUTTONS
    ========================= */

    document
        .querySelectorAll(
            'input[name="payment"]'
        )
        .forEach((radio) => {

            radio.addEventListener(
                "change",
                () => {

                    showPaymentDetails(
                        radio.value
                    );

                }
            );

        });


    /* =========================
       PAY BUTTON
    ========================= */

    $("payBtn").addEventListener(
        "click",
        () => {

            // Check address form

            const addressForm =
                $("addressForm");

            if (!addressForm.checkValidity()) {

                addressForm.reportValidity();

                return;
            }


            // Check cart

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;
            }


            // Validate mobile

            const mobile =
                $("mobile")
                    .value
                    .trim();

            if (!/^\d{10}$/.test(mobile)) {

                alert(
                    "Enter a valid 10-digit mobile number."
                );

                $("mobile").focus();

                return;
            }


            // Validate PIN

            const pin =
                $("pincode")
                    .value
                    .trim();

            if (!/^\d{6}$/.test(pin)) {

                alert(
                    "Enter a valid 6-digit PIN code."
                );

                $("pincode").focus();

                return;
            }


            // Get selected payment

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );

            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            const method =
                selectedPayment.value;


            // UPI validation

            if (method === "UPI") {

                const upi =
                    $("upiId");

                if (
                    !upi ||
                    !upi.value.trim().includes("@")
                ) {

                    alert(
                        "Enter a valid UPI ID."
                    );

                    if (upi) {
                        upi.focus();
                    }

                    return;
                }
            }


            // Card validation

            if (method === "Card") {

                const card =
                    $("card");

                const expiry =
                    $("expiry");

                const cvv =
                    $("cvv");

                if (
                    !card.value.trim() ||
                    !expiry.value.trim() ||
                    !cvv.value.trim()
                ) {

                    alert(
                        "Fill all card details."
                    );

                    return;
                }
            }


            // Net banking validation

            if (method === "Net Banking") {

                const bank =
                    $("bank");

                if (!bank.value) {

                    alert(
                        "Select your bank."
                    );

                    bank.focus();

                    return;
                }
            }


            // Save address

            saveAddress();


            // Create order

            const order = {

                orderId:
                    "KC" + Date.now(),

                customer:
                    JSON.parse(
                        localStorage.getItem(
                            "deliveryAddress"
                        )
                    ),

                paymentMethod:
                    method,

                totalAmount:
                    calculateTotal(),

                products:
                    cart,

                orderDate:
                    new Date().toLocaleString()

            };


            // Save order

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );


            // Clear cart

            localStorage.removeItem(
                "cart"
            );


            // Demo message

            if (
                method ===
                "Cash on Delivery"
            ) {

                alert(
                    "Order placed successfully!"
                );

            } else {

                alert(
                    "Payment step completed for this demo!"
                );

            }


          

          window.location.href = "payment-sucsess.html";
        }
    );


    // Initial load

    loadAddress();

    renderProducts();

    showPaymentDetails("UPI");

});
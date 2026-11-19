// SCREEN NAVIGATION
 
const screens = document.querySelectorAll(".screen");
 
function showScreen(pageId) {
 
screens.forEach(screen => {
screen.classList.remove("active");
});
 
document
.getElementById(pageId)
.classList.add("active");
}

function showScreen(pageId) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(pageId)
        .classList.add("active");
}
 
// SUBMIT PRICE UPDATE
 
function submitPrice() {

    const product =
        document.getElementById("product").value;

    const store =
        document.getElementById("store").value;

    const price =
        document.getElementById("price").value;

    const location =
        document.getElementById("location").value;

    if (!product || !store || !price || !location) {
        alert("Please fill out all fields.");
        return;
    }

    const update = {
        product,
        store,
        price,
        location
    };

    let updates =
        JSON.parse(
            localStorage.getItem("priceUpdates")
        ) || [];

    updates.push(update);

    localStorage.setItem(
        "priceUpdates",
        JSON.stringify(updates)
    );

    loadUpdates();

    loadComparePage();

    alert("Price update saved!");
}
function searchProducts() {

    let input =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        if (
            card.innerText.toLowerCase().includes(input)
        ) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });

}


function reportPrice(productName) {

    showScreen("submit");

    document.getElementById("product").value =
        productName;
}

function loadUpdates() {

    const updatesContainer =
        document.getElementById("updates");

    updatesContainer.innerHTML = "";

    let updates =
        JSON.parse(localStorage.getItem("priceUpdates"))
        || [];

    updates.forEach(update => {

        updatesContainer.innerHTML += `
            <div class="card">
                <strong>${update.product}</strong><br>
                Store: ${update.store}<br>
                Price: $${update.price}<br>
                Location: ${update.location}
            </div>
        `;
    });

}

function updateHomePrices() {

    let updates =
        JSON.parse(localStorage.getItem("priceUpdates"))
        || [];

    const products = {};

    updates.forEach(update => {

        const product =
            update.product.toLowerCase();

        if (
            !products[product] ||
            parseFloat(update.price)
            <
            parseFloat(products[product].price)
        ) {
            products[product] = update;
        }
    });

    if(products.milk){
        document.getElementById("milk-price")
            .innerHTML =
            `Cheapest Price: $${products.milk.price}
             (${products.milk.location})`;
    }

    if(products.eggs){
        document.getElementById("eggs-price")
            .innerHTML =
            `Cheapest Price: $${products.eggs.price}
             (${products.eggs.location})`;
    }

    if(products.bread){
        document.getElementById("bread-price")
            .innerHTML =
            `Cheapest Price: $${products.bread.price}
             (${products.bread.location})`;
    }

}

function loadComparePage() {

    const container =
        document.getElementById("compare-results");

    let updates =
        JSON.parse(localStorage.getItem("priceUpdates"))
        || [];

    updates.forEach(update => {

        const card =
            document.createElement("div");

        card.classList.add(
            "card",
            "product-card"
        );

        card.innerHTML = `
            <h3>${update.store}</h3>
            <p>${update.product} - $${update.price}</p>
            <p>Location: ${update.location}</p>
        `;

        container.appendChild(card);
    });
}

function searchCompareProducts() {

    const input =
        document
            .getElementById("compareSearch")
            .value
            .toLowerCase();

    const cards =
        document.querySelectorAll(
            "#compare-results .product-card"
        );

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

loadUpdates();
updateHomePrices();
loadComparePage();

window.onload = function() {

    loadUpdates();
    updateHomePrices();
    loadComparePage();

};
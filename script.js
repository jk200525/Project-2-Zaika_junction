function redirectToReferrer() {
    const referrer = sessionStorage.getItem("referrer") || "index.html";
    window.location.href = referrer;
}

document.addEventListener("DOMContentLoaded", () => {
    const takeawayForm = document.getElementById("takeawayForm");
    if (takeawayForm) {
        takeawayForm.addEventListener("submit", function (e) {
            e.preventDefault();
            sessionStorage.setItem("referrer", "takeaway.html");
            sessionStorage.setItem("orderType", "takeaway");
            window.location.href = "payment.html";
        });
    }

    const deliveryForm = document.getElementById("deliveryForm");
    if (deliveryForm) {
        deliveryForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const payMethod = document.querySelector('input[name="paymethod"]:checked').value;
            sessionStorage.setItem("orderType", "delivery");
            if (payMethod === "online") {
                sessionStorage.setItem("referrer", "delivery.html");
                window.location.href = "payment.html";
            } else {
                alert("Order confirmed. Please pay on delivery.");
            }
        });
    }
});

function showOrderStatus() {
    const section = document.getElementById("statusSection");
    const statusText = document.getElementById("orderStatus");
    section.style.display = "block";

    const type = sessionStorage.getItem("orderType");
    let steps = [];

    if (type === "takeaway") {
        steps = [
            "Order is being prepared...",
            "Still cooking... 🍲",
            "Almost done!",
            "✅ Order is ready to pick up!"
        ];
    } else if (type === "delivery") {
        steps = [
            "Order is being prepared...",
            "Still cooking... 🍲",
            "Out for delivery 🚚",
            "✅ Order delivered! Enjoy your meal!"
        ];
    } else {
        statusText.textContent = "Tracking info not available.";
        return;
    }

    let index = 0;
    statusText.textContent = steps[index];

    const interval = setInterval(() => {
        index++;
        if (index >= steps.length) {
            clearInterval(interval);
        } else {
            statusText.textContent = steps[index];
        }
    }, 10000);
}

let order = [];
let total = 0;

function orderItem(name, price) {
    order.push({ name, price });
    total += price;
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById("orderList");
    const totalAmount = document.getElementById("totalAmount");

    // Clear and rebuild the order list
    orderList.innerHTML = "";
    order.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        orderList.appendChild(li);
    });

    // Update total
    totalAmount.textContent = total.toFixed(2);
}

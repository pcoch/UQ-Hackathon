// handle link highlight for current page
// **** Mobile Menu ****
const menuButton = document.querySelector(".menu-btn");
const closeButton = document.querySelector(".close-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

// Open the modal
function openModal() {
  mobileMenu.classList.add("show");
  overlay.classList.add("show");
}

// Close the modal
function closeModal() {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
}

// Event listeners to open and close the modal
menuButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// Event listeners to close modal if screen resized
window.addEventListener("resize", () => {
  var windowWidth = window.innerWidth;

  //close modal is window size greater then 769px
  if (windowWidth > 768) {
    closeModal();
  }
});

// **** Highlight Current Page in Nav ****
const currentPath = window.location.pathname;
const menuItems = document.querySelectorAll(".nav-link a");

menuItems.forEach((link) => {
  const linkPath = link.getAttribute("href");

  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

// **** Checkout Functionality ****
//Quantity Buttons & Count
const addQtyBtn = document.getElementById("add");
const minusQtyBtn = document.getElementById("minus");
const quanityElement = document.getElementById("qty");

//Cart Total Count
const totalElement = document.getElementById("total");

//Warning Message
const warningElement = document.getElementById("alert");

//Checkout Form
const checkoutForm = document.getElementById("checkout");

//Buy Button
const buyButton = document.getElementById("buy");

//Disable Buy button if cart quantity < 1
if (buyButton) {
  buyButton.disabled = true;
}
//Handle Quantity Selection
function handleQty(event) {
  //store cart qty and total in state
  let cartQuantity = parseInt(quanityElement.innerHTML);
  let cartTotal = parseInt(totalElement.innerHTML);

  //handle increment qty
  if (event.target.id == "add") {
    //limit checkout to 5 tickets
    if (cartQuantity == 5) {
      addQtyBtn.disabled = true;
      warningElement.classList.add("show");
      return; //Exit if already at limit
    }

    //increase qty count
    cartQuantity += 1;
    quanityElement.innerHTML = cartQuantity;

    //increase total price
    cartTotal += 10;
    totalElement.innerHTML = cartTotal;

    if (cartQuantity > 0) {
      buyButton.disabled = false;
    }
  }

  //handle decrement qty
  if (event.target.id == "minus" && cartQuantity > 0) {
    //decrease qty count
    cartQuantity -= 1;
    quanityElement.innerHTML = cartQuantity;

    //decrease total price
    cartTotal -= 10;
    totalElement.innerHTML = cartTotal;

    //enable add qty button if < 5 tickets in cart
    if (cartQuantity < 5) {
      addQtyBtn.disabled = false;
      warningElement.classList.remove("show");
    }

    if (cartQuantity == 0) {
      buyButton.disabled = true;
    }
  }
}
//Event listeners for + / - qty
if (addQtyBtn && minusQtyBtn) {
  addQtyBtn.addEventListener("click", handleQty);
  minusQtyBtn.addEventListener("click", handleQty);
}

//Handle validation add confirmation
function handleCheckout(event) {
  //store cart total in state
  let cartTotal = parseInt(totalElement.innerHTML);

  //Check form with in-built validation
  checkoutForm.reportValidity();

  //Check form is valid before contuing
  if (checkoutForm.checkValidity()) {
    //Prevent default form submit
    event.preventDefault();

    //2.5 second loading buffer and redirect to order page
    setTimeout(() => {
      window.location.href = "/Pages/order.html?cartTotal=" + cartTotal;
    }, 2500);

    //Render the loading spinner
    const spinner = document.getElementById("spinner");
    const checkoutButtonText = document.getElementById("checkout-button-text");
    spinner.style.display = "block";
    checkoutButtonText.style.display = "none";
  }
}

//Event listener for buy button
if (buyButton) {
  buyButton.addEventListener("click", handleCheckout);
}

// **** Order Page ****
const orderTotalElement = document.getElementById("due-amount");

const urlParams = new URLSearchParams(window.location.search);
const orderTotal = urlParams.get("cartTotal");

if (orderTotalElement) {
  orderTotalElement.innerHTML = orderTotal;
}

// **** Contact Us Form ****
//Message Form
const messageForm = document.getElementById("message");
const messageButton = document.getElementById("message-submit");

//Message From Submit
function handleMessage(event) {
  event.preventDefault();

  // Check form with in-built validation
  messageForm.reportValidity();

  // Check form is valid before continuing
  if (messageForm.checkValidity()) {
    // Prevent default form submit
    event.preventDefault();

    // Change button text on submit
    messageButton.innerHTML = "Submitting Message...";

    // Reset Form
    setTimeout(function () {
      messageForm.reset();
      messageButton.innerHTML = "Contact Us"; // Reset button text
    }, 2500); // Set timeout to 2.5 sec
  }
}

if (messageForm) {
  messageForm.addEventListener("submit", handleMessage);
}

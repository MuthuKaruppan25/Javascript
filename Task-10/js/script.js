import { displayProducts } from "./ui.js";
import { displayCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");  

  if (!window.location.hash) {
    window.location.hash = "#home";
  }

  routePage();
  window.addEventListener("hashchange", routePage);


  const menuToggle = document.getElementById("menu-toggle");
  const searchContent = document.querySelector(".search-content");

  if (menuToggle && searchContent) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      searchContent.classList.add("active");
      document.getElementById("arrow").className = "fas fa-chevron-down";
    });

    document.addEventListener("click", function (event) {
      if (!searchContent.contains(event.target) && event.target !== menuToggle) {
        searchContent.classList.remove("active");
        document.getElementById("arrow").className = "fas fa-chevron-right";
      }
    });
  }

  const categoryItems = document.querySelectorAll(".dropdown-content a");
  categoryItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedCategory = item.textContent.trim();
      displayProducts(selectedCategory);
      window.location.hash = "#home";
    });
  });

  
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    let debounceTimeout;
    searchInput.addEventListener("input", (event) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const searchQuery = event.target.value.trim();
        displayProducts(null, searchQuery);
      }, 300); 
    });
  }
});

function routePage() {
  console.log("Routing to:", window.location.hash); 

  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.style.display = "none"));

  const hash = window.location.hash || "#home";

  if (hash === "#cart") {
    const cartPage = document.getElementById("cart-page");
    console.log("Cart page loaded");
    if (cartPage) {
      cartPage.style.display = "block";
      displayCart();
    } else {
      console.warn("Cart page element not found");
    }
  } else {
    const homePage = document.getElementById("home-page");
    console.log("Home page loaded");
    if (homePage) {
      homePage.style.display = "block";
      displayProducts();
    } else {
      console.warn("Home page element not found");
    }
  }
}


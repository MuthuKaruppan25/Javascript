import { fetchProducts } from "./products.js";
import { addToCart } from "./cart.js";

export async function displayProducts(category = null, searchQuery = "") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  let products = await fetchProducts();
  if (category) {
    products = products.filter((product) => product.category === category);
  }
  if (searchQuery) {
    products = products.filter((product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card");
    productDiv.innerHTML = `
        <img src=${product.image}/>
        <div class="card-content">
            <p>${product.category}</p>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
        </div>
        <div class="size-buttons">
            <button class="size">
                XL
            </button>
            <button class="size">
                L
            </button>
            <button class="size">
                M
            </button>
            <button class="size">
                S
            </button>
            <button class="size">
                XS
            </button>
        </div>
        <div class="">
            <button class="cart-button">Add to Cart</button>
        </div>
    `;
    productList.appendChild(productDiv);
    const cartButton = productDiv.querySelector(".cart-button");
    cartButton.addEventListener("click", function () {
      const selectedSize = productDiv.querySelector(".selected")?.textContent || "M"; // Default to M
      addToCart(product,selectedSize);
    });
    const sizeButtons = productDiv.querySelectorAll(".size");
    sizeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        sizeButtons.forEach((btn) => btn.classList.remove("selected")); 
        this.classList.add("selected"); 
      });
    });

  });

}

let cart = [];

try {
    const storedCart = localStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
    console.error("Error parsing cart data:", error);
    cart = [];
}


export function addToCart(product,size) {

  const existingItem = cart.find((item) => product.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1,size:size });
  }
  saveCart();
  displayCart();
}

// export function removeFromCart(productId) {
//   const index = cart.findIndex((item) => item.id === productId);
//   if (index !== -1) {
//     cart.splice(index, 1);
//   }
//   saveCart();
//   displayCart();
// }

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function displayCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.querySelector(".cart-table tbody");
  const cardTotal = document.querySelector(".totals");
  if (cart.length === 0) {
    tableBody.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  tableBody.innerHTML = "";
  let totalPrice = 0;
  cart.forEach((item, index) => {
    const row = document.createElement("tr"); 
    totalPrice += item.quantity * item.price;
    row.innerHTML = `
        <td class="product-info">
            <button class="remove-btn" data-index="${index}">&times;</button>
            <img src=${item.image} alt="${item.name}" class="product-img" />
            <div>
                <p class="product-name">${item.name}</p>
                <p class="product-size">Size: ${item.size}</p>
            </div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-index="${index}">+</button>
            </div>
        </td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;

    tableBody.appendChild(row);

  });
  const gst = totalPrice * 0.18;
  let overalltotalPrice = totalPrice +  gst;
  let discount = 0;
  if(overalltotalPrice > 50){
    discount = totalPrice*0.10;
  }
  overalltotalPrice -= discount;
  cardTotal.innerHTML = `
                        <div class="subtotal">
                            <p>Product Prize</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                         <div class="subline"></div>
                        <div class="subtotal">
                            <p>Discount (${(discount>0)?"applicable":"not applicable"})</p>
                            <p>${discount.toFixed(2)}</p>
                        </div>
                         <div class="subline"></div>
                        <div class="subtotal">
                            <p>GST</p>
                            <p>${gst.toFixed(2)}</p>
                        </div>
                        <div class="subline"></div>
                        <div class="total">
                            <p>Total</p>
                            <p>${overalltotalPrice.toFixed(2)}</p>
                        </div>
                        <div class="subline"></div>
  `;
  
  attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            saveCart();
            displayCart(); 
        });
    });

    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity++;
            saveCart();
            displayCart(); 
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); 
            }
            saveCart()
            displayCart();
        });
    });
}

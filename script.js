const dis = document.getElementById("display");
const cart = [];
const cartCount = document.getElementById("lblCartCount");
const cartItemCount = document.getElementById("cartItemCount");
const cartTotal = document.getElementById("cartTotal");

async function displayFetchedData() {
        const result = await fetch("https://fakestoreapi.com/products");
        const newResult = await result.json();
        for (let i = 0; i < newResult.length; i++) {
            const product = newResult[i];
            const productDiv = document.createElement("div");
            productDiv.className = "productStyle";
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h5>${product.title}</h5>
                <p class="price">$${product.price}</p>
                <p class="category">Category: ${product.category}</p>
                <p class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
                <a href="#" class="btn btn-primary btnDivStyle" onclick="addToCart(${product.id})">Add To Cart</a>`;
            dis.appendChild(productDiv);
        }
   
}

function addToCart(productId) {
    fetch("https://fakestoreapi.com/products/" + productId)
        .then(response => response.json())
        .then(product => {
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            updateCartDisplay();
        })
}

function updateCartDisplay() {
    cartCount.innerText = cart.length;
    cartItemCount.innerText = cart.length;
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("tr");
        cartItem.innerHTML = `
            <td data-th="Product">
                <div class="row">
                    <div class="col-md-3 text-left">
                        <img src="${item.image}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                    </div>
                    <div class="col-md-9 text-left mt-sm-2">
                        <h4>${item.title}</h4>
                        <p class="font-weight-light">Category: ${item.category}</p>
                    </div>
                </div>
            </td>
            <td data-th="Price">$${item.price.toFixed(2)}</td>
            <td data-th="Quantity">
                <input type="number" class="form-control form-control-lg text-center" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td class="actions" data-th="">
                <div class="text-right">
                    <button class="btn btn-white border-secondary bg-white btn-md mb-2" onclick="removeFromCart(${item.id})">
                        <i class="fa fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        cartList.appendChild(cartItem);
    });
    cartTotal.innerText = `${total.toFixed(2)}`;
}
function updateQuantity(productId, quantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantity);
        updateCartDisplay();
    }
}
function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        updateCartDisplay();
    }
}
document.getElementById("cartIcon").addEventListener("click", () => {
   const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
});
displayFetchedData();

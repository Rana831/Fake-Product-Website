const dis = document.getElementById("display");
async function displayFetchedData() {
    const result = await fetch("https://fakestoreapi.com/products");
    const newResult = await result.json();
    for (let i = 0; i < newResult.length; i++) {
        if(i<3){
            const product = newResult[i];
        const productDiv = document.createElement("div");
        productDiv.className = "productStyle";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title} ">
            <h5>${product.title}</h5>
            <p class="price">$${product.price}</p>
            <p class="category">Category: ${product.category}</p>
            <p class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            
`;
        dis.appendChild(productDiv);
        }
    }
}
displayFetchedData();
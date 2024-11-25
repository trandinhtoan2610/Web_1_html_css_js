var json = JSON.stringify(products);
localStorage.setItem("products", json);
function showProductDetails(productID) {
    const product_Info = document.getElementById('product-info');
    const product_Name = document.getElementById("productName");
    const product_Price = document.getElementById("productPrice");
    const product_Ram = document.getElementById("productRam");
    const product_SSD = document.getElementById("productSSD");
    const product_Card = document.getElementById("productCard");
    const product_Location = document.getElementById("productLocation");
    const product_img = document.getElementById("productImg");
    const product_Description = document.getElementById("productDescription");
    product_Info.style.display = 'flex';
    var productArray = JSON.parse(localStorage.getItem("products"));
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].id == productID) {
            product_Name.innerHTML = productArray[i].name;
            product_Price.innerHTML = "Giá: " + productArray[i].price;
            product_Ram.innerHTML = "Ram: " + productArray[i].ram;
            product_SSD.innerHTML = "SSD: " + productArray[i].ssd;
            product_Card.innerHTML = "Card: " + productArray[i].card;
            product_Location.innerHTML = "Vị Trí: " + productArray[i].location;
            product_img.src = productArray[i].image;
            product_Description.innerHTML = "Mô Tả: " + productArray[i].description;
        }
    }
}
function closeProductInfo() {
    document.getElementById('product-info').style.display = 'none';
}
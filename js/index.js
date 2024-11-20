function showProductDetails(productID) {
    console.log(document.getElementById('product-info')); // Check if it exists
    var btn_AddToCart = document.getElementById('color-Cart')

    document.getElementById('product-info').style.display = "flex";
    var productArray = JSON.parse(localStorage.getItem("products"));
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].id == productID) {
            document.getElementById("productName").innerHTML = productArray[i].name;
            document.getElementById("productPrice").innerHTML = "Giá: " + productArray[i].price;
            document.getElementById("productLocation").innerHTML = "Vị Trí: " + productArray[i].location;
            document.getElementById("productImg").src = productArray[i].image;
            document.getElementById("productDescription").innerHTML = "Mô Tả: " + productArray[i].description;
            document.getElementById("productRam").innerHTML = "Ram: " + productArray[i].ram;
            document.getElementById("productSSD").innerHTML = "SSD: " + productArray[i].ssd;
            document.getElementById("productCard").innerHTML = "Card" + productArray[i].card;
            break;
        }
    }
    btn_AddToCart.onclick = () => remind();
}
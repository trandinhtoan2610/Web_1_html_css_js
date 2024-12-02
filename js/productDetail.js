function remind(){
    alert("Bạn phải đăng nhập mới thêm vào được giỏ hàng!!");
}
function showProductDetails(productID, event) {
    if(event)event.preventDefault();
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
            if (typeof productArray[i].price === 'number') {
                product_Price.innerHTML = "Giá: " + productArray[i].price.toLocaleString('vi-VN') + "<sup><u>đ</u></sup>";
            } else if (!isNaN(Number(productArray[i].price))) {
                product_Price.innerHTML = "Giá: " + Number(productArray[i].price).toLocaleString('vi-VN') + "<sup><u>đ</u></sup>";
            } else {
                product_Price.innerHTML = "Giá: Không hợp lệ";
            }
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
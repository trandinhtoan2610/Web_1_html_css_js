var product = JSON.stringify(products);
localStorage.setItem("products", product);
// Hàm hiển thị chi tiết sản phẩm trong modal
function showProductDetails(productId) {
    const product = getProductById(productId);

    if (!product) {
        console.error("Sản phẩm không tồn tại");
        return;
    }

    // Cập nhật thông tin chi tiết trong modal
    document.getElementById("productImg").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").innerHTML = `Giá: ${product.price.toLocaleString('vi-VN')} <sup><u>đ<u></sup>`;
    document.getElementById("productRam").textContent = `RAM: ${product.ram}`;
    document.getElementById("productSSD").textContent = `SSD: ${product.ssd}`;
    document.getElementById("productCard").textContent = `Card: ${product.card}`;
    document.getElementById("productLocation").textContent = `Địa điểm: ${product.location}`;
    document.getElementById("productDescription").textContent = product.description;

    // Cập nhật sự kiện Thêm vào giỏ hàng trong modal
    document.getElementById("color-Cart").setAttribute("onclick", `ThemVaoGioHang(${productId})`);

    // Hiển thị modal
    document.getElementById("product-info").style.display = "block";
}
function closeProductInfo() {
    document.getElementById('product-info').style.display = 'none';
}
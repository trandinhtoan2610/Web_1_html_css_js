const itemsPerPage = 8;
let currentPage = 1;

function renderProduct(page) {
    let html = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    for (let i = 0; i < paginatedProducts.length; i++) {
        const product = paginatedProducts[i];

        // Kiểm tra dữ liệu của sản phẩm
        if (!product.id || !product.name || !product.image || !product.price) {
            console.error(`Dữ liệu không hợp lệ cho sản phẩm tại index ${i}`, product);
        }
        product.price = Number(product.price);

        html += `
        <div class="product-card">
                <div class="product-image">
                    <a href="#" onclick="showProductDetails(${product.id})">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">
                        <strong>${product.price.toLocaleString('vi-VN')}<sup><u>đ</u></sup></strong>
                    </p>
                    <div class="product-actions">
                        <button class="btn-cart" onclick="ThemVaoGioHang(${product.id})">Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("product-list").innerHTML = html;
}

function renderPagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    let paginationHtml = '';

    // Thêm nút "Trước"
    paginationHtml += `
        <button class="page-button" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-button ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    // Thêm nút "Sau"
    paginationHtml += `
        <button class="page-button" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt;</button>`;

    // Cập nhật phần tử phân trang
    document.getElementById("pagination").innerHTML = paginationHtml;
}

// Hàm thay đổi trang
function changePage(page) {
    if (page < 1 || page > Math.ceil(products.length / itemsPerPage)) return; // Không thay đổi nếu page không hợp lệ
    currentPage = page;
    renderProduct(currentPage);  // Cập nhật sản phẩm cho trang mới
    renderPagination();  // Cập nhật lại phân trang
}

// Hàm khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    renderProduct(currentPage);  // Hiển thị sản phẩm cho trang đầu tiên
    renderPagination();  // Hiển thị phân trang
});
const addToCartButton = document.getElementById('color-Cart');
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
            if (typeof productArray[i].price === 'number') {
                product_Price.innerHTML = "Giá: " + price.toLocaleString('vi-VN') + "<sup><u>đ</u></sup>";
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
            const addToCartButton = document.getElementById('color-Cart');
            addToCartButton.setAttribute('onclick', `ThemVaoGioHang(${productArray[i].id})`);
        }
    }
}
function closeProductInfo() {
    document.getElementById('product-info').style.display = 'none';
}
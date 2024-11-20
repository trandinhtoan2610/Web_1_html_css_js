var products_json = localStorage.getItem('products')
var products = JSON.parse(products_json)

function displayUsername() {
    var username = localStorage.getItem("currentUser");
    if (username) {
        document.getElementById("printUsername").textContent = username;
    }
    else {
        document.getElementById("printUsername").textContent = "Khách";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    displayUsername();
});



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

        }
    }

    btn_AddToCart.onclick = () => ThemVaoGioHang(productID)
}
function closeProductInfo() {
    document.getElementById('product-info').style.display = 'none';
}
function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');

    // Lấy danh sách sản phẩm từ localStorage
    const productArray = JSON.parse(localStorage.getItem("products"));

    // Kiểm tra nếu productArray tồn tại và không rỗng, và nếu brand tồn tại
    if (!productArray || productArray.length === 0 || !brand) return;

    // Lọc sản phẩm theo thương hiệu
    const filteredProducts = [];
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].kind === brand) {
            filteredProducts.push(productArray[i]);
        }
    }

    // Kiểm tra nếu có sản phẩm đã lọc
    if (filteredProducts.length === 0) {
        console.warn("Không có sản phẩm nào phù hợp với thương hiệu:", brand);
        return;
    }

    // Lấy phần tử product-list và xóa các sản phẩm cũ
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Xóa các sản phẩm cũ

    // Hiển thị các sản phẩm đã lọc
    displayProducts(filteredProducts, productList);
}

function displayProducts(products, productList) {
    // Kiểm tra nếu danh sách sản phẩm trống
    if (products.length === 0) {
        console.log("Không có sản phẩm nào để hiển thị");
        return;
    }

    // Sử dụng vòng lặp for thay vì forEach
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Tạo phần tử chính cho sản phẩm
        const productItem = document.createElement("div");
        productItem.className = "product-one-content-item1";

        // Tạo phần tử hình ảnh
        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;

        // Tạo danh sách chi tiết sản phẩm
        const productDetails = document.createElement("ul");
        productDetails.className = "product-one-content-text";

        // Tạo từng phần tử thông tin sản phẩm
        const sale = document.createElement("li");
        sale.className = "sale";
        sale.textContent = "HSSV GIẢM 500K";

        const name = document.createElement("li");
        name.className = "product-name";
        name.textContent = product.name;

        // Thêm giá sản phẩm
        const price = document.createElement("li");
        price.style.color = "#E83A45";
        price.style.fontSize = "19px";
        price.innerHTML = `<strong>${product.price}<sup><u>đ</u></sup></strong>`;

        // Tạo các nút chức năng
        const buttonContainer = document.createElement("li");
        buttonContainer.className = "product-one-configuration";
        buttonContainer.id = "button-settings";

        const detailButton = document.createElement("button");
        detailButton.textContent = "Xem Chi Tiết";
        detailButton.onclick = () => showProductDetails(product.id);

        const addToCartButton = document.createElement("button");
        addToCartButton.id = "addtoCart";
        addToCartButton.textContent = "Thêm Vào Giỏ Hàng";
        addToCartButton.onclick = () => ThemVaoGioHang(product);

        buttonContainer.appendChild(detailButton);
        buttonContainer.appendChild(addToCartButton);

        // Thêm các phần tử vào productDetails
        productDetails.appendChild(sale);
        productDetails.appendChild(name);
        productDetails.appendChild(price);
        productDetails.appendChild(buttonContainer);

        // Thêm hình ảnh và chi tiết vào productItem
        productItem.appendChild(productImage);
        productItem.appendChild(productDetails);

        // Thêm productItem vào danh sách sản phẩm
        productList.appendChild(productItem);
    }
}
// Mua theo số lượng
var plus = document.getElementsByClassName('plus'),
    minus = document.getElementsByClassName('minus'),
    num = document.getElementsByClassName('num');

for (var i = 0; i < plus.length; i++) {
    var buttonPlus = plus[i];
    var buttonMinus = minus[i];
    buttonPlus.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var input = buttonClicked.parentElement.children[1];
        input.value = parseInt(input.value) + 1;
    })

    buttonMinus.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var input = buttonClicked.parentElement.children[1];
        if (input.value > 0)
            input.value = parseInt(input.value) - 1;
    })
}
// function renderProduct() {
//     html = '';
//     for (let i = 0; i < products.length; i++) {
//         html += '<div class="product-one-content-item1">';
//         html += '<a onclick="showProductDetails(1)">';
//         html += '<img src=' + products[i].image + '>';
//         html += '</a>';
//         html += '<ul class="product-one-content-text">';
//         html += '<li class="sale">HSSV GIẢM 500K';
//         html += '</li>'
//         html += '<li class="product-name" >' + products[i].name;
//         html += '</li>'
//         html += '<li style="color: #E83A45; font-size: 19px">'
//         html += '<strong>13.990.000';
//         html += '<sup>';
//         html += '<u>' + "đ";
//         html += '</u>';
//         html += '</sup>';
//         html += '</strong>';
//         html += '</li>';
//         html += '<li class="product-one-configuration" id="button-settings">';
//         html += '<button onclick="showProductDetails(' + products[i].id + ')">' + 'Xem Chi Tiết';
//         html += '</button>';
//         html += '<button id="addtoCart" onclick="remind()">' + 'Thêm Vào Giỏ Hàng';
//         html += '</button>';
//         html += '</li>';
//         html += '</ul>';
//         html += '</div>';
//     };
//     const productList = document.getElementById('product-list');
//     if (productList) {
//         productList.innerHTML = html;
//     } else {
//         console.error("Phần tử 'product-list' không tồn tại trong DOM.");
//     }
// }
// renderProduct();
const itemsPerPage = 10; // Số sản phẩm mỗi trang
let currentPage = 1; // Trang hiện tại

// Hàm hiển thị danh sách sản phẩm cho trang hiện tại
function renderProduct(page) {
    let html = '';
    const start = (page - 1) * itemsPerPage;  // Tính chỉ mục bắt đầu
    const end = start + itemsPerPage;  // Tính chỉ mục kết thúc
    const paginatedProducts = products.slice(start, end);  // Cắt danh sách sản phẩm cho trang hiện tại

    for (let i = 0; i < paginatedProducts.length; i++) {
        const product = paginatedProducts[i];

        // Kiểm tra dữ liệu của sản phẩm
        if (!product.id || !product.name || !product.image || !product.price) {
            console.error(`Dữ liệu không hợp lệ cho sản phẩm tại index ${i}`, product);
            continue; // Bỏ qua sản phẩm nếu thiếu thông tin
        }

        // Xây dựng HTML cho mỗi sản phẩm
        html += `
        <div class="product-one-content-item1">
            <a onclick="showProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <ul class="product-one-content-text">
                <li class="sale">HSSV GIẢM 500K</li>
                <li class="product-name">${product.name}</li>
                <li style="color: #E83A45; font-size: 19px">
                    <strong>${product.price.toLocaleString('vi-VN')}<sup><u>đ</u></sup></strong>
                </li>
                <li class="product-one-configuration" id="button-settings">
                    <button onclick="showProductDetails(${product.id})">Xem Chi Tiết</button>
                    <button id="addtoCart" onclick="ThemVaoGioHang(${product.id})">Thêm Vào Giỏ Hàng</button>
                </li>
            </ul>
        </div>`;
    }

    // Cập nhật phần tử HTML để hiển thị sản phẩm
    document.getElementById("product-list").innerHTML = html;
}

// Hàm tạo phân trang
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

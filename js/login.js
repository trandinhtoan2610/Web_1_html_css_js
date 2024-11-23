document.getElementById('loginButton').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('authModal').style.display = 'flex';
});

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Đóng form khi nhấn ra ngoài
window.onclick = function (event) {
    if (event.target == document.getElementById('authModal')) {
        document.getElementById('authModal').style.display = 'none';
    }
};
function signup(e) {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const fullname = document.getElementById("newFullName").value;
    const phonenumber = document.getElementById("newPhoneNumber").value;
    const repeatPassword = document.getElementById("newRepeatPassword").value;
    if (phonenumber)
        if (password !== repeatPassword) {
            alert("Mật khẩu và Nhập lại mật khẩu không khớp!");
            return;
        }
    var user = {
        username: username,
        password: password,
        fullname: fullname,
        phonenumber: phonenumber,
    };
    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    alert("Đăng Ký Thành Công");
}
function login(e) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    if (user == null) {
        alert("Đăng Nhập Thất Bại!!")
    }
    else if (username == data.username && password == data.password) {
        alert("Đăng Nhập Thành Công!!");
        localStorage.setItem("currentUser", data.fullname);
        window.location.href = "../html/indexLogin.html";
    }
}

var products_json = localStorage.setItem('products');
var products = JSON.parse(products_json);

   
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
    console.log(document.getElementById("product-info"));
console.log(document.getElementById("productName"));
console.log(document.getElementById("productPrice"));
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
//         console.log(html);
//     };
//     const productList = document.getElementById('product-list');
//     if (productList) {
//         productList.innerHTML = html;
//     } else {
//         console.error("Phần tử 'product-list' không tồn tại trong DOM.");
//     }
// }
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
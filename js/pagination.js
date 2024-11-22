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
        }
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
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
            <div class="product-one-content-item1">
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
                            <button type="button" class="btn-cart" onclick="remind()">Thêm Vào Giỏ Hàng</button>
                        </div>
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
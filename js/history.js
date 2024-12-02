function displayOrderHistory() {
    const container = document.getElementById('container');
    // Xóa danh sách cũ
    container.innerHTML = `<div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">Mã đơn hàng</a></div>
                <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Tổng tiền</a></div>
                <div class="header__item"><a id="status" class="filter__link filter__link--number" href="#">Trạng thái</a></div>
                <div class="header__item"><a id="createAt" class="filter__link filter__link--number" href="#">Ngày tạo</a></div>
                <div class="header__item"><a id="handle" class="filter__link filter__link--number" href="#">Chi tiết hóa đơn</a></div>
                <div class="header__item"><a id="handle" class="filter__link filter__link--number" href="#"></a></div>
		    </div>
            <div class="table-content" id="table-content"></div>
        </div>`;

    // Lặp qua các đơn hàng
    loadHistory();
}

const cancelOrder = (orderId) => {
    const ordersHistory = JSON.parse(localStorage.getItem('orders')) || [];
    ordersHistory.find(order => order.orderId === orderId).status = 'Đã hủy';
    localStorage.setItem('orders', JSON.stringify(ordersHistory));
    alert(`Đơn hàng #${orderId} đã được hủy thành công!`);
    loadHistory();
};

// Hàm tải danh sách đơn hàng từ Local Storage
const loadHistory = () => {
    const user = JSON.parse(localStorage.getItem('userlogin'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersHistory = orders.filter(order => order.userId === user.id);
    const table = document.getElementById('table-content');
    table.innerHTML = ''; // Xóa dữ liệu cũ
    ordersHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    ordersHistory.map(order => {
        const cancelButton = order.status === 'Chưa xử lý' 
            ? `<a onclick="cancelOrder(${order.orderId})" class="btn btn-view" style="cursor: pointer;">Hủy đơn</a>` 
            : '';
        
        const row = `
            <div class="table-row">		
				<div class="table-data">${order.orderId}</div>
				<div class="table-data">${order.totalAmount.toLocaleString('vi-VN')}</div>
				<div class="table-data">${order.status}</div>
				<div class="table-data">${new Date(order.createdAt).toLocaleDateString()}</div>
                <div class="table-data">
                    <a onclick="viewOrderDetails(${order.orderId})" class="btn btn-view" style="cursor: pointer;">Xem chi tiết</a>
                </div>
                <div class="table-data">
                    ${cancelButton}
                </div>
			</div>
        `;
        table.innerHTML += row;
    });
};


// Hàm xem chi tiết đơn hàng
function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        alert('Không tìm thấy đơn hàng.');
        return;
    }

    // Tạo bảng chi tiết hóa đơn
    let tableContent = `
        
        <p style="margin-top: 10px"><strong>Khách hàng:</strong> ${order.fullname}</p>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Sản phẩm</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Số lượng</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
    `;

    order.orderDetails.forEach(item => {
        tableContent += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.productName}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.totalPrice.toLocaleString('vi-VN')} đ</td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        
        <p style="margin-top: 20px"><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString('vi-VN')} đ</p>
    `;

    // Hiển thị bảng trong modal
    const modalContent = document.getElementById('orderDetailsContent');
    modalContent.innerHTML = tableContent;

    // Hiển thị modal
    const modal = document.getElementById('orderDetailsModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('orderDetailsModal');
    modal.style.display = 'none';
}

function displayOrderHistory() {
    const user = JSON.parse(localStorage.getItem('userlogin'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const container = document.getElementById('container');
   
    const ordersHistory = orders.filter(order => order.userId === user.id);

    // Xóa danh sách cũ
    container.innerHTML = `<div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">Mã đơn hàng</a></div>
 
                <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Tổng tiền</a></div>
                <div class="header__item"><a id="status" class="filter__link filter__link--number" href="#">Trạng thái</a></div>
                <div class="header__item"><a id="createAt" class="filter__link filter__link--number" href="#">Ngày tạo</a></div>
            
                <div class="header__item"><a id="handle" class="filter__link filter__link--number" href="#">Chi tiết hóa đơn</a></div>
		    </div>
            <div class="table-content" id="table-content"></div>
        </div>`;

    // Lặp qua các đơn hàng
    loadHistory(ordersHistory);
}

// Hàm tải danh sách đơn hàng từ Local Storage
const loadHistory = (ordersHistory) => {
    const table = document.getElementById('table-content');
    table.innerHTML = ''; // Xóa dữ liệu cũ
    ordersHistory.map(order => {
        const row = `
            <div class="table-row">		
				<div class="table-data">${order.orderId}</div>
				<div class="table-data">${order.totalAmount.toLocaleString('vi-VN')}</div>
				<div class="table-data">${order.status}</div>
				<div class="table-data">${new Date(order.createdAt).toLocaleDateString()}</div>
                <div class="table-data">
                    <a onclick="viewOrderDetails(${order.orderId})" class="btn btn-view">Xem chi tiết</a>
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
    console.log(order);
    if (!order) {
        alert('Không tìm thấy đơn hàng.');
        return;
    }

    // Tạo nội dung chi tiết đơn hàng
    let details = `<p><strong>Mã đơn hàng:</strong> #${order.orderId}</p>`;
    details += '<ul>';
    order.orderDetails.forEach(item => {
        details += `<li>${item.productName}: ${item.quantity} x ${item.totalPrice.toLocaleString('vi-VN')} đ</li>`;
    });
    details += '</ul>';
    details += `<p><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString('vi-VN')} đ</p>`;

    // Hiển thị nội dung trong modal
    const modalContent = document.getElementById('orderDetailsContent');
    modalContent.innerHTML = details;

    // Hiển thị modal
    const modal = document.getElementById('orderDetailsModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('orderDetailsModal');
    modal.style.display = 'none';
}
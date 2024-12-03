const showOrderManagement = () => {
    const container = document.getElementById("container");
    container.innerHTML = `
          <input type="date" id="startDate" />
          <input type="date" id="endDate" />
          <button onclick="filterOrdersByDate()">Lọc</button>
  
          <div class="menu">
      <button class="menu-button"> Lọc theo hàng động</button>
      <div class="menu-content">
          <a href="#" onclick ="loading('Chưa xử lý')">Chưa xử lý</a>
          <a href="#" onclick ="loading('Đã xác nhận')">Đã xác nhận</a>
          <a href="#" onclick ="loading('Đã giao thành công')">Đã giao thành công</a>
          <a href="#" onclick ="loading('Đã hủy')">Đã hủy</a>
          </div>
      </div>
  
          <div class="table">
              <div class="table-header">
                  <div class="header__item"><a id="id" class="filter__link" href="#">Mã đơn hàng</a></div>
                  <div class="header__item"><a id="name" class="filter__link" href="#">Tên khách hàng</a></div>
                  <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Tổng tiền</a></div>
                  <div class="header__item"><a id="status" class="filter__link filter__link--number" href="#">Trạng thái</a></div>
                  <div class="header__item"><a id="createAt" class="filter__link filter__link--number" href="#">Ngày tạo</a></div>
                  <div class="header__item"><a id="handle" class="filter__link filter__link--number" href="#">Hành động</a></div>
                  <div class="header__item"><a id="handle" class="filter__link filter__link--number" href="#">Chi tiết hóa đơn</a></div>
              </div>
              <div class="table-content" id="table-content"></div>
          </div>
      `;
    loadOrders(); // Tải danh sách đơn hàng từ Local Storage
  };
  function loading(status) {
    const or = JSON.parse(localStorage.getItem("orders")) || [];
    const ors = or.filter((order) => order.status === status);
    loadOrders(ors);
  }

//hàm format ngày tháng năm
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('vi-VN', options);
}

//hàm update trạng thái đơn hàng
function updateOrderStatus(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = orders.map(order => {
        if (order.orderId === orderId) {
            if (order.status === 'Chưa xử lý') {
                order.status = 'Đã xác nhận';
                localStorage.setItem('orders', JSON.stringify(updatedOrders));
                alert('Cập nhật trạng thái thành công!');
            } else if (order.status === 'Đã xác nhận') {
                order.status = 'Đã giao thành công';
                localStorage.setItem('orders', JSON.stringify(updatedOrders));
                alert('Cập nhật trạng thái thành công!');
            }
        }
        return order;
    });

    
    loadOrders();
}

//hàm hủy đơn hàng
function cancelOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    if (orderIndex === -1) {
        alert("Không tìm thấy đơn hàng với ID: " + orderId);
        return;
    }
    if(orders[orderIndex].status === "Chưa xử lý" || orders[orderIndex].status === "Đã xác nhận"){
        orders[orderIndex].status = "Đã hủy";
        localStorage.setItem('orders', JSON.stringify(orders));
        alert("Đơn hàng đã được hủy!");
    }
    
    
    
    loadOrders();
}

// Hàm tải danh sách đơn hàng từ Local Storage
const loadOrders = (filteredOrders) => {
   
    if (filteredOrders) {
        invoices = filteredOrders;
    }else{
        invoices = JSON.parse(localStorage.getItem('orders')) || [];
    }
    const table = document.getElementById('table-content');
    table.innerHTML = ''; // Xóa dữ liệu cũ
    invoices.forEach((invoice) => {
        const row = `
            <div class="table-row">	
				<div class="table-data">${invoice.orderId}</div>
                <div class="table-data">${invoice.userId}</div>
				<div class="table-data">${invoice.fullname}</div>
				<div class="table-data">${invoice.totalAmount}</div>
				<div class="table-data">${invoice.status}</div>
				<div class="table-data">${formatDate(invoice.createdAt)}</div>
                <div class="table-data">
                    <button class="btn btn-handle" onclick="updateOrderStatus(${invoice.orderId})">${invoice.status === 'Chưa xử lý' ? 'Xác nhận' : invoice.status === 'Đã xác nhận' ? 'Đã giao thành công' : ''}</button> 
                    <button class="btn btn-handle" onclick="cancelOrder(${invoice.orderId})">${invoice.status === 'Chưa xử lý' ? 'Hủy đơn hàng' : invoice.status === 'Chưa xử lý' ?   "Đã xác nhận" : ""    }</button>
                </div>
                <div class="table-data">
                    <a href="order-details.html?orderId=${invoice.orderId}" class="btn btn-view">Xem chi tiết</a>
                </div>
			</div>
        `;
        table.innerHTML += row;
    });
};


// lọc theo ngày 
function filterOrdersByDate() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('chọn ngày bắt đầu và ngày kết thúc');
        return;
    }
    if (startDate > endDate) {
        alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
        return;
    }
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const filteredOrders = orders.filter(order => {
        const createdAt = new Date(order.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
    });
    loadOrders(filteredOrders);
}



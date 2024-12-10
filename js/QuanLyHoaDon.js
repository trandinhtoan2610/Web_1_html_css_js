const showOrderManagement = () => {
    const container = document.getElementById("container");
    container.innerHTML = `
        <div class="p-6">
            <div class="mb-6">
                <input type="date" id="startDate" class="p-2 border border-gray-300 rounded-md" />
                <input type="date" id="endDate" class="p-2 border border-gray-300 rounded-md ml-2" />
                <button onclick="filterOrdersByDate()" class="p-2 bg-blue-500 text-white rounded-md ml-4">Lọc</button>

                <div class="menu">
                  <button class="menu-button p-2 bg-blue-500 text-white rounded-md ml-4"> Lọc theo hàng động</button>
                  <div class="menu-content">
                    <a href="#" onclick ="loading('Chưa xử lý')">Chưa xử lý</a>
                    <a href="#" onclick ="loading('Đã xác nhận')">Đã xác nhận</a>
                    <a href="#" onclick ="loading('Đã giao thành công')">Đã giao thành công</a>
                    <a href="#" onclick ="loading('Đã hủy')">Đã hủy</a>
                  </div>
                
            </div>

            
            </div>

            <div class="overflow-x-auto bg-white shadow-md rounded-lg">
                <table class="min-w-full table-auto">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-6 text-left">Mã đơn hàng</th>
                            <th class="py-3 px-6 text-left">ID khách hàng</th>
                            <th onclick="sortAddress()" class="py-3 px-6 text-left">Địa chỉ</th>
                            <th class="py-3 px-6 text-left">Tổng tiền</th>
                            <th class="py-3 px-6 text-left">Trạng thái</th>
                            <th class="py-3 px-6 text-left">Ngày tạo</th>
                            <th class="py-3 px-6 text-left">Hành động</th>
                            <th class="py-3 px-6 text-left">Chi tiết hóa đơn</th>
                        </tr>
                    </thead>
                    <tbody id="table-content">
                        <!-- Dữ liệu bảng sẽ được thêm ở đây -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    loadOrders(); // Tải danh sách đơn hàng từ Local Storage
};

function loadOrders(filteredOrders) {
    if (filteredOrders) {
        invoices = filteredOrders;
    } else {
        invoices = JSON.parse(localStorage.getItem('orders')) || [];
    }

    const table = document.getElementById('table-content');
    table.innerHTML = ''; // Xóa dữ liệu cũ

    invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    invoices.forEach((invoice) => {
        const handle = invoice.status === 'Đã hủy' || invoice.status === 'Đã giao thành công' ? '' : `
        <div class="flex">
            <button class="btn btn-handle p-2 bg-green-500 text-white rounded-md mr-2" onclick="updateOrderStatus(${invoice.orderId})">
                ${invoice.status === 'Chưa xử lý' ? 'Xác nhận' : invoice.status === 'Đã xác nhận' ? 'Đã giao thành công' : ''}
            </button> 
            <button class="btn btn-handle p-2 bg-red-500 text-white rounded-md" onclick="cancelOrder(${invoice.orderId})">
                ${invoice.status === 'Chưa xử lý' ? 'Hủy đơn hàng' : invoice.status === 'Đã xác nhận' ? 'Hủy đơn hàng' : ''}
            </button>
            <div class="menu mb-6">
        `;

        const row = `
            <tr class="bg-gray-50 border-b hover:bg-gray-100">
                <td class="py-3 px-6">${invoice.orderId}</td>
                <td class="py-3 px-6">${invoice.userId}</td>
                <td class="py-3 px-6">${invoice.address + ' phường ' +invoice.phuong + ' quận ' + invoice.quan}</td>
                <td class="py-3 px-6">${invoice.totalAmount}</td>
                <td class="py-3 px-6">${invoice.status}</td>
                <td class="py-3 px-6">${formatDate(invoice.createdAt)}</td>
                <td class="py-3 px-6">${handle}</td>
                <td class="py-3 px-6">
                    <a href="order-details.html?orderId=${invoice.orderId}" class="btn btn-view p-2 bg-blue-500 text-white rounded-md">Xem chi tiết</a>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}


  function loading(status) {
    const or = JSON.parse(localStorage.getItem("orders")) || [];
    const ors = or.filter((order) => order.status === status);
    loadOrders(ors);
  }

//hàm format ngày tháng năm
function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("vi-VN", options);
}

//hàm update trạng thái đơn hàng
function updateOrderStatus(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const updatedOrders = orders.map((order) => {
    if (order.orderId === orderId) {
      if (order.status === "Chưa xử lý") {
        order.status = "Đã xác nhận";
        alert("Cập nhật trạng thái thành công!");
      } else if (order.status === "Đã xác nhận") {
        order.status = "Đã giao thành công";
        alert("Cập nhật trạng thái thành công!");
      }
    }
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(updatedOrders));
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



// lọc theo ngày
function filterOrdersByDate() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    alert("chọn ngày bắt đầu và ngày kết thúc");
    return;
  }
  if (startDate > endDate) {
    alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
    return;
  }
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const filteredOrders = orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    return createdAt >= startDate && createdAt <= endDate;
  });
  loadOrders(filteredOrders);
}

function sortAddress() {
    console.log("sort");

    // Lấy danh sách đơn hàng từ localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Hàm so sánh để sắp xếp quận
    orders.sort((a, b) => {
        // Kiểm tra xem quận có phải là số hay không
        const isANumber = !isNaN(a.quan);
        const isBNumber = !isNaN(b.quan);
        
        // Nếu cả hai đều là số, sắp xếp theo giá trị số
        if (isANumber && isBNumber) {
            return parseInt(a.quan) - parseInt(b.quan);
        }

        // Nếu một cái là số và một cái là chữ, thì số sẽ đứng trước chữ
        if (isANumber) {
            return -1;
        }
        if (isBNumber) {
            return 1;
        }

        // Nếu cả hai đều là chữ, sắp xếp theo thứ tự alphabet
        return a.quan.localeCompare(b.quan);
    });

    // Tải lại đơn hàng đã được sắp xếp
    loadOrders(orders);

    console.log("sorted orders", orders);
}





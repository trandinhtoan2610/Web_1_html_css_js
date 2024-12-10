function formatCurrencyVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function displayStats(filteredOrders) {
  if (filteredOrders) {
    orders = filteredOrders;
  } else {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
  }

  const productStats = {};
  console.log(orders);
  // Duyệt qua các đơn hàng và tính toán
  orders.forEach((order) => {
    if (order.status === "Đã giao thành công") {
      order.orderDetails.forEach((item) => {
        if (!productStats[item.productName]) {
          productStats[item.productName] = {
            totalQuantity: 0,
            totalRevenue: 0,
          };
        }
        productStats[item.productName].totalQuantity += item.quantity;
        productStats[item.productName].totalRevenue += item.totalPrice;
      });
    }
  });

  // Tính tổng doanh thu tất cả các mặt hàng
  let totalRevenueAllProducts = 0;
  for (const productName in productStats) {
    totalRevenueAllProducts += productStats[productName].totalRevenue;
  }

  // Tìm mặt hàng bán chạy nhất và ế nhất
  const bestSellingProduct = Object.keys(productStats).reduce(
    (best, productName) => {
      return productStats[productName].totalQuantity >
        productStats[best].totalQuantity
        ? productName
        : best;
    },
    Object.keys(productStats)[0]
  );

  const leastSellingProduct = Object.keys(productStats).reduce(
    (least, productName) => {
      return productStats[productName].totalQuantity <
        productStats[least].totalQuantity
        ? productName
        : least;
    },
    Object.keys(productStats)[0]
  );
  const container = document.getElementById("container");

  // Thêm bảng thống kê sản phẩm
  let tableHTML = `
    <label for="startDate">Chọn ngày bắt đầu:</label>
    <input type="date" id="startDateThongKe">
    <label for="endDate">Chọn ngày kết thúc:</label>
    <input type="date" id="endDateThongKe">
    <button onclick="filterOrdersByDateThongKe()">Lọc theo thời gian</button>
    <h3>Thống kê sản phẩm</h3>
    <div class="col-9">
      <div class="row">
        <div class="col-sm-3">
          <div class="well">
            <h4>Tổng tiền bán được</h4>
            <p>${formatCurrencyVND(totalRevenueAllProducts)}</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Sản phẩm bán chạy nhất</h4>
            <p>${bestSellingProduct || ''}</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Sản phẩm bán ít nhất</h4>
            <p>${leastSellingProduct || ""}</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Tổng số đơn hàng bán được</h4>
            <p>${orders.length}</p> 
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-gray-100">
        <thead class="bg-yellow-200 text-black">
          <tr>
            <th scope="col" class="px-4 py-2 text-left">Tên sản phẩm</th>
            <th scope="col" class="px-4 py-2 text-left">Tổng số lượng bán</th>
            <th scope="col" class="px-4 py-2 text-left">Tổng số tiền bán</th>
          </tr>
        </thead>
        <tbody id="table-content">
          ${Object.keys(productStats).map(productName => `
            <tr class="border-b">
              <td class="px-4 py-2 font-semibold">${productName}</td>
              <td class="px-4 py-2">${productStats[productName].totalQuantity}</td>
              <td class="px-4 py-2 text-green-600">${formatCurrencyVND(productStats[productName].totalRevenue)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

  `;
  
  container.innerHTML = tableHTML;
  displayTopCustomers(orders);
}

// Hàm để hiển thị các khách hàng có doanh thu cao nhất và hóa đơn của họ
function displayTopCustomers(orders) {
  const customerStats = {};

  // Duyệt qua các đơn hàng và tính toán doanh thu theo khách hàng
  orders.forEach((order) => {
    if (order.status === "Đã giao thành công") {
      const customerId = order.userId; // ID khách hàng
      if (!customerStats[customerId]) {
        customerStats[customerId] = {
          totalRevenue: 0,
          customerName: order.fullname,
          customerId: order.userId,
          orders: [],
        };
      }

      let orderRevenue = 0;
      order.orderDetails.forEach((item) => {
        orderRevenue += item.totalPrice; // Cộng tổng tiền cho mỗi mặt hàng
      });

      customerStats[customerId].totalRevenue += orderRevenue;
      customerStats[customerId].orders.push(order); // Lưu lại hóa đơn của khách hàng
    }
  });

  // Lọc và sắp xếp 5 khách hàng có doanh thu cao nhất
  const topCustomers = Object.values(customerStats)
    .sort((a, b) => b.totalRevenue - a.totalRevenue) // Sắp xếp theo doanh thu giảm dần
    .slice(0, 5); // Lấy 5 khách hàng đầu tiên
  const container = document.getElementById("container");

  // Hiển thị danh sách khách hàng và doanh thu của họ
  let customersHTML = `
    <div class="mt-10">
      <h3 class="text-center text-gray-900 text-2xl font-semibold">Top 5 Khách Hàng Mua Nhiều Nhất</h3>
      <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table class="min-w-full table-auto bg-gray-100">
          <thead class="bg-yellow-200 text-black">
            <tr>
              <th scope="col" class="px-4 py-2 text-left">Tên Khách Hàng</th>
              <th scope="col" class="px-4 py-2 text-left">Tổng Số Tiền</th>
              <th scope="col" class="px-4 py-2 text-left">Xem Tất Cả Hóa Đơn</th>
            </tr>
          </thead>
          <tbody id="table-content">
            ${topCustomers
              .map(
                (customer) => `
              <tr class="border-b">
                <td class="px-4 py-2">${customer.customerName}</td>
                <td class="px-4 py-2 text-green-600">${formatCurrencyVND(customer.totalRevenue)}</td>
                <td class="px-4 py-2">
                  <a onclick="viewInvoices(${customer.customerId})" class="text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded text-sm" target="_blank">
                    Xem Chi Tiết
                  </a>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>

      `;
  
  
  container.innerHTML += customersHTML;
}

function filterOrdersByDateThongKe() {
  const startDate = new Date(document.getElementById("startDateThongKe").value);
  const endDate = new Date(document.getElementById("endDateThongKe").value);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    alert("Vui lòng chọn ngày bắt đầu và ngày kết thúc");
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
  displayStats(filteredOrders);
}


function viewInvoices(userId) {
  console.log(userId);
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const userOrders = orders.filter(order => order.userId === userId);

  let invoiceDetails = '';
  userOrders.forEach(order => {
      invoiceDetails += ` 
          <div class="bg-white p-4 rounded-lg shadow-md mb-4">
              <h4 class="text-xl font-semibold">Đơn hàng #${order.orderId}</h4>
              <p><strong>Tình trạng:</strong> ${order.status}</p>
              <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString()} VND</p>
              <a class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" href="order-details.html?orderId=${order.orderId}" target = "_blank">Xem chi tiết</a>
          </div>
      `;
  });

  // Hiển thị modal xem chi tiết hóa đơn
  const modal = document.createElement('div');
  modal.classList.add('modal-xyz', 'fixed', 'inset-0', 'bg-gray-600', 'bg-opacity-50', 'flex', 'justify-center', 'items-center', 'z-50');
  modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg max-w-lg w-full relative">
          <span class="absolute top-0 right-0 p-2 text-gray-500 cursor-pointer text-xl" onclick="closeModal()">&times;</span>
          <h3 class="text-2xl font-semibold mb-4">Hóa đơn của khách hàng</h3>
          ${invoiceDetails}
      </div>
  `;
  document.body.appendChild(modal);
}

// Đóng modal
function closeModal() {
  const modal = document.querySelector('.modal-xyz'); // Chỉ cần lấy phần tử đầu tiên
  if (modal) {
    modal.remove(); // Xóa modal nếu nó tồn tại
  }
}





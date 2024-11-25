// Hàm hiển thị danh sách người dùng
function displayUsers() {
    const container = document.getElementById('container');
    if (!container) {
        console.log('Không tìm thấy phần tử container.');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const userString = localStorage.getItem('user');
    let userList = userString ? JSON.parse(userString) : [];
    if (!Array.isArray(userList)) userList = [];

    // Tạo bảng hiển thị danh sách người dùng
    let userTable = `
        <h2>Quản lí Khách Hàng</h2>
        <button onclick="showAddUserForm()">Thêm người dùng</button>
        <div>
            <input type="text" id="searchInput" placeholder="Nhập ID người dùng">
            <button onclick="searchUserById()">Tìm kiếm ID người dùng</button>
        </div>
        <div id="addUserForm" style="display: none;">
            <h3>Thêm người dùng mới</h3>
            <label for="addUsername">Tên người dùng:</label>
            <input type="text" id="addUsername">
            <label for="addFullname">Họ tên:</label>
            <input type="text" id="addFullname">
            <label for="addPhone">Số điện thoại:</label>
            <input type="text" id="addPhone">
            <label for="addAddress">Địa chỉ:</label>
            <input type="text" id="addAddress">
            <label for="addPassword">Mật khẩu:</label>
            <input type="password" id="addPassword">
            <button onclick="addUserFromForm()">Lưu</button>
            <button onclick="hideAddUserForm()">Hủy</button>
        </div>
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="countIDUser" class="filter__link" href="#">ID</a></div>
                <div class="header__item"><a id="username" class="filter__link" href="#">Tên người dùng</a></div>
                <div class="header__item"><a id="fullname" class="filter__link" href="#">Họ tên</a></div>
                <div class="header__item"><a id="phone" class="filter__link" href="#">Số điện thoại</a></div>
                <div class="header__item"><a id="status" class="filter__link" href="#">Trạng thái</a></div>
            </div>
            <div class="table-content" id="table-content">
    `;

    if (userList.length === 0) {
        userTable += `
            <div class="table-row">
                <div class="table-data" colspan="5">Không có người dùng nào</div>
            </div>
        `;
    } else {
        userList.forEach(user => {
            userTable += `
            <div class="table-row">
                <div class="table-data">${user.id}</div>
                <div class="table-data">${user.username}</div>
                <div class="table-data">${user.fullname}</div>
                <div class="table-data">${user.phone}</div>
                <div class="table-data">
                     <button onclick="deleteUser(${user.id})">Xóa</button>
                     <button onclick="lockUser(${user.id})">Khóa</button>
                     <button onclick="unlockUser(${user.id})">Mở Khóa</button>
                     <button onclick="showEditUserForm(${user.id})">Sửa</button>
                </div>
            </div>`;
        });
    }

    userTable += `
            </div>
        </div>
    `;

    container.innerHTML = userTable;
}

// Hiển thị form thêm người dùng
function showAddUserForm() {
    document.getElementById('addUserForm').style.display = 'block';
}

// Ẩn form thêm người dùng
function hideAddUserForm() {
    document.getElementById('addUserForm').style.display = 'none';
}

// Hàm thêm người dùng từ form
function addUserFromForm() {
    const username = document.getElementById('addUsername').value;
    const fullname = document.getElementById('addFullname').value;
    const phone = document.getElementById('addPhone').value;
    const address = document.getElementById('addAddress').value;
    const password = document.getElementById('addPassword').value;

    addUser(username, fullname, phone, password, address);
    hideAddUserForm();
}

// Hàm thêm người dùng
function addUser(username, fullname, phone, address, password) {
    if (!username || !fullname || !phone || !address || !password) {
        alert("Vui lòng nhập đầy đủ thông tin người dùng.");
        return;
    }

    // Kiểm tra xem người dùng đã tồn tại chưa
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    if (userList.some(user => user.username === username)) {
        alert("Người dùng đã tồn tại.");
        return;
    }

    // Lấy ID mới cho người dùng
    let countIDUser = parseInt(localStorage.getItem('countIDUser')) || 0;
    countIDUser += 1;
    localStorage.setItem('countIDUser', countIDUser);  // Cập nhật countIDUser

    // Tạo đối tượng người dùng mới
    const newUser = {
        id: countIDUser,  // ID người dùng mới
        username: username,
        fullname: fullname,
        phone: phone,
        address: address,
        password: password,
        isLocked: false,  // Mặc định tài khoản chưa bị khóa
    };

    // Lưu thông tin người dùng vào localStorage
    userList.push(newUser);
    localStorage.setItem('user', JSON.stringify(userList));

    alert("Người dùng đã được thêm thành công.");
    displayUsers();  // Cập nhật danh sách người dùng sau khi thêm
}

// Hàm sửa thông tin người dùng
function editUser(userId, newUsername, newFullname, newPhone, newPassword) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);
    if (!user) {
        alert("Không tìm thấy người dùng.");
        return;
    }

    user.username = newUsername;
    user.fullname = newFullname;
    user.phone = newPhone;
    user.password = newPassword;

    localStorage.setItem('user', JSON.stringify(userList));
    alert("Thông tin người dùng đã được sửa thành công.");
    displayUsers();
}

// Hàm xóa người dùng
function deleteUser(userId) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    userList = userList.filter(user => user.id !== userId);

    localStorage.setItem('user', JSON.stringify(userList));
    alert("Người dùng đã được xóa thành công.");
    displayUsers();
}
//Hàm khóa người dùng
function lockUser(userId) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);
    if (user) {
        if (user.isLocked) {
            alert("Người dùng đã bị khóa.");
            return;
        }
        user.isLocked = true;
        localStorage.setItem('user', JSON.stringify(userList));
        alert(`Người dùng '${user.username}' đã bị khóa.`);
        displayUsers();
    } else {
        alert("Không tìm thấy người dùng.");
    }
}
//Hàm mở khóa người dùng
function unlockUser(userId) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);
    if (user) {
        if (!user.isLocked) {
            alert("Người dùng không bị khóa.");
            return;
        }
        user.isLocked = false;
        localStorage.setItem('user', JSON.stringify(userList));
        alert(`Người dùng '${user.username}' đã được mở khóa.`);
        displayUsers();
    } else {
        alert("Không tìm thấy người dùng.");
    }
}

// Hàm tìm kiếm ID của người dùng
function searchUserById() {
    const searchInput = document.getElementById('searchInput').value;
    if (!searchInput) {
        alert('Vui lòng nhập ID để tìm kiếm.');
        return;
    }

    const userId = parseInt(searchInput, 10);
    if (isNaN(userId)) {
        alert('ID không hợp lệ. Vui lòng nhập một số nguyên.');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const userString = localStorage.getItem('user');
    let userList = userString ? JSON.parse(userString) : [];
    if (!Array.isArray(userList)) userList = [];

    // Tìm người dùng theo ID
    const user = userList.find(user => user.id === userId);
    if (!user) {
        alert('Không tìm thấy người dùng với ID đã nhập.');
        return;
    }

    // Hiển thị kết quả tìm kiếm
    let searchResult = `
        <h2>Kết quả tìm kiếm</h2>
        <button onclick="displayUsers()">Quay lại</button>
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">ID</a></div>
                <div class="header__item"><a id="username" class="filter__link" href="#">Tên người dùng</a></div>
                <div class="header__item"><a id="fullname" class="filter__link" href="#">Họ tên</a></div>
                <div class="header__item"><a id="phone" class="filter__link" href="#">Số điện thoại</a></div>
                <div class="header__item"><a id="status" class="filter__link" href="#">Trạng thái</a></div>
            </div>
            <div class="table-content">
                <div class="table-row table-row-highlight">
                    <div class="table-data">${user.id}</div>
                    <div class="table-data">${user.username}</div>
                    <div class="table-data">${user.fullname}</div>
                    <div class="table-data">${user.phone}</div>
                    <div class="table-data">
                        <button onclick="deleteUser(${user.id})">Xóa</button>
                        <button onclick="lockUser(${user.id})">Khóa</button>
                        <button onclick="unlockUser(${user.id})">Mở Khóa</button>
                        <button onclick="showEditUserForm(${user.id})">Sửa</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Cập nhật giao diện để hiển thị kết quả
    const container = document.getElementById('container');
    container.innerHTML = searchResult;
}
function login(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ tên người dùng và mật khẩu.");
        return;
    }

    const userString = localStorage.getItem('user');
    let userList = userString ? JSON.parse(userString) : [];
    if (!Array.isArray(userList)) userList = [];

    const user = userList.find(user => user.username === username);

    console.log("Đăng nhập kiểm tra user:", user); // Gỡ lỗi

    if (user) {
        try {
            console.log(`Trạng thái isLocked của người dùng: ${user.isLocked}`); // Gỡ lỗi
            if (user.isLocked) {
                alert("Tài khoản của bạn đã bị khóa! Vui lòng liên hệ quản trị viên.");
                return; // Ngăn không cho tiếp tục xử lý
            }
            if (user.password === password) {
                alert("Đăng Nhập Thành Công!!");
                localStorage.setItem("currentUser", user.fullname);
                window.location.href = "../html/indexLogin.html";
            } else {
                alert("Sai mật khẩu!");
            }
        } catch (e) {
            console.error(`Lỗi khi xử lý dữ liệu người dùng: ${e}`);
            alert("Đăng Nhập Thất Bại!!");
        }
    } else {
        alert("Tên người dùng không tồn tại!");
    }
}

// Hiển thị danh sách người dùng khi tải trang
document.addEventListener('DOMContentLoaded', displayUsers);

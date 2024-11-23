// Hiển thị danh sách người dùng
function displayUsers() {
    const container = document.getElementById('container');
    if (!container) {
        console.log('Không tìm thấy phần tử container.');
        return;
    }

    // Lấy danh sách tất cả các người dùng từ localStorage
    let userList = [];
    let userId = 1; // ID người dùng bắt đầu từ 1
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "currentUser" && key !== "userIdCounter") { // Loại trừ currentUser và userIdCounter
            const userString = localStorage.getItem(key);

            try {
                const user = JSON.parse(userString);
                if (user && user.username) {
                    // Gán ID cho người dùng và cập nhật trong localStorage nếu chưa có ID
                    if (!user.id) {
                        user.id = userId++;
                    } else {
                        user.id = userId++;
                    }
                    localStorage.setItem(key, JSON.stringify(user)); // Cập nhật thông tin người dùng trong localStorage
                    userList.push(user);
                }
            } catch (e) {
                console.error(`Không thể phân tích chuỗi JSON: ${userString}`, e);
            }
        }
    }

    // Tạo bảng hiển thị danh sách người dùng
    let userTable = `
        <h2>Quản lý Khách Hàng</h2>
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
            <label for="addPhonenumber">Số điện thoại:</label>
            <input type="text" id="addPhonenumber">
            <label for="addPassword">Mật khẩu:</label>
            <input type="password" id="addPassword">
            <button onclick="addUserFromForm()">Lưu</button>
            <button onclick="hideAddUserForm()">Hủy</button>
        </div>
        <div id="editUserForm" style="display: none;">
            <h3>Sửa thông tin người dùng</h3>
            <input type="hidden" id="editOldUsername">
            <label for="editUsername">Tên người dùng:</label>
            <input type="text" id="editUsername">
            <label for="editFullname">Họ tên:</label>
            <input type="text" id="editFullname">
            <label for="editPhonenumber">Số điện thoại:</label>
            <input type="text" id="editPhonenumber">
            <label for="editPassword">Mật khẩu:</label>
            <input type="password" id="editPassword">
            <button onclick="editUserFromForm()">Lưu</button>
            <button onclick="hideEditUserForm()">Hủy</button>
        </div>
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">ID</a></div>
                <div class="header__item"><a id="username" class="filter__link" href="#">Tên người dùng</a></div>
                <div class="header__item"><a id="fullname" class="filter__link" href="#">Họ tên</a></div>
                <div class="header__item"><a id="phonenumber" class="filter__link" href="#">Số điện thoại</a></div>
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
                <div class="table-data">${user.phonenumber}</div> 
                <div class="table-data">
                     <button onclick="deleteUser('${user.username}')">Xóa</button>
                     <button onclick="lockUser('${user.username}')">Khóa</button>
                     <button onclick="unlockUser('${user.username}')">Mở Khóa</button>
                     <button onclick="showEditUserForm('${user.username}', '${user.fullname}', '${user.phonenumber}', '${user.password}')">Sửa</button>
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

// Hàm xử lý thêm người dùng từ form
function addUserFromForm() {
    const username = document.getElementById('addUsername').value;
    const fullname = document.getElementById('addFullname').value;
    const phonenumber = document.getElementById('addPhonenumber').value;
    const password = document.getElementById('addPassword').value;

    addUser(username, fullname, phonenumber, password);
    hideAddUserForm(); // Ẩn form sau khi thêm người dùng
}

// Hàm thêm người dùng (đã cập nhật với ID)
function addUser(username, fullname, phonenumber, password) {
    if (!username || !fullname || !phonenumber || !password) {
        alert("Vui lòng nhập đầy đủ thông tin người dùng.");
        return;
    }

    // Kiểm tra xem người dùng đã tồn tại chưa
    if (localStorage.getItem(username)) {
        alert("Người dùng đã tồn tại.");
        return;
    }

    // Tạo ID mới cho người dùng
    let userId = localStorage.getItem("userIdCounter");
    if (!userId) {
        userId = 1; // ID bắt đầu từ 1 nếu chưa tồn tại
    } else {
        userId = parseInt(userId, 10) + 1;
    }
    localStorage.setItem("userIdCounter", userId); // Lưu lại ID mới

    // Tạo đối tượng người dùng mới
    const newUser = {
        id: userId,
        username: username,
        fullname: fullname,
        phonenumber: phonenumber,
        password: password,
        isLocked: false // Mặc định tài khoản chưa bị khóa
    };

    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem(username, JSON.stringify(newUser));
    alert("Người dùng đã được thêm thành công.");
    displayUsers(); // Cập nhật danh sách người dùng sau khi thêm
}

// Hàm xóa người dùng và cập nhật lại ID
function deleteUser(username) {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng ${username}?`)) {
        localStorage.removeItem(username);
        alert("Người dùng đã được xóa.");
        updateUserIds(); // Cập nhật lại ID của tất cả người dùng sau khi xóa
        displayUsers(); // Cập nhật danh sách sau khi xóa
    }
}

// Hàm cập nhật lại ID của tất cả người dùng
function updateUserIds() {
    let userId = 1; // ID người dùng bắt đầu từ 1
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "currentUser" && key !== "userIdCounter") { // Loại trừ currentUser và userIdCounter
            const userString = localStorage.getItem(key);

            try {
                const user = JSON.parse(userString);
                if (user && user.username) {
                    user.id = userId++;
                    localStorage.setItem(key, JSON.stringify(user)); // Cập nhật lại ID trong localStorage
                }
            } catch (e) {
                console.error(`Không thể phân tích chuỗi JSON: ${userString}`, e);
            }
        }
    }
}

// Hiển thị form sửa người dùng
function showEditUserForm(username, fullname, phonenumber, password) {
    document.getElementById('editOldUsername').value = username;
    document.getElementById('editUsername').value = username;
    document.getElementById('editFullname').value = fullname;
    document.getElementById('editPhonenumber').value = phonenumber;
    document.getElementById('editPassword').value = password;
    document.getElementById('editUserForm').style.display = 'block';
}

// Ẩn form sửa người dùng
function hideEditUserForm() {
    document.getElementById('editUserForm').style.display = 'none';
}

// Hàm xử lý sửa người dùng từ form
function editUserFromForm() {
    const oldUsername = document.getElementById('editOldUsername').value;
    const newUsername = document.getElementById('editUsername').value;
    const newFullname = document.getElementById('editFullname').value;
    const newPhonenumber = document.getElementById('editPhonenumber').value;
    const newPassword = document.getElementById('editPassword').value;

    editUser(oldUsername, newUsername, newFullname, newPhonenumber, newPassword);
    hideEditUserForm(); // Ẩn form sau khi sửa người dùng
}

// Hàm sửa thông tin người dùng
function editUser(oldUsername, newUsername, newFullname, newPhonenumber, newPassword) {
    if (!oldUsername || !newUsername || !newFullname || !newPhonenumber || !newPassword) {
        alert("Vui lòng nhập đầy đủ thông tin để sửa.");
        return;
    }

    // Lấy thông tin người dùng từ localStorage
    let user = localStorage.getItem(oldUsername);
    if (!user) {
        alert("Không tìm thấy người dùng.");
        return;
    }

    user = JSON.parse(user);
    user.username = newUsername;
    user.fullname = newFullname;
    user.phonenumber = newPhonenumber;
    user.password = newPassword;

    // Xóa thông tin người dùng cũ và lưu thông tin mới
    localStorage.removeItem(oldUsername);
    localStorage.setItem(newUsername, JSON.stringify(user));
    alert("Thông tin người dùng đã được sửa thành công.");
    updateUserIds(); // Cập nhật lại ID của tất cả người dùng sau khi sửa
    displayUsers(); // Cập nhật danh sách người dùng sau khi sửa
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

    let userList = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "currentUser" && key !== "userIdCounter") { // Loại trừ currentUser và userIdCounter
            const userString = localStorage.getItem(key);
            try {
                const user = JSON.parse(userString);
                if (user && user.username) {
                    userList.push(user);
                }
            } catch (e) {
                console.error(`Không thể phân tích chuỗi JSON: ${userString}`, e);
            }
        }
    }

    const user = userList.find(user => user.id === userId);
    if (!user) {
        alert('Không tìm thấy người dùng với ID đã nhập.');
        return;
    }

    let searchResult = `
        <h2>Kết quả tìm kiếm</h2>
        <button onclick="displayUsers()">Quay lại</button>
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">ID</a></div>
                <div class="header__item"><a id="username" class="filter__link" href="#">Tên người dùng</a></div>
                <div class="header__item"><a id="fullname" class="filter__link" href="#">Họ tên</a></div>
                <div class="header__item"><a id="phonenumber" class="filter__link" href="#">Số điện thoại</a></div>
                <div class="header__item"><a id="status" class="filter__link" href="#">Trạng thái</a></div>
            </div>
            <div class="table-content">
                <div class="table-row table-row-highlight">
                    <div class="table-data">${user.id}</div>
                    <div class="table-data">${user.username}</div>
                    <div class="table-data">${user.fullname}</div>
                    <div class="table-data">${user.phonenumber}</div>
                    <div class="table-data">
                        <button onclick="deleteUser('${user.username}')">Xóa</button>
                        <button onclick="lockUser('${user.username}')">Khóa</button>
                        <button onclick="unlockUser('${user.username}')">Mở Khóa</button>
                        <button onclick="showEditUserForm('${user.username}', '${user.fullname}', '${user.phonenumber}', '${user.password}')">Sửa</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    const container = document.getElementById('container');
    container.innerHTML = searchResult;
}

// Hàm khóa người dùng
function lockUser(username) {
    let user = localStorage.getItem(username);
    if (user) {
        try {
            user = JSON.parse(user);
            user.isLocked = true; // Thêm thuộc tính "isLocked" vào thông tin người dùng
            localStorage.setItem(username, JSON.stringify(user));
            alert(`Người dùng ${username} đã bị khóa.`);
            displayUsers(); // Cập nhật danh sách sau khi khóa
        } catch (e) {
            console.error(`Không thể phân tích chuỗi JSON: ${user}`, e);
        }
    } else {
        alert("Không tìm thấy người dùng.");
    }
}

// Hàm mở khóa người dùng (nếu cần)
function unlockUser(username) {
    let user = localStorage.getItem(username);
    if (user) {
        try {
            user = JSON.parse(user);
            delete user.isLocked; // Xóa thuộc tính "isLocked"
            localStorage.setItem(username, JSON.stringify(user));
            alert(`Người dùng ${username} đã được mở khóa.`);
            displayUsers(); // Cập nhật danh sách sau khi mở khóa
        } catch (e) {
            console.error(`Không thể phân tích chuỗi JSON: ${user}`, e);
        }
    } else {
        alert("Không tìm thấy người dùng.");
    }
}

// Kiểm tra trạng thái người dùng khi đăng nhập
function login(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let user = localStorage.getItem(username);
    if (user) {
        try {
            let data = JSON.parse(user);

            if (data.isLocked) {
                alert("Tài khoản của bạn đã bị khóa!");
            } else if (username === data.username && password === data.password) {
                alert("Đăng Nhập Thành Công!!");
                localStorage.setItem("currentUser", data.fullname);
                window.location.href = "../html/indexLogin.html";
            } else {
                alert("Sai mật khẩu!");
            }
        } catch (e) {
            console.error(`Không thể phân tích chuỗi JSON: ${user}`, e);
            alert("Đăng Nhập Thất Bại!!");
        }
    } else {
        alert("Đăng Nhập Thất Bại!!");
    }
}

// Gọi hàm để hiển thị danh sách người dùng khi tải trang
document.addEventListener('DOMContentLoaded', displayUsers);

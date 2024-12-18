function remind(){
    alert("Bạn phải đăng nhập mới xem được lịch sử mua hàng!!");
}
document.getElementById('loginButton').addEventListener('click', function (e) {
    event.preventDefault();
    document.getElementById('authModal').style.display = 'flex';
});
document.getElementById('loginButton2').addEventListener('click', function (e) {
    event.preventDefault();
    document.getElementById('authModal').style.display = 'flex';
});
function createAdmin() {
    if (localStorage.getItem('user') === null) {
        var countIDUser = 0;
        localStorage.setItem('countIDUser', countIDUser);
        var status = false;
        var userArray = [];
        var user = { id: countIDUser, username: 'admin', fullname: 'Hoang',address: '270/97 Phan Đình Phùng',phuong: '1',quan: 'Phú Nhuận', password: 'admin', phone: '0329997881', datesignup: '26-09-2005' , status: status, role: 'admin'};
        userArray.push(user);
        localStorage.setItem('user', JSON.stringify(userArray));
    }
}
createAdmin();
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('modalContent').classList.add('wide');
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('modalContent').classList.remove('wide');
}
function closeModal() {
    document.getElementById('authModal').style.display = 'none';
}
/* Đăng Kí */
document.getElementById('registerForm').addEventListener('submit', signup);
document.getElementById('loginForm').addEventListener('submit', login);
function signup(e) {
    event.preventDefault();
    var fullname = document.getElementById('newFullName');
    var phone = document.getElementById('newPhoneNumber');
    var address = document.getElementById('newAddress');
    var phuong = document.getElementById('newPhuong');
    var quan = document.getElementById('newQuan');
    var username = document.getElementById('newUsername');
    var password = document.getElementById('newPassword');
    var password2 = document.getElementById('newRepeatPassword');
    var flag = true;
    if (!fullname.value) {
        document.getElementById('fullNameError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('fullNameError').style.display = 'none';
    }
    if (!username.value) {
        document.getElementById('newUsernameError').style.display = 'block';
        flag = false;
    } else {
        if(username.value.length < 4){
            document.getElementById('newUsernameError').style.display = 'block';
            document.getElementById('newUsernameError').innerHTML = '<i>*Tên tài khoản phải trên 4 ký tự</i>';
            flag = false;
        }else{
            document.getElementById('newUsernameError').style.display = 'none';
        }
    }
    if (!address.value) {
        document.getElementById('addressError').style.display = 'block';
        flag = false;
    }else{
        document.getElementById('addressError').style.display = 'none';
    }
    if(!phuong.value){
        document.getElementById('phuongError').style.display = 'block';
        flag = false;
    }else{
        document.getElementById('phuongError').style.display = 'none';
    }
    if(!quan.value){
        document.getElementById('quanError').style.display = 'block';
        flag = false;
    }else{
        document.getElementById('quanError').style.display = 'none';
    }
    if (!phone.value) {
        document.getElementById('phoneNumberError').style.display = 'block';
        flag = false;
    } else {
        if (isNaN(Number(phone.value))) {
            document.getElementById('phoneNumberError').style.display = 'block';
            document.getElementById('phoneNumberError').innerHTML = '<i>*Số điện thoại không đúng định dạng</i>';
            flag = false;
        } else {
            if (Number(phone.value) < 100000000 || Number(phone.value) > 999999999) {
                document.getElementById('phoneNumberError').style.display = 'block';
                document.getElementById('phoneNumberError').innerHTML = '<i>*Số điện thoại không đúng định dạng</i>';
                flag = false;
            } else {
                document.getElementById('phoneNumberError').style.display = 'none';
            }
        }
    }
    
    if (!password.value) {
        document.getElementById('newPasswordError').style.display = 'block';
        flag = false;
    } else {
        if (password.value.length < 8) {
            document.getElementById('newPasswordError').style.display = 'block';
            document.getElementById('newPasswordError').innerHTML = '<i>*Mật khẩu phải trên 8 ký tự</i>';
            flag = false;
        } else {
            document.getElementById('newPasswordError').style.display = 'none';
        }
    }
    if (password2.value != password.value) {
        document.getElementById('repeatPasswordError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('repeatPasswordError').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var d = new Date();
    var datesignup = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var status = true;
    var countIDUser = JSON.parse(localStorage.getItem('countIDUser'));countIDUser += 1;
    localStorage.setItem('countIDUser', countIDUser);
    var user = { id: countIDUser, username: username.value, fullname: fullname.value,address: address.value,phuong: phuong.value,quan: quan.value, password: password.value, phone: phone.value, datesignup: datesignup, status: status, role: 'khachhang' };
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (user.username == userArray[i].username) {
            document.getElementById('newUsernameError').style.display = 'block';
            document.getElementById('newUsernameError').innerHTML = '<i>*Tên đăng nhập đã có người sử dụng</i>';
            username.focus();
            return false;
        }
    }
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
    alert('Bạn đã đăng ký thành công!');
    showLoginForm();
}

// Đăng Nhập
function login(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var flag = true;
    if (!username) {
        document.getElementById('usernameError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }
    if (!password) {
        document.getElementById('passwordError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username && password == userArray[i].password) {
            if(userArray[i].status == false){
                alert('Tài khoản đã bị khóa!');
                document.getElementById('authModal').style.display = 'none';
                return false;
            }
        }
        if (username == userArray[i].username) {
            if (password == userArray[i].password) {
                document.getElementById('authModal').style.display = 'none';
                localStorage.setItem('userlogin', JSON.stringify(userArray[i]));
                window.location.href = "../html/indexLogin.html";
                return true;
            }
        }
    }
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordError').innerHTML = '<i>*Sai thông tin đăng nhập</i>';
    return false;
}
function validateSoNha(){
    const  soNha = document.getElementById('newAddress').value;
    if (!soNha) {
        document.getElementById('addressError').style.display = 'block';
    } else {
        document.getElementById('addressError').style.display = 'none';
    }
}
function validatePhuong(){
    const phuong = document.getElementById('newPhuong').value;
    if (!phuong) {
        document.getElementById('phuongError').style.display = 'block';
    } else {
        document.getElementById('phuongError').style.display = 'none';
    }
}
function validateQuan(){
    const quan = document.getElementById('newQuan').value;
    if (!quan) {
        document.getElementById('quanError').style.display = 'block';
    } else {
        document.getElementById('quanError').style.display = 'none';
    }
}
function validateFullName() {
    const fullname = document.getElementById('newFullName').value;
    if (!fullname) {
        document.getElementById('fullNameError').style.display = 'block';
    } else {
        document.getElementById('fullNameError').style.display = 'none';
    }
}

function validateNewUsername() {
    const username = document.getElementById('newUsername').value;
    const errorElement = document.getElementById('newUsernameError');
    errorElement.style.display = 'none';
    errorElement.innerHTML = '';

    if (!username) {
        errorElement.style.display = 'block';
        errorElement.innerHTML = '<i>*Tên tài khoản không được để trống</i>';
    } 
    else if (username.length < 4) {
        errorElement.style.display = 'block';
        errorElement.innerHTML = '<i>*Tên tài khoản phải trên 4 ký tự</i>';
    }
}

function validatePhoneNumber() {
    const phone = document.getElementById('newPhoneNumber').value;
    if (!phone || isNaN(Number(phone)) || phone.length !== 10) {
        document.getElementById('phoneNumberError').style.display = 'block';
        document.getElementById('phoneNumberError').innerHTML = '<i>*Số điện thoại không đúng định dạng</i>';
    } else {
        document.getElementById('phoneNumberError').style.display = 'none';
    }
}

function validatePasswordMatch() {
    const password = document.getElementById('newPassword').value;
    const password2 = document.getElementById('newRepeatPassword').value;
    if (password !== password2) {
        document.getElementById('repeatPasswordError').style.display = 'block';
    } else {
        document.getElementById('repeatPasswordError').style.display = 'none';
    }
    if(password.length < 8){
        document.getElementById('newPasswordError').style.display = 'block';
        document.getElementById('newPasswordError').innerHTML = '<i>*Mật khẩu phải trên 8 ký tự</i>';
    }else{
        document.getElementById('newPasswordError').style.display = 'none';
    }
}
function validateUsername() {
    const username = document.getElementById('username').value;
    if (!username) {
        document.getElementById('usernameError').style.display = 'block';
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    if (!password) {
        document.getElementById('passwordError').style.display = 'block';
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
}

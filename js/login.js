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
        var status = true;
        var userArray = [];
        var user = { id: countIDUser, username: 'admin', fullname: 'Hoang',address: '36', password: 'admin', phone: '0329997881', datesignup: '26-09-2005' , status: status};
        userArray.push(user);
        localStorage.setItem('user', JSON.stringify(userArray));
    }
}
createAdmin();
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Đóng form khi nhấn ra ngoài
window.onclick = function (event) {
    if (event.target == document.getElementById('authModal')) {
        document.getElementById('authModal').style.display = 'none';
    }
};
/* Đăng Kí */
document.getElementById('registerForm').addEventListener('submit', signup);
document.getElementById('loginForm').addEventListener('submit', login);
function signup(e) {
    e.preventDefault();
    var fullname = document.getElementById('newFullName');
    var phone = document.getElementById('newPhoneNumber');
    var address = document.getElementById('newAddress');
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
        document.getElementById('newUsernameError').style.display = 'none';
    }
    if (!address.value) {
        document.getElementById('addressError').style.display = 'block';
        flag = false;
    }else{
        document.getElementById('addressError').style.display = 'none';
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
    var user = { id: countIDUser, username: username.value, fullname: fullname.value,address: address.value, password: password.value, phone: phone.value, datesignup: datesignup, status: status };
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

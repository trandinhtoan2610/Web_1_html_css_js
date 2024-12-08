function displayUsername() {
    var user = JSON.parse(localStorage.getItem('userlogin'));
   
    if (user.fullname) {
        document.getElementById("printUsername").innerHTML = user.fullname;
        document.getElementById("printUS").innerHTML = user.fullname;
    }
    else {
        document.getElementById("printUsername").innerHTML = "Khách";
        document.getElementById("printUS").innerHTML = "Khách";
    }
}
displayUsername();


function LogOut(){
    alert("Đăng xuất")
    localStorage.removeItem('userlogin')
    localStorage.removeItem('DSGH')
}
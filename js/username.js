function displayUsername() {
    var user = JSON.parse(localStorage.getItem('userlogin'));
   
    if (user.fullname) {
        document.getElementById("printUsername").innerHTML = user.fullname;
        document.getElementById("printUS").innerHTML = user.fullname;
        document.getElementById("printUname").innerHTML = user.fullname;
    }
    else {
        document.getElementById("printUsername").innerHTML = "Khách";
        document.getElementById("printUS").innerHTML = "Khách";
        document.getElementById("printUname").innerHTML = "Khách";
    }
}
displayUsername();
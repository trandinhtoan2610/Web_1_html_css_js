var DSSP_json = localStorage.getItem('products')
var DSSP = JSON.parse(DSSP_json)

if (DSSP == null)
{
    DSSP = new Array();
}

if (!localStorage.getItem('countID')) {
    localStorage.setItem('countID', 1); 
}
var ProductsPerPage = 10;

function KhoiTaoSanPham(hinh, brand, ten, gia, vitri, id, ram, ssd, card, MoTa){
    SanPham = new Object();
    SanPham.image = hinh;
    SanPham.kind = brand;
    SanPham.name = ten;
    SanPham.price = gia;
    SanPham.location = vitri;
    SanPham.id = id;
    SanPham.ram = ram;
    SanPham.ssd = ssd;
    SanPham.card = card;
    SanPham.description = MoTa;
    return SanPham;
}

//Function them san pham vao local storage.
function TaoSanPham (){
    var countID = parseInt(localStorage.getItem('countID'), 10);
    var NodeHinhAnh = document.getElementById("fix_hinhAnh")
    var NodeBrand = document.getElementById('kind')
    var NodeTen = document.getElementById('name')
    var NodeGiaTien = document.getElementById('price')
    var NodeViTri = document.getElementById('location')
    var NodeRam = document.getElementById('ram')
    var NodeSSD = document.getElementById('ssd')
    var NodeCard = document.getElementById('card')
    var NodeMoTa = document.getElementById('description')

    /*Kiểm tra tính hợp lý */
    if (NodeHinhAnh.files.length === 0) {
        document.getElementById('AP_IMG_Warning').style.display ='block';
        return false;
    }
    else
        document.getElementById('AP_IMG_Warning').style.display ='none';

    if (NodeTen.value == ''){
        document.getElementById('AP_NAME_Warning').style.display ='block';
        NodeTen.focus()
        return false;
    }
    else{
        document.getElementById('AP_NAME_Warning').style.display ='none';
    }

    if (NodeGiaTien.value == ''){
        document.getElementById('AP_PRICE1_Warning').style.display ='block';
        NodeGiaTien.focus()
        return false
    }
    else
        document.getElementById('AP_PRICE1_Warning').style.display ='none';

    
    if (NodeGiaTien.value < 9000000){
        document.getElementById('AP_PRICE2_Warning').style.display ='block';
        NodeGiaTien.focus()
        return false
    }
    else
        document.getElementById('AP_PRICE2_Warning').style.display ='none';
    

    if (NodeViTri.value == ''){
        document.getElementById('AP_LOCATION_Warning').style.display ='block';
        NodeViTri.focus()
        return false
    }
    else
        document.getElementById('AP_LOCATION_Warning').style.display ='none';


    if (NodeRam.value == ''){
        document.getElementById('AP_RAM_Warning').style.display ='block';
        NodeRam.focus()
        return false
    }
    else
        document.getElementById('AP_RAM_Warning').style.display ='none';

    if (NodeSSD.value == ''){
        document.getElementById('AP_SSD_Warning').style.display ='block';
        NodeSSD.focus()
        return false
    }
    else
        document.getElementById('AP_SSD_Warning').style.display ='none';

    if (NodeCard.value == ''){
        document.getElementById('AP_CARD_Warning').style.display ='block';
        NodeCard.focus()
        return false
    }
    else
        document.getElementById('AP_CARD_Warning').style.display ='none';

    if (NodeMoTa.value == ''){
        document.getElementById('AP_DESCRIPTION_Warning').style.display ='block';
        NodeMoTa.focus()
        return false
    }
    else
        document.getElementById('AP_DESCRIPTION_Warning').style.display ='none';



    var Brand = NodeBrand.value
    var Ten = NodeTen.value
    var GiaTien = NodeGiaTien.value
    var ViTri = NodeViTri.value

    var NodeID = document.getElementById('id')
    var ID = NodeID.value
    NodeID.value = countID+1;

    var Ram = NodeRam.value
    var SSD = NodeSSD.value
    var Card = NodeCard.value
    var MoTa = NodeMoTa.value
    NodeBrand.value = 'Acer';
    NodeTen.value = '';
    NodeGiaTien.value = '';
    NodeViTri.value = '';
    NodeRam.value = '';
    NodeSSD.value = '';
    NodeCard.value = '';
    NodeMoTa.value = '';

    const fr = new FileReader();
    var HinhAnh
    fr.readAsDataURL(NodeHinhAnh.files[0]) 
    fr.addEventListener('load', () => {
        const url = fr.result
        HinhAnh = url
        console.log(url);

        var SanPham = KhoiTaoSanPham(HinhAnh,Brand,Ten,GiaTien,ViTri,ID,Ram,SSD,Card,MoTa)
        DSSP.push(SanPham);
        console.log(DSSP)
         
        /*Chuyen array DSSP thanh JSON roi them vao localStorage */
        var JSON_DSSP = JSON.stringify(DSSP)
        localStorage.setItem('products',JSON_DSSP)
        localStorage.setItem('countID', countID + 1); // Tăng countID và lưu lại

        NodeHinhAnh.value = '';
        alert("Thêm sản phẩm thành công")
        DivThemSanPham()
     
    });
    
}


//*PHAN CHINH CUA TRANG
NodeContainer = document.getElementById('container')
console.log(NodeContainer)

NodeContainer.innerHTML = Products_container()


//Các hàm chứa html : //
//<------------------------------------------------------------------ //
function Products_container (){
    return '    <!--phan loai theo hang san pham-->\n'+
    '            <div class="brand-list">\n'+
    '                <a href="indexAdmin.html?brand=Acer"><img src="../img/acer.png" alt="acer"></a>\n'+
    '                <a href="indexAdmin.html?brand=Lenovo"><img src="../img/lenovo.png" alt="lenovo"></a>\n'+
    '            </div>\n'+
    '            <!--List cac san pham-->\n'+
    '            <section class="product-one"> <!--section product list-->\n'+
    '				<h2>Các sản phẩm nổi bật</h2>\n'+
    '				<div id="product-list" class="product-row"> </div>	<!-- Sản Phẩm-->		\n'+
    '				<div id="product-info" class="modal" style="display: none;"><!--Chi Tiết Sản Phẩm-->\n'+
    '					<div id="info">\n'+
    '						<button type="button" id="close" onclick="closeProductInfo()">x</button>\n'+
    '						<div class="left">\n'+
    '							<img id="productImg">\n'+
    '						</div>\n'+
    '						<div class="right">\n'+
    '							<h2 id="productName"></h2>\n'+
    '							<h4 id="productPrice"></h4>\n'+
    '							<h4 id="productRam"></h4>\n'+
    '							<h4 id="productSSD"></h4>\n'+
    '							<h4 id="productCard"></h4>\n'+
    '							<h4 id="productLocation"></h4>\n'+
    '							<h6 id="productDescription"></h6>\n'+
    '							<button class="addtoCart" id="color-Cart">Thêm vào giỏ hàng</button>\n'+
    '						</div>\n'+
    '					</div>\n'+
    '				</div>\n'+
    '			</section>\n'+
    '            <!--phan trang-->\n'+
    '            <div id="pagination">\n'+
    '				<button>&lt;</button>\n'+
    '				<button class="active">1</button>\n'+
    '				<button>2</button>\n'+
    '				<button>3</button>\n'+
    '				<button>&gt;</button>\n'+
    '			</div>\n'+
    '        </div>';
}

function SettingProducts_Container(){
    var countID = parseInt(localStorage.getItem('countID'), 10);

    return '<div class="Modal__AddProducts">\n'+
'                <div class="AddProducts__Header">\n'+
'                    <ul class="AP_HeaderList">\n'+
'                        <li class= "Fix_Title">Thêm sản phẩm</li>\n'+
'                        <li><a href="#" id="Thoat_TaoSP" onclick = "DivDSSanPham()">Trở lại</a></li>\n'+
'                    </ul>\n'+
'                </div>\n'+
'                <div class="AP_main">\n'+
'                     <div>      '+
'                        <label for="fix_hinhAnh">Hình ảnh</label>\n'+
'                        <input type="file" id="fix_hinhAnh" accept="image/*"  onchange="previewImage()" />\n'+
'                        <p class="AP_Warning" id = "AP_IMG_Warning">*Hình ảnh không được để trống</p>\n'+
'                       <div class ="AP_img_preview"> <img id = "imagePreview" /> </div>  '+
'                     </div> '+
                
'                    <div>\n'+
'                        <label for="kind">Hãng máy</label>\n'+
'                        <select id="kind">\n'+
'                            <option>Acer</option>\n'+
'                            <option>Lenovo</option>\n'+
'                            <option>MSI</option>\n'+
'                        </select>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="name">Tên sản phẩm</label>\n'+
'                        <input type="text" id="name" oninput = "checkInput(1)" >\n'+
'                        <p class="AP_Warning" id = "AP_NAME_Warning">*Tên sản phẩm không được để trống</p>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="price">Giá tiền</label>\n'+
'                        <input type="number" id="price" oninput = "checkInput(2)">\n'+
'                        <p class="AP_Warning" id = "AP_PRICE1_Warning" >*Giá tiền phẩm không được để trống</p>\n'+
'                        <p class="AP_Warning" id = "AP_PRICE2_Warning">*Giá tiền sản phẩm phải trên 9.000.000đ</p>\n'+
'                    </div>\n'+
'                    <div class="ChiTietSP">\n'+
'                        <div>\n'+
'                            <label for="location">Vị trí</label>\n'+
'                            <input type="text" id="location" oninput = "checkInput(3)">\n'+
'                            <p class="AP_Warning" id = "AP_LOCATION_Warning">*Vị trí không được để trống</p>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="id">ID</label>\n'+
'                            <input type="text" id="id" value="'+ countID+'" readonly>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="ram">Ram</label>\n'+
'                            <input type="text" id="ram" oninput = "checkInput(4)">\n'+
'                            <p class="AP_Warning" id = "AP_RAM_Warning" >*Ram không được để trống </p>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="ssd">SSD</label>\n'+
'                            <input type="text" id="ssd" oninput = "checkInput(5)">\n'+
'                            <p class="AP_Warning" id = "AP_SSD_Warning">*SSD không được để trống</p>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="card">Card</label>\n'+
'                            <input type="text" id="card" oninput = "checkInput(6)">\n'+
'                            <p class="AP_Warning" id = "AP_CARD_Warning">*card không được để trống</p>\n'+
'                        </div>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="description">Mô tả</label>\n'+
'                        <input type="text" id="description" oninput = "checkInput(7)">\n'+
'                         <p class="AP_Warning" id = "AP_DESCRIPTION_Warning">*Mô tả không được để trống</p>\n'+
'                    </div>\n'+
'                    <div class="AP_Button_Div">\n'+
'                        <button class="AP_button" onclick="return TaoSanPham()">Thêm sản phẩm</button>\n'+
'                    </div>\n'+
'                </div>\n'+
'            </div>';

}

function FixProducts_Container(){
    return '<div class="FixProducts_Header">\n'+          //Phan nay hien thi truc tiep
'                <ul class="AP_HeaderList">\n'+
'                    <li class = "Fix_Title"> QUẢN LÝ SẢN PHẨM </li>\n'+
'                    <li><a href="#" id="Tao_SP" onclick = "DivThemSanPham()" >Thêm</a></li>\n'+
'                </ul>\n'+
'            </div>\n'+

' <div class = "Container_FixProducts"> ' +
'           <div class = "Products_box Products_box_title">\n'+
'                    <div class="FixProduct_id">\n'+
'                        <span>  ID   </span>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_img">\n'+
'                        Hình ảnh \n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_name">\n'+
'                        <p> Tên sản phẩm </p>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_brand">\n'+
'                        <p> Hãng máy </p>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_price">\n'+
'                        <span> Giá tiền </span>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="ChiTiet FixProduct_ram"> <span> RAM </span> </div>\n'+
'                    <div class="ChiTiet FixProduct_ssd"> <span> SSD</span> </div>\n'+
'                    <div class="ChiTiet FixProduct_card"> <span> CARD </span> </div>\n'+
'                    <div class="ChiTiet FixProduct_location"> <span> Vị trí </span> </div>\n'+
'                    \n'+
'                    <div class="HD">\n'+
'                        Sửa\n'+
'                    </div>\n'+
'\n'+
'                    <div class="HD">\n'+
'                        Xóa\n'+
'                    </div>\n'+
'                    <div class="HD1">\n'+
'                         Thao tác\n'+
'                    </div>\n'+
'                </div>' +
'  </div>  ' +
'\n'+        //Phan nay duoc load tu javascript
'            <div class = "Container_FixProducts" id = "FixProducts_Main">\n'+
'                \n'+
'            </div>\n'+
'\n'+
'            <div class="FixProducts_Footer" id = "FixProducts__Footer">\n'+
'                <div class="FixProduct_Paging">\n'+
'                     <a href ="#" class="FixProduct_page" id = "FixProduct_page_1" onclick="Fix_Page_1()"> 1 </a></li>\n'+
'                     <a href ="#" class="FixProduct_page" id = "FixProduct_page_2" onclick="Fix_Page_2()"> 2 </a></li>\n'+
'                </div>\n'+
'            </div>' + 
'           <div class="Modal" id = "Modal_fix_products">' +
'               <div class="Modal_overlay"></div>' +
'               <div class="Modal_body">' +
'            <div class="Modal_inner" id = "Modal_fix_products__inner">';
}


//------------------------> //


//Các hàm hiển thị : 
//<---------------------------------------------------------------------    //
function DivThemSanPham(){
   NodeContainer.innerHTML =  SettingProducts_Container()
}

var NodeFixMain, NodeFixFooter, NodeBtn_1, NodeBtn_2;

function DivDSSanPham() {
    NodeContainer.innerHTML = FixProducts_Container(); // Chèn HTML động vào container

    // Lấy lại các phần tử sau khi HTML đã được chèn vào DOM
    NodeFixMain = document.getElementById('FixProducts_Main');
    NodeFixFooter = document.getElementById('FixProducts__Footer');
    NodeBtn_1 = document.getElementById('FixProduct_page_1');
    NodeBtn_2 = document.getElementById('FixProduct_page_2');

    // if (!NodeFixMain || !NodeFixFooter) {
    //     console.error("NodeFixMain / NodeFixFooter không tồn tại !");
    //     return;
    // }

    TrangSanPham(); // Gọi hàm hiển thị sản phẩm và phân trang
}

// -------------------------------------------------> //



function PriceToString (price ){
    console.log(price)
    price = parseInt(price);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const formattedPrice = formatter.format(price);
    return  formattedPrice;
}


function ChuyenSanPhamSangHTML (SanPham){
    var html = '<div class = "Products_box">\n'+
'                    <div class="FixProduct_id">\n'+
'                        <span> '+ SanPham.id + ' </span>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_img">\n'+
'                        <img src=" '+ SanPham.image + '">\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_name">\n'+
'                        <p>'+ SanPham.name + '</p>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_brand">\n'+
'                        <p>'+ SanPham.kind + '</p>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_price">\n'+
'                        <span> '+ PriceToString(SanPham.price) + '</span>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="ChiTiet FixProduct_ram"> <span> '+ SanPham.ram + ' </span> </div>\n'+
'                    <div class="ChiTiet FixProduct_ssd"> <span> '+ SanPham.ssd + '</span> </div>\n'+
'                    <div class="ChiTiet FixProduct_card"> <span> '+ SanPham.card + '</span> </div>\n'+
'                    <div class="ChiTiet FixProduct_location"> <span> '+ SanPham.location+ '</span> </div>\n'+
'                    \n'+
'                    <div class="Hanh-Dong" onclick = "DivSuaSanPham('+ SanPham.id+ ')">\n'+
'                        <i class="fa-solid fa-wrench"> </i>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="Hanh-Dong" onclick = "XoaSanPham('+SanPham.id +')">\n'+
'                        <i class="fa-solid fa-trash"> </i>\n'+
'                    </div>\n'+
'                </div>';
    
    return html;
}


function ChuyenDanhSachThanhHTML (DSSP, page ){
    var html = ''
    var StartIndex = (page-1)*ProductsPerPage;
    var EndIndex = Math.min(StartIndex + ProductsPerPage, DSSP.length);

    for (var i = StartIndex ; i < EndIndex ; i++ )
        html += ChuyenSanPhamSangHTML(DSSP[i]);

    return html
}



//Trang 1
function Fix_Page_1(){
    NodeBtn_1.classList.add('active');
    NodeBtn_2.classList.remove('active');
    var html = ChuyenDanhSachThanhHTML(DSSP,1)
    NodeFixMain.innerHTML = html;
}

//Trang 2
function Fix_Page_2(){
    NodeBtn_2.classList.add('active');
    NodeBtn_1.classList.remove('active')
    var html = ChuyenDanhSachThanhHTML(DSSP,2)
    NodeFixMain.innerHTML = html;
}


//Hien thị lựa chọn trang nếu trong danh sách có hơn 10 phần tử. Nếu không thì ẩn.

function TrangSanPham() {
    if (DSSP.length <= 10) {
        NodeFixFooter.style.display = 'none'; // Ẩn footer
        // Hiển thị tất cả sản phẩm trong 1 trang
        NodeFixMain.innerHTML = ChuyenDanhSachThanhHTML(DSSP, 1);
    } else {
        NodeFixFooter.style.display = 'flex'; // Hiển thị footer nếu có nhiều hơn 10 sản phẩm
        Fix_Page_1(); // Chuyển về trang 1
    }
}

function XoaSanPham(idSanPham){
    if (confirm("Bạn muốn xóa sản phẩm?")== false)
        return
    else
    {
        DSSP = DSSP.filter(function(item){
            return String(item.id) !== String(idSanPham);
        });

        var DSSP_JSON = JSON.stringify(DSSP);
        localStorage.setItem('products',DSSP_JSON);
    }
    TrangSanPham();
}


var NodeModalFix = document.getElementById('Modal_fix_products')
var NodeModalInner = document.getElementById('Modal_fix_products__inner')

function DivSuaSanPham(idSanPham){
    var Fix_SanPham;
    for ( var i = 0 ; i < DSSP.length ;i++){
        if (DSSP[i].id == idSanPham){
            Fix_SanPham = DSSP[i];
            break;
        }
    }

    NodeModalFix.style.display = 'flex';
    NodeModalInner.innerHTML = '            <a href="#" class="Modal_fix_exit" onclick = "Exit_FixingProduct()">X</a>' +
'            <div class="Modal_fix_header">SỬA SẢN PHẨM</div>' +
'            <div class="div_img_file">' +
'                <div>' +
'                    <label for="fix_hinhAnh">Hình ảnh</label>' +
'                    <input type="file" id="fix_hinhAnh" accept="image/*" onchange="previewImage()">' +

'                </div>' +
'               <div class="img_preview">' +
'                   <img id="imagePreview" alt="Preview" src="'+ Fix_SanPham.image+'" />'+
'                   <p class="AP_Warning" id="AP_IMG_Warning">*Hình ảnh không được để trống</p>' +
'               </div>' +
'         </div>' +
'            <div>' +
'                <label for="fix_kind">Hãng máy</label>' +
'           <select id="fix_kind">' +
'               <option value="Acer" ' + (Fix_SanPham.kind === 'Acer' ? 'selected' : '') + '>Acer</option>' +
'               <option value="Lenovo" ' + (Fix_SanPham.kind === 'Lenovo' ? 'selected' : '') + '>Lenovo</option>' +
'               <option value="MSI" ' + (Fix_SanPham.kind === 'MSI' ? 'selected' : '') + '>MSI</option>' +
'           </select>' +

'            </div>' +
'            <div>' +
'                <label for="fix_name">Tên sản phẩm</label>' +
'                <input type="text" id="fix_name" oninput = "checkInput(1)" value = "'+ Fix_SanPham.name+'">' +
'                <p class="AP_Warning" id="AP_NAME_Warning">*Tên sản phẩm không được để trống</p>' +
'            </div>' +
'            <div>' +
'                <label for="fix_price">Giá tiền</label>' +
'                <input type="number" id="fix_price" oninput = "checkInput(2)" value = "'+ Fix_SanPham.price+ '"> ' +
'                <p class="AP_Warning" id="AP_PRICE1_Warning">*Giá tiền phẩm không được để trống</p>' +
'                <p class="AP_Warning" id="AP_PRICE2_Warning">*Giá tiền sản phẩm phải trên 9.000.000đ</p>' +
'            </div>' +
'            <div class="ChiTietSP">' +
'                <div>' +
'                    <label for="fix_location">Vị trí</label>' +
'                    <input type="text" id="fix_location" oninput = "checkInput(3)" value = "'+ Fix_SanPham.location+'">' +
'                    <p class="AP_Warning" id="AP_LOCATION_Warning">*Vị trí không được để trống</p>' +
'                </div>' +
'                <div>' +
'                    <label for="fix_id">ID</label>' +
'                    <input type="text" id="fix_id" value="'+Fix_SanPham.id+'" readonly>' +
'                </div>' +
'                <div>' +
'                    <label for="fix_ram">Ram</label>' +
'                    <input type="text" id="fix_ram" oninput = "checkInput(4)" value = "'+ Fix_SanPham.ram+'" > ' +
'                    <p class="AP_Warning" id="AP_RAM_Warning">*Ram không được để trống</p>' +
'                </div>' +
'                <div>' +
'                    <label for="fix_ssd">SSD</label>' +
'                    <input type="text" id="fix_ssd" oninput = "checkInput(5)" value = "'+ Fix_SanPham.ssd+'">' +
'                    <p class="AP_Warning" id="AP_SSD_Warning">*SSD không được để trống</p>' +
'                </div>' +
'                <div>' +
'                    <label for="fix_card">Card</label>' +
'                    <input type="text" id="fix_card" oninput = "checkInput(6)" value = "'+ Fix_SanPham.card+'">' +
'                    <p class="AP_Warning" id="AP_CARD_Warning">*Card không được để trống</p>' +
'                </div>' +
'            </div>' +
'            <div>' +
'                <label for="fix_description">Mô tả</label>' +
'                <input type="text" id="fix_description" oninput = "checkInput(7)" value = "'+ Fix_SanPham.description +'">' +
'                <p class="AP_Warning" id="AP_DESCRIPTION_Warning">*Mô tả không được để trống</p>' +
'            </div>' +
'            <div class="AP_Button_Div">' +
'                <button class="AP_button" onclick="return SuaSanPham('+idSanPham+')">Sửa sản phẩm</button>' +
'            </div>'
}

function SuaSanPham(idSanPham){
    var NodeHinhAnh = document.getElementById("fix_hinhAnh");
    var NodeBrand = document.getElementById("fix_kind");
    var NodeTen = document.getElementById("fix_name");
    var NodeGiaTien = document.getElementById("fix_price");
    var NodeViTri = document.getElementById("fix_location");
    var NodeRam = document.getElementById("fix_ram");
    var NodeSSD = document.getElementById("fix_ssd");
    var NodeCard = document.getElementById("fix_card");
    var NodeMoTa = document.getElementById("fix_description");
    
    if (NodeTen.value == ''){
        document.getElementById('AP_NAME_Warning').style.display ='block';
        NodeTen.focus()
        return false
    }
    else{
        document.getElementById('AP_NAME_Warning').style.display ='none';
    }

    if (NodeGiaTien.value == ''){
        document.getElementById('AP_PRICE1_Warning').style.display ='block';
        NodeGiaTien.focus()
        return false
    }
    else
        document.getElementById('AP_PRICE1_Warning').style.display ='none';

    
    if (NodeGiaTien.value < 9000000){
        document.getElementById('AP_PRICE2_Warning').style.display ='block';
        NodeGiaTien.focus()
        return false
    }
    else
        document.getElementById('AP_PRICE2_Warning').style.display ='none';
    

    if (NodeViTri.value == ''){
        document.getElementById('AP_LOCATION_Warning').style.display ='block';
        NodeViTri.focus()
        return false
    }
    else
        document.getElementById('AP_LOCATION_Warning').style.display ='none';


    if (NodeRam.value == ''){
        document.getElementById('AP_RAM_Warning').style.display ='block';
        NodeRam.focus()
        return false
    }
    else
        document.getElementById('AP_RAM_Warning').style.display ='none';

    if (NodeSSD.value == ''){
        document.getElementById('AP_SSD_Warning').style.display ='block';
        NodeSSD.focus()
        return false
    }
    else
        document.getElementById('AP_SSD_Warning').style.display ='none';

    if (NodeCard.value == ''){
        document.getElementById('AP_CARD_Warning').style.display ='block';
        NodeCard.focus()
        return false
    }
    else
        document.getElementById('AP_CARD_Warning').style.display ='none';

    if (NodeMoTa.value == ''){
        document.getElementById('AP_DESCRIPTION_Warning').style.display ='block';
        NodeMoTa.focus()
        return false
    }
    else
        document.getElementById('AP_DESCRIPTION_Warning').style.display ='none';

        console.log("idSanPham:", idSanPham);
        console.log("Danh sách sản phẩm:", DSSP);

    var Brand = NodeBrand.value
    var Ten = NodeTen.value
    var GiaTien = NodeGiaTien.value
    var ViTri = NodeViTri.value
    var Ram = NodeRam.value
    var SSD = NodeSSD.value
    var Card = NodeCard.value
    var MoTa = NodeMoTa.value

    for (var i = 0 ; i < DSSP.length ; i++ ){
        if(DSSP[i].id == idSanPham){
            DSSP[i].kind = Brand;
            DSSP[i].name = Ten;
            DSSP[i].price = GiaTien;
            DSSP[i].location = ViTri;
            DSSP[i].ram = Ram;
            DSSP[i].ssd = SSD;
            DSSP[i].card = Card;
            DSSP[i].description = MoTa;
            if (NodeHinhAnh.files.length !== 0) {
                const fr = new FileReader();
                fr.readAsDataURL(NodeHinhAnh.files[0]) 
                fr.addEventListener('load', () => {
                    const url = fr.result
                    DSSP[i].image = url;
                    localStorage.setItem('products', JSON.stringify(DSSP));
                        DivDSSanPham();
                        DivSuaSanPham(idSanPham);
                });   
                break;
            }
            else {
                localStorage.setItem('products', JSON.stringify(DSSP));
                DivDSSanPham();
                DivSuaSanPham(idSanPham);
                break;
            }
        }

    }
    

    alert("Đã sửa");

}

function Exit_FixingProduct(){
    NodeModalFix.style.display ='none';
}


function previewImage() {
    const fileInput = document.getElementById('fix_hinhAnh');
    const preview = document.getElementById('imagePreview');
    const warning = document.getElementById('AP_IMG_Warning');

    // Hide any previous warning and image preview
    preview.style.display = 'none';
    warning.style.display = 'none';

    const file = fileInput.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result; // Set the image source to the file data
            preview.style.display = 'block'; // Show the image preview
        };
        reader.readAsDataURL(file); // Read the file as data URL
    } else {
        warning.style.display = 'block'; // Show warning if no file is selected
    }
}


function checkInput(x){
    
    switch (x){
        case 1 :
            document.getElementById('AP_NAME_Warning').style.display ='none';
            break;
        
        case 2 :
            document.getElementById('AP_PRICE1_Warning').style.display ='none';
            document.getElementById('AP_PRICE2_Warning').style.display ='none';
            break;

        case 3 :    
            document.getElementById('AP_LOCATION_Warning').style.display ='none';    
            break;

        case 4 : 
            document.getElementById('AP_RAM_Warning').style.display ='none';
            break;

        case 5 :     
            document.getElementById('AP_SSD_Warning').style.display ='none';
            break;

        case 6 :
            document.getElementById('AP_CARD_Warning').style.display ='none';    
            break;
        
        case 7 :
            document.getElementById('AP_DESCRIPTION_Warning').style.display ='none';
            break;    
    
    }
}
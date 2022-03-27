
function CgetItem(key){

    var name = key + "=",

    cookie_array = document.cookie.split(';'),
   
    cookie_value;
   
   for(var i=0;i<cookie_array.length;i++) {
    var cookie=cookie_array[i];
    while(cookie.charAt(0)==' ')
    cookie = cookie.substring(1,cookie.length);
    if(cookie.indexOf(name)==0)
    cookie_value = cookie.substring(name.length,cookie.length);
    }
    return cookie_value;
   
}


if(!document.cookie){
    let order = {
        items:{},
        tqnt:0,
        totalp:0
    }
    document.cookie = `order=${JSON.stringify(order)}`;
}


let empyty = document.querySelector('.empyty');
let cartItems = document.querySelector('.cart-items');

let localTqnt =JSON.parse(CgetItem('order')).tqnt;


if(localTqnt == 0){
    cartItems.style.display = 'none';
}else{
    empyty.style.display = 'none';
}



function clearloc(){
    alert('clear cart')
    cartItems.style.display = 'none';
    empyty.style.display = 'flex';
    let order = {
        items:{},
        tqnt:0,
        totalp:0
    }
    document.cookie=`order=${JSON.stringify(order)}`;
}



// add items in list
let itemsList = document.querySelector('.items-list');
let totalPrice = document.querySelector('#totalPrice');
let dataf = document.querySelector('#dataF')

let dataj = CgetItem("order");
dataf.values = dataj;
let data = JSON.parse(dataj);
totalPrice.innerHTML = data.totalp + 10;

let a = Object.values(data.items);
for(let item of a){
    let text = `<div class="item">
    <h1>${item.name}</h1>
    <span>${item.qnt}ps</span>
    <h2>${item.price}tk</h2>
  </div>`
  itemsList.innerHTML += text;
    console.log(item);
}
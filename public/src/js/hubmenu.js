let sell = document.querySelectorAll('.ordwer-status');
const list = document.querySelector('.order-list');

async function senddata (id,value){
    const he = {
        'Content-type':'application/json'
    };
    const bo = {
        id,
        ststus: value
    }
   let data = await fetch('/n-com/setstatus',{
       method : 'POST',
       headers:he,
       body:JSON.stringify(bo)
   });
   let text =  await data.text();
   console.log(text);
}

function initAjax(){
    sell.forEach((sellc)=>{
        sellc.addEventListener('change',(e)=>{
            let id = e.target.dataset.id;
            let valu = e.target.value;
            senddata(id,valu);
        });
        
    });
};
initAjax()

function genaretitem(data){
    let item = Object.entries(data.items.items);
    const itemsw =  item.map((it)=>{
        return `
        <div class="si">
          <span>
            ${ it[1].name}
          </span>
          <span>${it[1].qnt} ps</span>
        </div>`
    }).join();
    return itemsw;
}

function genrethtml(order){
    let itc = genaretitem(order);
    let nameq;
    if(order.customerId){
        nameq = order.customerId.name;
    }else{
        nameq ='wrong';
    }
    return `<div class="item">
    <div class="user-details">
      <h4>${order._id}</h4>
      
      <p>${nameq}</p>
      <p>${order.phone}</p>
      <p>${order.address}:${order.zone}</p>
    </div>
    <div class="order-item">
     ${itc};
    </div>
    <div class="conferm">
      <h2>tottal:${order.items.totalp} tk</h2>
      <select name="order-status" data-id="${order._id}" class="ordwer-status">

        <option ${order.status == "order placed" ? "selected":'' } value="order placed">order placed</option>
        <option ${order.status=="conferm" ? "selected":'' } value="conferm">conferm</option>
        <option ${order.status == "deliverd" ? "selected":''} value="deliverd">deliverd</option>
        <option ${order.status == "complete" ? "selected":''} value="complete">complet</option>
        <option ${order.status == "cencel" ? "selected":''} value="cencel">cencel</option>
      </select>
    </div>
  </div>`
}

let socket = io();

socket.emit("join", "admin");

socket.on('orderPlaced',(data)=>{
    alert('new order');
    // let setsey =  genrethtml(data)
    list.insertAdjacentHTML("afterbegin", genrethtml(data));    
    sell = document.querySelectorAll('.ordwer-status');    
    initAjax()
})
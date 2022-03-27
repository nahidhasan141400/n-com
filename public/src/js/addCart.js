
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

if(!CgetItem('order')){
    let order = {
        items:{},
        tqnt:0,
        totalp:0
    }
    document.cookie =`order=${JSON.stringify(order)}`
    
}


 console.log(JSON.parse(CgetItem('order')));











// btn click Event
let btns = document.querySelectorAll('.p-btn');
// cart count update 
 let tcn = JSON.parse(CgetItem('order')).tqnt;
let tc = document.querySelector('#tc');
function utc (nu){
    tc.innerHTML = nu;
}
utc(tcn)

btns.forEach( (btn)=>{
    btn.addEventListener('click',(e)=>{
        let jsond = btn.dataset.item;
        let data = JSON.parse(jsond);


        // get data form localStorage
        let lsj =  CgetItem('order');
        let lsd =  JSON.parse(lsj);

        // check iems alredy have
        if(lsd.items[data._id]){
            lsd.items[data._id].qnt += 1;
            lsd.items[data._id].price += data.price;
            lsd.totalp += data.price;
            lsd.tqnt += 1;
            utc(lsd.tqnt)
            document.cookie=`order=${JSON.stringify(lsd)}`;
        }else{
            let obj = {
                name:data.name,
                price:data.price,
                qnt : 1
            }
            lsd.items[data._id]=obj;
            lsd.totalp += data.price;
            lsd.tqnt += 1;
            utc(lsd.tqnt)
            document.cookie=`order=${JSON.stringify(lsd)}`;
                }
                
            
    })
})

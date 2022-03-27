const route = require('express').Router();
const menu = require('../resources/controler/menuCon');
const account = require('../resources/controler/accountCon');
// midelware 
const auth = require('../resources/midelware/auth');
// user
route.get('/menu',auth().user,menu().getMenu);
route.get('/cart',auth().user,(req,res)=>{
    res.render('cart')
});
route.get('/details',auth().user,account().details)
route.get('/account',auth().user,account().get)

// user reg
const user = require('../resources/controler/hub/userregCon');
const hublogin = require('../resources/controler/hub/loginCon');
const hubOreder = require('../resources/controler/hub/hubOrederCon');
const hubmenu = require('../resources/controler/hub/hubmenuCon');
// admin

route.get('/n-com/logout',hublogin().hublogout);
route.get('/n-com/login',hublogin().get);
route.post('/n-com/hublogin',hublogin().post);
// user
route.get('/n-com/userreg',hublogin().auth,user().getUserreg);
route.post('/n-com/userreg',hublogin().auth,user().postUserreg);
route.get('/n-com/alluser',hublogin().auth,user().alluser);
route.post('/n-com/serchUser',hublogin().auth,user().searchuser);
route.get('/n-com/user/delete/:id',hublogin().auth,user().deleteuser);
// order 
route.get('/n-com/order',hublogin().auth,hubOreder().get);
route.post('/n-com/setstatus',hublogin().auth,hubOreder().setstatus);
// menu
route.get('/n-com/addpro',hublogin().auth,hubmenu().addpro);
route.post('/n-com/addpro',hublogin().auth,hubmenu().postaddpro);
route.get('/n-com/menu',hublogin().auth,hubOreder().get);
// route.get('/n-com/menu',hublogin().auth,hubmenu().get);
route.post('/n-com/pro/update',hublogin().auth,hubmenu().postupdatepro);
// menu param 
route.get('/n-com/pro/status/:id',hublogin().auth,hubmenu().status)
route.get('/n-com/pro/delete/:id',hublogin().auth,hubmenu().delete)
route.get('/n-com/pro/update/:id',hublogin().auth,hubmenu().getupdate)


// user login
const login = require('../resources/controler/loginCon');
route.get('/login',auth().gust,login().getLogin);
route.get('/logout',login().getLogout);
route.post('/login',auth().gust,login().postLogin);
// change pass user
route.get('/setting',auth().user,login().getcpassuser);
route.post('/cpassuser',auth().user,login().postcpassuser);
// order
const order = require('../resources/controler/orderCon'); 
route.post('/order',auth().user,order().post);
route.get('/order',auth().user,order().getOrder);


module.exports = route;
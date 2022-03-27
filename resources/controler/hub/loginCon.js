const Hub = require("../../models/hub");
const ncrip = require('ncrip');

function hublogin(){
    return {
        get(req,res){
            res.render('./hub/hublogin');
        },
        hublogout(req,res){
            res.cookie("huboffer","");
            res.cookie("hubloc","");
            res.render('./hub/hublogin');
        },
        async post(req,res){
            let {number,password} = req.body; 
            if(!number || !password){
                return res.render('./hub/hublogin');
            };
            try {
                let data = await Hub.findOne({roll:"admin"});
                let hash = ncrip.enc(password,1234);
                if(hash===data.password && number===data.number){
                    let key = ncrip.enc(data._id,1234);
                    res.cookie("huboffer",key);
                    res.cookie("hubloc",1234);
                    return res.redirect('/n-com/order')
                }else{
                    return res.render('./hub/hublogin');
                }
            } catch (error) {
               return res.render('./hub/hublogin');
            }
            
        },
        async auth(req,res,next){
            const {huboffer, hubloc}=req.cookies;
            if(!huboffer || !hubloc){
                return res.redirect('/n-com/login');
            }
            let id = ncrip.dnc(huboffer,hubloc);
            try {
                let data = await Hub.findOne({roll:"admin"});
                if(id.toString() === data._id.toString()){
                    return next();
                };
                return res.send('data not macth!')
            } catch (error) {
                res.send(error);
            }
        }
    }
}

module.exports = hublogin;
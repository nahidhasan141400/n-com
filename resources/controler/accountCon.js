const User = require('../models/user');
const ncrip = require('ncrip');

function account (){
    return{
        async get(req,res){
            const {offer, loc}=req.cookies;
            if(offer||loc){
                let key = ncrip.dnc(offer,loc);
                    try {
                        let user = await User.findOne({_id:key});
                        return res.render('account',{name:user.name,number:user.number});
                    } catch (error) {
                        res.redirect('/login'); 
                    }
            }else{
              return  res.redirect('/login'); 
            }
        },
        async details(req,res){
            const {offer, loc}=req.cookies;
            if(offer||loc){
                let key = ncrip.dnc(offer,loc);
                        
                    try {
                        let user = await User.findOne({_id:key});
                        return res.render('details',{
                            name:user.name,
                            number:user.number,
                            address:user.address,
                            zone:user.zone,
                            ref:user.ref
                        });
                    } catch (error) {
                        res.redirect('/login'); 
                    }
            }else{
              return  res.redirect('/login'); 
            }
        }
    }
}
module.exports = account;
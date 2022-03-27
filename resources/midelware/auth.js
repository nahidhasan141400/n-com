const User = require('../models/user');
const ncrip = require('ncrip');

function auth (){
    return {
        async user(req,res,next){
            const {offer, loc}=req.cookies;
            if(offer||loc){

                let key = ncrip.dnc(offer,loc);
                        try {
                        let user = await User.findOne({_id:key});
                        if (user) {
                            return next()
                        }else{
                            return res.redirect('/logout'); 
                        }

                        
                        
                    } catch (error) {
                        res.redirect('/logout'); 
                    }
            }else{
              return  res.redirect('/logout'); 
            }
        },
        async gust(req,res,next){
            const {offer, loc}=req.cookies;
            if(offer||loc){
                let key = ncrip.dnc(offer,loc);
                    try {
                        let user = await User.findOne({_id:key});
                         if (user) {
                            return res.redirect('/menu');
                        }else{
                            return next()
                        }

                    } catch (error) {
                        next()
                    }
            }else{
              return   next()
            }
        }

    }
}

module.exports = auth;
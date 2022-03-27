const User =  require('../models/user');
const ncrip = require('ncrip');

function login (){
    return{
        getLogin(req,res){
            res.render('login',{msg:''})
        },

        async postLogin(req,res){
            const {number , password}=req.body;
            const pw = ncrip.enc(password,1234);

            try {
                let user = await User.findOne({number:number});
               
                if(user.password === pw){
                    let key = ncrip.enc(user._id,1234);
                    res.cookie("offer",key);
                    res.cookie("loc",1234);
                    res.redirect('/menu');
                }else{
                    res.render('login',{msg:'some thing is wrong'})
                }
            } catch (error) {
                
             return res.render('login',{msg:'some things is wrong!'})  
            }

        },
        getLogout(req,res){
            res.cookie('offer','');
            res.cookie('loc','');
            res.redirect('/login');
        },
        getcpassuser(req,res){
            res.render('setting',{msg:''})
        },
        async postcpassuser(req,res){
            
            const {npass , password}=req.body;

            if(!npass||!password){
                return res.render('setting',{msg:"all filds are require"})
            }
            const {offer, loc}=req.cookies;
            const pw = ncrip.enc(password,1234);
            const key = ncrip.dnc(offer,loc);
            const npassC =  ncrip.enc(npass,1234)

            try {
                let user = await User.findOne({_id:key});
                if(user.password === pw){
                    User.updateOne({_id: key},{password:npassC}).then((result) => {
                        res.redirect('/logout')
                    }).catch((err) => {
                        res.render('setting',{msg:'some thing is wrong'});
                    });
                }else{
                    res.render('setting',{msg:'some thing is wrong'})
                }
            } catch (error) {
             return res.render('setting',{msg:'some things is wrong!'})  
            }

        }
    }
}
module.exports = login;
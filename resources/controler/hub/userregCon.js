const mongoose = require('mongoose');
const ncrip = require('ncrip');
const User = require('../../models/user');

function user(){
    return {
        async getUserreg(req,res){
           res.render('./hub/userreg',{msg:""})
        },
        async postUserreg(req,res){
            
            const pw = ncrip.enc(req.body.password,1234);
            const {name,number,address,zone,refrench} = req.body;
            

            if(!name || !number || !address || !zone || !refrench){
                    res.render('./hub/userreg',{msg:'all filds are required'})
            }else{
                    const userown = new User({
                        name,
                    number,
                    address,
                    zone,
                    ref:refrench,
                    password:pw
                    });
                    userown.save().then(() => {

                        res.render('./hub/userreg',{msg:'register sucsses'})
                    }).catch((err) => {
                        res.send(err)
                        
                    });
             }
        },
        async alluser(req,res){
            try {
                const data = await User.find().skip(0).limit(20);
                return res.render('./hub/alluser',{data});
            } catch (error) {
               return  res.send(error);
            }
        },
        async searchuser(req,res){
            try {
                let data = await User.find({number:req.body.number});
                res.render('./hub/alluser',{data});
            } catch (error) {
                res.send(error);
            }
        },
        deleteuser(req,res){
            let id = req.params.id;
            User.deleteOne({_id:id},(err)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect('/n-com/alluser')
                }
            })
        }
    }
}


module.exports = user;


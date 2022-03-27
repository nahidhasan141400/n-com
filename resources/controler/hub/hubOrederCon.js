let Order = require('../../models/order');
let Menu = require('../../models/menu');

function hubOreder(){
    return {get(req,res){
        Menu.find().then((result)=>{
            res.status(200).render('./hub/menubHub',{result});
        }).catch((err)=>{
            res.send(err);
        });
     },
        async get(req,res){
            
            try {
                let data = await Order.find({},null,{ sort: { "createdAt": -1}}).populate('customerId','-password').exec((err,data)=>{
                    if(err){
                        console.log('err1')
                        return res.send(err);
                    };
                    return res.render('./hub/adminOrder',{data});
                });
                
            } catch (error) {
                console.log('err')
                res.send(error)
            }
        },
        setstatus(req,res){
            let {id,ststus}= req.body;
            if(!id || !ststus){
               return res.send({st:"no"});
            };

            if(ststus === 'cencel'){
                Order.deleteOne({_id:id},(err)=>{
                    if(err){
                       return res.send({st:"no"});
                    }else{
                       return res.send({st:"ok"});
                    }
                });
            }else{

                Order.updateOne({_id:id},{$set:{status: ststus}},(err)=>{
                    if(err){
                       return res.send({st:"no"});
                    }else{
                       return res.send({st:"ok"});
                    }
                });
            }

        }
    }
}
module.exports =hubOreder;
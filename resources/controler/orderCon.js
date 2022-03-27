const Order = require('../models/order');
const User = require('../models/user');
const ncrip = require('ncrip');

function order(){
    return {
        async post(req,res){
            const jsonitem = req.cookies.order;
            const {offer,loc} = req.cookies;
            const {phone,address,zone}=req.body;

            if(!jsonitem||!offer||!loc||!phone){
                return res.redirect("/cart");
            }

            const key = ncrip.dnc(offer,loc);
            const item = JSON.parse(jsonitem);
             if(!address||!zone){
               try {
                    const user = await User.findOne({_id:key});
                    const neworder = new Order({
                        customerId:key,
                        items:item,
                        phone:phone,
                        address:user.address,
                        zone:user.zone
                    });
                    neworder.save().then((result) => {
                        Order.populate(result,{path: 'customerId'},(err,resl)=>{
                            if(err){
                                return res.send('sorry some server site eror or you are not user login perfectly!')
                            }
                            
                            const eventEmitter = req.app.get('eventEmitter')
                            eventEmitter.emit('orderPlaced', resl)
                            res.cookie("order","")
                            return res.redirect('/menu');

                        })


                    }).catch((err) => {
                        return res.redirect('/cart');
                    });
               } catch (error) {
                    return res.redirect('/cart');
               }
               
             }else{
                const neworder = new Order({
                    customerId:key,
                    items:item,
                    phone:phone,
                    address:address,
                    zone:zone
                });
                
                neworder.save().then((result) => {
                    res.cookie("order","")
                    return res.redirect('/menu');
                }).catch((err) => {
                    return res.redirect('/cart');
                });
             }

             
        },
    
       async getOrder(req,res){
            const {offer,loc} = req.cookies;
            if(!offer||!loc){
                return res.redirect("/logout");
            }
            const key = ncrip.dnc(offer,loc);
            try {
                const data = await Order.find({customerId:key});
                res.render("order",{data});
            } catch (error) {
                res.send(error)
            }


       } 
    }
}

module.exports = order;


// let temp= {
//    // "_id" : ObjectId("495bd31c3111520ea0fc876a"),
//     "status" : "order placed",
//     "customerId" : ObjectId("495bca526c30ef0cb08d1c35"),
//     "items" : {
//             "items" : {
//                     "495bb958a870c5169310e9e3" : {
//                             "name" : "hot pizza",
//                             "price" : 900,
//                             "qnt" : 3
//                     },
//                     "495bb9c5a870c5169310e9e5" : {
//                             "name" : "vegitable pizza",
//                             "price" : 900,
//                             "qnt" : 3
//                     },
//                     "495bc068a870c5169310e9e7" : {
//                             "name" : "à¦®à§à¦à§à¦²à¦¾à¦",
//                             "price" : 200,
//                             "qnt" : 1
//                     }
//             },
//             "tqnt" : 7,
//             "totalp" : 2000
//     },
//     "phone" : "01741013363",
//     "address" : "hapaniya",
//     "zone" : "1",
//     "createdAt" : ISODate("2008-12-31T20:16:28.316Z"),
//     "updatedAt" : ISODate("2008-12-31T20:16:28.316Z"),
//     "__v" : 0
// }



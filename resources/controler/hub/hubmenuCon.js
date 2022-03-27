const Menu = require('../../models/menu');

function hubmenu (){
 return {
     get(req,res){
        Menu.find().then((result)=>{
            res.render('./hub/adminOrder',{});
        }).catch((err)=>{
            res.send(err);
        });
     },
     async status(req,res){
         try {
            let id = req.params.id;
            let pro = await Menu.findOne({_id: id});
            let st;
            pro.active? st= false: st=true;
            
            await Menu.updateOne({_id:id},{$set:{active:st}},(err)=>{
              if(err){
                  res.send(err)
              }else{
                  res.redirect('/n-com/menu')
              }
            })

         } catch (error) {
             console.log(error);
             res.redirect('/n-com/login')
         }
       
     },
     async delete(req,res){
         try {
            let id = req.params.id;
            Menu.deleteOne({_id:id},(err)=>{
                if(err){
                   return res.send(err);
                }else{
                   return res.redirect('/n-com/menu')
                }
            });

         } catch (error) {
             console.log(error);
             res.redirect('/n-com/menu')
         }
       
     },
     addpro(req,res){
         res.render('./hub/addpro')
     },
     postaddpro(req,res){
         let {name ,price ,img}= req.body;
         if(!name || !price || !img){
             return res.redirect('/n-com/addpro');
         };
         let addmenu =  new Menu({
            name,
            price,
            img
         })
         addmenu.save().then((result) => {
            res.redirect('/n-com/menu')
         }).catch((err) => {
            return res.send(err);
         });
          
     },
     async getupdate(req,res){
         let id = req.params.id;
         try {
            let pro = await Menu.findOne({_id:id});
            res.render('./hub/updatepro',{pro})
         } catch (error) {
             console.log(error)
         }
         
     },
     postupdatepro(req,res){
         let {id,name,price,img} = req.body;
         Menu.updateOne({_id:id},{$set:{name,price,img}},(err)=>{
             if(err){
                 console.log(err);
                 res.send(err);
             }else{
                 res.redirect('/n-com/menu')
             }
         })

     }
 }
};
module.exports = hubmenu;
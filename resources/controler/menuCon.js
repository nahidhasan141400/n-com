const mongoose = require('mongoose');
const Menu = require('../models/menu');

function menu(){
    return {
        async getMenu(req,res){
            const data = await Menu.find({active: true});
           res.render('menu',{data})
        }
    }
}


module.exports = menu;


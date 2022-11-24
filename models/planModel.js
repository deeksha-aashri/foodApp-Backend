const mongoose = require("mongoose");
const { db_link } = require("../secrets");


mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(" plan db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });



  mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,'plan name should not exceed ${this.maxLength} characters']//making custom err we make an arr condition , err.msg

    },
    duration:{
     type:Number,
     required:true,
    },
    price:{
        type:Number,
        required:[true, "price not entered"]
    },
    
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        },'Discount should be less than 100%']//custom error
    },
    ratingsAverage:{
    type:Number
    }
  })


  const planModel=mongoose.model("planModel", planSchema);
  module.exports=planModel;
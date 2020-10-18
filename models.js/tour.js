const mongoose = require("mongoose")
const review = require('../models.js/reviews')
 var tourSchema = mongoose.Schema({
  
    name:{
       type: String,
       required:[true,'must add tour name']
    },
    place:{
        type: String,
        required:[true,'must add tour place']
     },
     members:{
        type: Number,
        required:[true,'must add tour members']
     },
     
    group:{
        type: Number,
        required:[true,'must add tour group']
     },
    startDates:{
        type:Date,
        default:Date.now()
    },
    startLocation:{
    type:{
       type:String,
       default:'Point',
       enum:['Point']
    },
    coordinates:[Number],
    address:String,
    description:String
    }
    ,
   //  locations:[{

   //    type:{
   //       type:String,
   //       default:'Point',
   //       enum:['Point']
   //    },
   //    coordinates:[Number],
   //    address:String,
   //    description:String,
   //    day:Number
   //    }
   //  ]
locations:[
   {
     type:mongoose.Schema.ObjectId,
     ref:'user' 
   }
],
ratingAverage:{
   type:Number,
   default:0
            },
            ratingQuantity:{
               type:Number,
               default:0
                        },

});

tourSchema.set('toObject', { virtuals: true });
tourSchema.set('toJSON', { virtuals: true });


tourSchema.virtual('reviews',{
   ref:'review',
   foreignField:'tour',
   localField:'_id'
});
tourSchema.index({startLocation:'2dsphere'})

const tour= mongoose.model('tour',tourSchema);
module.exports  = tour;
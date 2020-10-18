
const mongoose = require("mongoose")

const TourModel = require('../models.js/tour')
 var reviewSchema = mongoose.Schema({
  
    username:{
       type: String,
       required:[true,'must add username']
    },
    detail:{
        type: String,
        required:[true,'must add review detail ']
     },
     rating:{
      type: Number,
      min:1,
      max:5,
      required:[true,'must add review rating ']
   },
   
     user:
        {
          type:mongoose.Schema.ObjectId,
          ref:'user' 
        },
        tour:{
                  type:mongoose.Schema.ObjectId,
                  ref:'tour' 
         },
        
            
     
})
reviewSchema.statics.calculateAverage = async function(tourId){
   console.log(tourId)
  const stats = await this.aggregate([
      {
         $match:{tour:tourId}
      },{
         $group:{
             _id:'$tour',
             ratingQuantity:{$sum:'1'},
             ratingAverage:{$avg:'$rating'}
     
            }
 }
 
])
console.log(stats)
await TourModel.findByIdAndUpdate(tourId,{
   ratingAverage:stats[0].ratingAverage,
   ratingQuantity:stats[0].ratingQuantity
})

}
// reviewSchema.post('save',function(){
//    this.constructor.calculateAverage(this.tour);
   
// })
module.exports = mongoose.model('review',reviewSchema);
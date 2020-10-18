const Reviews = require('../models.js/reviews')
const Tour = require('../models.js/tour')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
exports.getReviews = async(req,res)=>{
    try {
const reviews = await Reviews.find()
    .populate({
        path:'user',
}).populate({
    path:'tour',
})
.select('-__v')

res.status(201).json({

        review:reviews,
        length:reviews.length
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed No review found',
            message:error
        })
    }
    
}
exports.postReviews = async(req,res)=>{
    //nested routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.params.userId;
    try {
        const newReviews = await Reviews.create(req.body)
   const tourId = req.body.tour
            // console.log(tourId)
           const stats = await Reviews.aggregate([
               {
                  $match:{}
               },{
                  $group:{
                      _id:'$tour',
                      ratingQuantity:{$sum:'1'},
                      ratingAverage:{$avg:'$rating'}
              
                     }
          }
          
         ])
        //  console.log(stats)
         await Tour.findByIdAndUpdate(tourId,{
            ratingAverage:stats[0].ratingAverage,
            ratingQuantity:stats[0].ratingQuantity
         })
         
    res.status(201).json({
        status:'success',
        reviews:stats
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:error
        })
    }
    
        
    }
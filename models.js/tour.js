const mongoose = require("mongoose")

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

//     startCampaign:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'startCampaign',
//     required:true 
// },

})
module.exports = mongoose.model('tour',tourSchema);
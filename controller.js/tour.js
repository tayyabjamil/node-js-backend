const { Query } = require('mongoose')
const Tour = require('../models.js/tour')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
exports.getTourDetail = async(req,res)=>{
    try {
        const newTour = await Tour.findById(req.params.id)
    res.status(201).json({
        status:'success',
        tour:newTour
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:error
        })
    }
    
}
exports.postApiTours = async(req,res)=>{
try {
    const newTour = await Tour.create(req.body)
res.status(201).json({
    status:'success',
    tour:newTour
}) 
} catch (error) {
    res.status(404).json({
        status:'failed',
        message:error
    })
}

    
}
exports.patchApiTours = async(req,res)=>{
    try {
        const newTour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
    res.status(201).json({
        status:'success',
        tour:newTour
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:error
        })
    }
}

exports.deleteApiTours = async(req,res)=>{
    try {
        const newTour = await Tour.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status:'success',
        tour:newTour
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:error  
        })
    }
}
exports.deleteApiTours = async(req,res)=>{
    try {
        const newTour = await Tour.deleteMany()
    res.status(201).json({
        status:'success',
        tour:newTour
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed',
            message:error  
        })
    }
}
exports.filterTour= async(req,res)=>{
    try {
// console.log(req.query)
        const queryObj = { ...req.query};
    //    console.log(queryObj)
       const excludedFields = ['sort','fields']
excludedFields.forEach(el=> delete queryObj[el])
       let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g,match => `$${match}`)
        // console.log(JSON.parse(queryStr))
        let query =  Tour.find(JSON.parse(queryStr))
        
        // console.log(query)
        
        if(req.query.sort){
            query = query.sort(req.query.sort)
            // console.log(query)
        }else{
        //  console.log('no sort')
        }
        if(req.query.fields){
            query = query.select(fields)
        }else{
            query.select('-__v')
        }
        const tours = await query
        // console.log(req.query)
        // console.log(tours)
        res.status(201).json({
            status:'success',
            tour:tours
        }) 
        
      
    } catch (error) {
        res.status(404).json({
            status:'failed no tour found',
            message:error  
        })
    }
}
exports.getApiTours = async(req,res)=>{
    try {
const tours = await Tour.find()
//     .populate({
//         path:'reviews',
       
// }).select('-__v')

res.status(201).json({

        tour:tours,
        length:tours.length
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed No tour found',
            message:error
        })
    }
    
}

exports.getTourStats = async(req,res)=>{
    try {
        const stats = await  Tour.aggregate([
          { 
               $match: { _id: new mongoose.Types.ObjectId('5f89d774da1e3228481bc1d5') }
        },{
                $group:{
                    _id:'$members',
                    avgMembers:{$avg:'$members'},
                    maxGroup:{$max:'$group'}
            }
        }
    ])
    res.status(200).json({

        stats:stats,
      
    }) 
    } catch (error) {
        res.status(404).json({
            status:'failed No tour stats',
            message:error
        })
    }
}
exports.toursWithin =async (req,res,next)=>{
    //destructuring
const {distance,latlng,unit} = req.params;
const [lat,lng]=latlng.split(',')//array of two elements
const radius = unit ==='mi' ? distance /3963.2 : distance /6378.1;
if(!lat||!lng){
    res.status(404).json({
        message:'plese proveide latitude and longitude'
    })
}
// console.log(distance,lat,lng,unit)
const tours = await Tour.find({
    startLocation:{
        $geoWithin:{
            $centerSphere : [
                [lng,lat],
                radius
            ]
        }
    }
})
res.status(201).json({
status:"success",
data:tours,
results:tours.length
})

}
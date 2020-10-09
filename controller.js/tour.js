const { Query } = require('mongoose')
const Tour = require('../models.js/tour')

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
console.log(req.query)
        const queryObj = { ...req.query};
       console.log(queryObj)
       const excludedFields = ['sort','fields']
excludedFields.forEach(el=> delete queryObj[el])
       let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g,match => `$${match}`)
        console.log(JSON.parse(queryStr))
        let query =  Tour.find(JSON.parse(queryStr))
        
        console.log(query)
        
        if(req.query.sort){
            query = query.sort(req.query.sort)
            console.log(query)
        }else{
         console.log('no sort')
        }
        if(req.query.fields){
            query = query.select(fields)
        }else{
            query.select('-__v')
        }
        const tours = await query
        console.log(req.query)
        console.log(tours)
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
if(req.query.sort){
    query = query.sort(req.query.sort)
    console.log(query)
}else{
 console.log('no sort')
}

if(req.query.fields){
    query = query.select('place')
}else{
    console.log("no fields")
}
let tours = await query
console.log(tours)
res.status(200).json({

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
               $match:{  group:{$gte:1}}
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
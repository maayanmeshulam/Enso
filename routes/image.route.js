const express = require('express');
const app = express();

// Express route
const imageExpressRoute = express.Router();

// User schema
let ImageSchema = require('../model/image.model');


// Get images 
imageExpressRoute.route('/image').get((req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 2
    }
    ImageSchema.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({updatedAt: -1})
    .exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })

})

// Create image
// imageExpressRoute.route('/image').post((req, res, next) => {
//     ImageSchema.create(req.body, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// });


// Get single image
imageExpressRoute.route('/image/:imageName').get((req, res) => {
    ImageSchema.findOne({name: req.params.imageName}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update image
// if does not exist, create it
//*************** need to check the required fields ***************
imageExpressRoute.route('/image').put((req, res, next) => {
    ImageSchema.findOneAndUpdate({name: req.body.name}, {$set: req.body}, {upsert: true, runValidators: true, context: 'query'})
    .exec((error, data) => {
        if (error) {
            return next(error);
        } else {
            if (data){
                console.log('Image successfully updated!')
            }
            else {
                console.log('Image successfully created!')
            }
            res.json(data)
        }
    })
})

// Delete image
imageExpressRoute.route('/remove-image/:imageName').delete((req, res, next) => {
    ImageSchema.findOneAndRemove({name: req.params.imageName}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get Combination
imageExpressRoute.route('/image-combination').get((req, res) => {
    ImageSchema.find({}, (error, data) => {
        if (error) {
            return next(error)
        } else {

            var names = []
            data.forEach(function(doc) {
                    names.push(doc.name);
                  })
            combimationList = []
            printCombination(names, names.length, req.query.length, combimationList);
            res.json(combimationList)
        }
    })
})




function combinationUtil(arr,data,start,end,index,r, combimationList) {
    // Current combination is ready to be printed, print it
    if (index == r)
    {
        
        tempArr = []
        for (let j=0; j<r; j++)
        {
            tempArr[j] = data[j];
        }
        combimationList.push([...tempArr])
    }
        
        // replace index with all possible elements. The condition
        // "end-i+1 >= r-index" makes sure that including one element
        // at index will make a combination with remaining elements
        // at remaining positions
    for (let i=start; i<=end && end-i+1 >= r-index; i++)
    {
        data[index] = arr[i];
        combinationUtil(arr, data, i+1, end, index+1, r, combimationList);
    }
}
      
// The main function that prints all combinations of size r
// in arr[] of size n. This function mainly uses combinationUtil()
function printCombination(arr,n,r, combimationList)
{
    // A temporary array to store all combination one by one
    let data = new Array(r);
    
    // Print all combination using temporary array 'data[]'
    combinationUtil(arr, data, 0, n-1, 0, r, combimationList);
}
      
/*Driver function to check for above function*/
// let arr=[1, 2, 3, 4, 5];
// let r = 3;
// let n = arr.length;
// combimationList = []
// printCombination(arr, n, r, combimationList);
// console.log(combimationList)

module.exports = imageExpressRoute;
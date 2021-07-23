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

module.exports = imageExpressRoute;
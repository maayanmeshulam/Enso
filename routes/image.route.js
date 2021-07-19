const express = require('express');
const app = express();

// Express route
const imageExpressRoute = express.Router();

// User schema
let ImageSchema = require('../model/image.model');

// Get images 
// Add pagintion and sorting by date
imageExpressRoute.route('/').get((req, res) => {
    ImageSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Create image
imageExpressRoute.route('/create-image').post((req, res, next) => {
    ImageSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// Get single image
imageExpressRoute.route('/get-image/:id').get((req, res) => {
    ImageSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update image
// if does not exist, create it
imageExpressRoute.route('/update-image/:id').put((req, res, next) => {
    ImageSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Image successfully updated!')
        }
    })
})

// Delete image
imageExpressRoute.route('/remove-image/:id').delete((req, res, next) => {
    ImageSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = imageExpressRoute;
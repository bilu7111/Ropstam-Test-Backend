const { Car } = require("../model");
const { SERVER_ERROR } = require("../common_errors");
const { validationResult } = require("express-validator");

module.exports = {
    create: async (req, res) => {
        try {
            validationResult(req).throw();
            await Car.create(req.body);
            res.status(200).json({message: "Car successfully created!"});
        } catch (err) {
            if(err.errors.length){
                res.status(400).json(err.errors);
            }
            else{
                res.status(500).json({message: SERVER_ERROR});
            }
        }
    },
    read: async (req, res) => {
        try {
            validationResult(req).throw();
            const cars = await Car.find()
            .skip(req.params.skip)
            .limit(req.params.limit);
            const total = await Car.count();
            res.status(200).json({message: "Cars successfully fetched!", cars, total});
        } catch (err) {
            if(err.errors.length){
                res.status(400).json(err.errors);
            }
            else{
                res.status(500).json({message: SERVER_ERROR});
            }
        }
    },
    update: async (req, res) => {
        try {
            validationResult(req).throw();
            await Car.findOne({ where: { id: req.params.id}}).update(req.body);
            res.status(200).json({message: "Car successfully updated!"});
        } catch (err) {
            if(err.errors.length){
                res.status(400).json(err.errors);
            }
            else{
                res.status(500).json({message: SERVER_ERROR});
            }
        }
    },
    delete: async (req, res) => {
        try {
            validationResult(req).throw();
            await Car.findOne({ where: { id: req.params.id}}).deleteOne();
            res.status(200).json({message: "Car successfully deleted!"});
        } catch (err) {
            if(err.errors.length){
                res.status(400).json(err.errors);
            }
            else{
                res.status(500).json({message: SERVER_ERROR});
            }
        }
    },
}
const { Category } = require("../model");
const { SERVER_ERROR } = require("../common_errors");

module.exports = {
    create: async (req, res) => {
        try {
            validationResult(req).throw();
            await Category.create(req.body);
            res.status(200).json({message: "Category successfully created!"});
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
            const categories = await Category.find()
            .skip(req.params.skip)
            .limit(req.params.limit);
            const total = await Category.count();
            res.status(200).json({message: "Categories successfully fetched!", categories, total});
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
            await Category.findOne({ where: { id: req.params.id}}).update(req.body);
            res.status(200).json({message: "Category successfully updated!"});
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
            await Category.findOne({ where: { id: req.params.id}}).deleteOne();
            res.status(200).json({message: "Category successfully deleted!"});
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
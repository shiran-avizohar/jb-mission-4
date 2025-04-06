"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.create = create;
const furniture_1 = require("../../models/furniture");
async function getAll(req, res, next) {
    try {
        const furnitures = await furniture_1.FurnitureModel.find();
        res.json(furnitures.map(doc => doc.toObject()));
    }
    catch (e) {
        next(e);
    }
}
async function create(req, res, next) {
    try {
        const furniture = new furniture_1.FurnitureModel(req.body);
        await furniture.save();
        res.json(furniture.toObject());
    }
    catch (e) {
        next(e);
    }
}

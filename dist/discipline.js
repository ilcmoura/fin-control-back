"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restful = require("node-restful");
const mongoose = restful.mongoose;
const disciplineSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});
module.exports = restful.model('Discipline', disciplineSchema);

import * as restful from 'node-restful'

const mongoose = restful.mongoose

const disciplineSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
})

module.exports = restful.model('Discipline', disciplineSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    id: String,
    title: String,
    type: String,
    creator: String,
    date: Date,
    link: String,
    contentSnippet: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
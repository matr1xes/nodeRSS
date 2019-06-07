const mongoose = require('mongoose')
const dbAddress = 'mongodb://localhost:27017/cnbeta_test'

const connectDB = () => {
    mongoose.connect(dbAddress, {
        useNewUrlParser: true
    })

    mongoose.connection
        .on('error', console.error.bind(console, 'connection error:'))
        .once('open', function () {
            console.log(`mongoDB connected......`)
        })
}


module.exports = connectDB
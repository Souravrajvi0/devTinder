const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://souravrajvi18:aCD0N36GNcAc3jDY@namastenode.jeegp.mongodb.net/devTinder');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

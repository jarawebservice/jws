const hostingSchema = mongoose.Schema({
    url: {
        type: string,
        required: true,
    },
    type: {
        type: string
    },
    user: {
        type: ObjectId
    }


});

const Host = module.exports = mongoose.model('Host', hostingSchema);
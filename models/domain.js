const domainSchema = mongoose.Schema({
    domain: {
        type: string,
        required: true,
    },
    cname: {
        type: string
    },
    aaa: [{
        body: String,

    }],
    user: {
        type: ObjectId
    }


});

const Domain = module.exports = mongoose.model('Domain', domainSchema);
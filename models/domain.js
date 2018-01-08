const domainSchema = mongoose.Schema({
    domain: {
        type: string,
        required: true,
    },
    cname: {
        type: string
    },
    user: {
        type: ObjectId
    }


});

const Domain = module.exports = mongoose.model('Domain', domainSchema);
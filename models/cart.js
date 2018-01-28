const domainSchema = mongoose.Schema({
    items: {
        type: string,
        required: true,
    },
    total: {
        type: int
    }
});

const itemSchema = mongoose.Schema({
    item: {
        type: string,
        required: true,
    },
    price: {
        type: string
    }
});

const Domain = module.exports = mongoose.model('Domain', domainSchema);
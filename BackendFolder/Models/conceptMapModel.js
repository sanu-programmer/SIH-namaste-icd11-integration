//Links Codes across Systems

const concpetMapSchema = new mongoose.Schema({
    resourceType : {
        type : String,
        default : 'ConceptMap'
    },
    source : {
        system : String,
        code : String
    },
    targets : [{
        system : String,
        code : String, 
        display : String
    }],
    created : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("conceptMap", concpetMapSchema);
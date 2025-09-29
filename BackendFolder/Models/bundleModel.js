// FHIR Regulations 

const bundleSchema = new mongoose.Schema({
    resourceType : {
        type : String,
        default : 'Bundle'
    },
    type : String,
    entry : [{}],
    timestamp : {
        type : Date, 
        default : Date.now
    }
});

module.exports = mongoose.model("Bundle", bundleSchema);
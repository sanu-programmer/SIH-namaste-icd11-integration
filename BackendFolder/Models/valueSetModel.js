// Value 

const valueSetSchema = new mongoose.Schema({
    resourceType : {
        type : String,
        default : 'ValueSet'
    },
    name : String,
    codes : [{
        system : String,
        code : String,
        display : String
    }]
});

module.exports = mongoose.model("ValueSet", valueSetSchema);
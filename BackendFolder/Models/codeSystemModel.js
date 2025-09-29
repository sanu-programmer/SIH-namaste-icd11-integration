//Stores NAMASTE / ICD-11 Terms

const codeSystemSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    default: "CodeSystem",
  },
  system: String,
  code: {
    type: String,
    required: true,
  },
  display: String,
  description: String,
  description: String,
  version: String,
}, {
    timestamps : true
});

module.exports = mongoose.model("CodeSystem", codeSystemSchema);

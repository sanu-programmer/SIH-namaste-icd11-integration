// LOGS SHIT

const auditLogSchema = new mongoose.Schema({
    resourceType : {
        type : String,
        default : "AuditEvent"
    },
    action : String,
    user : String,
    query : String,
    timestamp : {
        type : Date,
        default : Date.now
    },
    version : String,
    consentId : String
});

module.exports = mongoose.model("auditLog", auditLogSchema);
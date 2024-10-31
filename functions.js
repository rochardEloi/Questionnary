const Users = require("./models/users");
const bcrypt = require("bcrypt");
const Variables = require("./models/variables");

exports.creatInitialAdmin = async () => {
    const admin = await Users.findOne({ role: "SYSTEM_ADMINISTRATOR", email: "admin@gmail.com" });
    if (admin) {
        return;
    }
    const hashedPassword = await bcrypt.hash("admin", 10);
    try {
        const newAdmin = new Users({
            lastname: "Admin",
            firstname: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            status: "ACTIVE",
            role: "SYSTEM_ADMINISTRATOR",
            created_at: new Date()
        });
        await newAdmin.save();
    } catch (error) {
        console.error("Erreur lors de la création de l'administrateur initial:", error);
    }
}

exports.createQuestionNumberVariable = async () => {
    try {
        const variable = await Variables.findOne({name : "question_number"});
        if(variable) return;
        const newVariable = new Variables({
        name : "question_number",
        number_value : 0,
        created_at : new Date(),
        })
        await newVariable.save();
    } catch (error) {
        console.error("Erreur lors de la création de la variable question_number:", error);
    }
}
exports.createTimeoutVariable = async () => {
    try {
        const variable = await Variables.findOne({name : "timeout"});
        if(variable) return;
        const newVariable = new Variables({
            name : "timeout",
            object_value : {
                hour : 1,
                minutes : 0,
                seconds : 0
            },
            created_at : new Date(),
        })
        await newVariable.save();
    } catch (error) {
        console.error("Erreur lors de la création de la variable timeout:", error);
    }
}

exports.successNote = async () => {
    try {
        const variable = await Variables.findOne({name : "success_note"});
        if(variable) return;
        const newVariable = new Variables({
            name : "success_note",
            number_value : 0.8,
            created_at : new Date(),
        })
        await newVariable.save();
    } catch (error) {
        console.error("Erreur lors de la création de la variable success_note:", error);
    }
}


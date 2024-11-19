const Questionnary = require("../models/questionnary");
const Variables = require("../models/variables");
const questionnaryTypes = ["one_choice", /* "multiple_choice", */ "text",];
const Responses = require("../models/responses");
const { getQuestionsIfQuit } = require("./responses");
const ExamHistory = require("../models/exam_history")



exports.createQuestionnary = async (req, res) => {
    //const type = req.body.type;
    // if(!questionnaryTypes.includes(type)) {
    //     return res.status(400).json({message : "Invalid question type"});
    // }
    const user_id = req.session.user_credentials.user_id;
    if (!req.body.question) return res.status(400).json({ message: "Question is required" });
    if (!req.body.options) return res.status(400).json({ message: "Options are required" });
    if (!req.body.string_answer) return res.status(400).json({ message: "String answer is required" });

    try {
        const questionnary = new Questionnary({ ...req.body, created_at: new Date(), updated_at: new Date(), created_by: user_id, updated_by: user_id, });
        await questionnary.save();
        return res.json(questionnary);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


exports.createManyQuestions = async (req, res) => {
    //const type = req.body.type;
    // if(!questionnaryTypes.includes(type)) {
    //     return res.status(400).json({message : "Invalid question type"});
    // }

    const questions = req.body.questions;
    const user_id = req.session.user_credentials.user_id;

    if (!questions) return res.status(400).json({ message: "Questions are required" });
    try {
        for (const question of questions) {
            if (!question.question) return res.status(400).json({ message: "Question is required" });
            if (!question.options) return res.status(400).json({ message: "Options are required" });
            if (!question.string_answer) return res.status(400).json({ message: "String answer is required" });
            const questionnary = new Questionnary({ ...question, created_at: new Date(), updated_at: new Date(), created_by: user_id, updated_by: user_id, });
            await questionnary.save();
        }

        return res.status(201).json({
            message: "Questions created successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

exports.updateQuestionnary = async (req, res) => {
    try {
        const session = req.session.user_credentials;
        const user_id = session.user_id;
        if (!user_id) return res.status(400).json({ message: "User ID is required" });
        const questionnary = await Questionnary.updateOne({ _id: req.params.id }, { ...req.body, updated_by: user_id, updated_date: Date.now() });
        return res.json(questionnary);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Questionnary.find({ ...req.body });
        return res.json(questions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateQuestionNumberVariable = async (req, res) => {
    try {
        const question_number = req.body.question_number;
        const variable = await Variables.updateOne({ name: "question_number" }, {
            number_value: parseInt(question_number)
        });
        return res.status(210).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateTimeoutVariable = async (req, res) => {
    //Date format from user : 00:00:00 = hh:mm:ss
    const timeout = req.body.timeout;
    const timeout_array = timeout.split(":");
    const hour = parseInt(timeout_array[0]);
    const minutes = parseInt(timeout_array[1]);
    const seconds = parseInt(timeout_array[2]);

    if (isNaN(hour) || isNaN(minutes) || isNaN(seconds)) return res.status(400).json({ message: "Invalid timeout format" });
    const timeout_object = {
        hour: hour,
        minutes: minutes,
        seconds: seconds,
    }

    try {
        const variable = await Variables.updateOne({ name: "timeout" }, {
            object_value: timeout_object
        });
        return res.status(200).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getTimeoutVariable = async (req, res) => {
    try {
        const variable = await Variables.findOne({ name: "timeout" });
        return res.status(200).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateNextTryVariable = async (req, res) => {
    //Date format from user : 00:00:00 = hh:mm:ss
    const timeout = req.body.timeout;
    const timeout_array = timeout.split(":");
    const hour = parseInt(timeout_array[0]);
    const minutes = parseInt(timeout_array[1]);
    const seconds = parseInt(timeout_array[2]);

    if (isNaN(hour) || isNaN(minutes) || isNaN(seconds)) return res.status(400).json({ message: "Invalid timeout format" });
    const timeout_object = {
        hour: hour,
        minutes: minutes,
        seconds: seconds,
    }

    try {
        const variable = await Variables.updateOne({ name: "next_try" }, {
            object_value: timeout_object
        });
        return res.status(200).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getNextTryVariable = async (req, res) => {
    try {
        const variable = await Variables.findOne({ name: "next_try" });
        return res.status(200).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getSuccessNotes = async (req, res) => {
    try {
        const variables = await Variables.find({ name: "success_note" });
        return res.status(200).json(variables);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getQuestionNumber = async (req, res) => {
    try {
        const variable = await Variables.findOne({ name: "question_number" });
        return res.status(200).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateSuccessNoteVariable = async (req, res) => {
    try {
        console.log(req.body);
        const success_note = Number(req.body.success_note);  // Conversion explicite en nombre

        if (isNaN(success_note))
            return res.status(400).json({ message: "Invalid success note format" });
        if (success_note < 0 || success_note > 100)
            return res.status(400).json({ message: "Success note must be between 0 and 100" });

        const variable = await Variables.updateOne(
            { name: "success_note" },
            { number_value: success_note / 100 }  // Utilisation directe pour conserver les décimales
        );

        return res.status(200).json(variable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


exports.startQuestionnary = async (req, res) => {
    try {
        //We don't want to send the string_answer, created_by, updated_by, created_at, updated_at to the client
        const user_id = req.session.user_credentials.user_id;
        const isAlreadyAnswered = await Responses.findOne({ user_id: user_id });

        if (isAlreadyAnswered?.answers.length > 0) {
            return res.status(400).json({ message: "You have already answered the questionnary" })
        }


        if (isAlreadyAnswered) {
            const questions = await getQuestionsIfQuit(user_id);
            return res.status(200).json(questions);
        }

        const questions = await Questionnary.find({}, { created_by: 0, updated_by: 0, created_at: 0, updated_at: 0 });
        const question_number = await Variables.findOne({ name: "question_number" });
        const value = question_number.number_value;
        const timeout = await Variables.findOne({ name: "timeout" });
        const nextTry = await Variables.findOne({ name: "next_try" });
        const timeout_object = timeout.object_value;
        const nextTry_object = nextTry.object_value;
        const returnValue = [];

        if (questions.length < value) return res.status(400).json({ message: "Not enough questions" });

        for (let i = 0; i < value; i++) {
            let randomValue = Math.floor(Math.random() * (questions.length - 1)) + 0;
            let question = questions[randomValue];


            while (returnValue.includes(question)) {
                randomValue = Math.floor(Math.random() * (questions.length - 1)) + 0;
                question = questions[randomValue];

            }

            returnValue.push(question);
        }

        const startTime = Date.now();
        const endTime = startTime + (timeout_object.hour * 3600 + timeout_object.minutes * 60 + timeout_object.seconds) * 1000;
        const nextTryTime = endTime + (nextTry_object.hour * 3600 + nextTry_object.minutes * 60 + nextTry_object.seconds) * 1000

        const returnObject = {
            questions: returnValue,
            timeout: `${timeout_object.hour < 10 ? "0" + timeout_object.hour : timeout_object.hour}:${timeout_object.minutes < 10 ? "0" + timeout_object.minutes : timeout_object.minutes}:${timeout_object.seconds < 10 ? "0" + timeout_object.seconds : timeout_object.seconds}`,
            start_time: startTime,
            end_time: endTime,
        }

        const d = {
            user_id: user_id,
            generated_questions: returnObject,
            timeout: timeout_object,
            created_at: startTime,
            created_by: user_id,
            next_try_date: nextTryTime
        }

        const response = new Responses(d)
        await response.save();

        const hs = new ExamHistory({
            user_id: user_id,
            datas: d
        })

        await hs.save()

        let newReturnValue = returnValue

        for (let i = 0; i < newReturnValue.length; i++) {
            newReturnValue[i].string_answer = "";
        }

        returnObject.questions = newReturnValue;

        return res.status(200).json(returnObject);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.resetExamUser = async (req, res) => {
    const user_id = req.params.id

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" })
    }

    try {
        const response = await Responses.findOne({
            user_id: user_id
        })

        if (response.generated_questions.end_time > Date.now() && response.answers.length > 0) {
            
            return res.status(400).json({ message: "Exam is already not completed or in progress" })
        }


    await Responses.deleteOne({
            user_id: user_id
    })
    

        
        
        this.startQuestionnary(req, res)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


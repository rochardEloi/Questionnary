const Responses = require("../models/responses");
const Variables = require("../models/variables");


exports.completeQuestionnary = async (req, res) => {
    try {
        const {  answers } = req.body;
        const user_id = req.session.user_credentials.user_id;

        const response = await Responses.findOne({ user_id: user_id });
        if (!response) return res.status(400).json({ message: "Response not found" });
        if (response.answers.length > 0) return res.status(404).json({ message: "Response already completed" });
        if (response.generated_questions.end_time < Date.now()) return res.status(404).json({ message: "Response timed out" });

        //Now i want to compare the answers with the questions inside the database

        const questions = response.generated_questions.questions;
        let right_answers = 0;
        let wrong_answers = 0;

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].string_answer === answers[i].answer) {
                right_answers++;
                answers[i].is_right = true;
                answers[i].right_answer = questions[i].string_answer;
            }
            else {
                wrong_answers++;
                answers[i].is_right = false;
                answers[i].right_answer = questions[i].string_answer;
            }
        }

        const success_note = await Variables.findOne({ name: "success_note" });
        const success_note_value = success_note.number_value;

        const percentage = (right_answers / (right_answers + wrong_answers));
        const is_passed = percentage >= success_note_value;

        await Responses.updateOne({ user_id: user_id }, {
            answers: answers,
            score: percentage * 100,
            total_questions: questions.length,
            right_answers_number: right_answers,
            wrong_answers_number: wrong_answers,
            is_passed: is_passed,
        })
        return res.status(200).json({ message: "Response completed" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getResponses = async (req, res) => {
    try {
        const responses = await Responses.find({ ...req.body });
        return res.status(200).json(responses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getResponsesByUser = async (req, res) => {
    try {
        //console.log(req.params);
        const responses = await Responses.find({ user_id: req.params.user_id });
        return res.status(200).json(responses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getQuestionsIfQuit = async (id) => {
    try {
        if (!id) return { message: "ID is required" };
        const response = await Responses.findOne({ user_id: id });
        if (!response) return { message: "Response not found" };

        if (response.generated_questions.end_time < Date.now()) return { message: "Response timed out" };

        const generated = response.generated_questions;
        //const answers = response.answers;
        const questions = generated.questions;

        for (let i = 0; i < questions.length; i++) {
            questions[i].string_answer = "";
        }

        return ({
            ...generated,
            questions: questions,
        });
    } catch (error) {
        return { message: error.message };
    }
}




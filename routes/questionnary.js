const router = require("express").Router();
const {createQuestionnary, updateQuestionnary, getQuestions,
    updateQuestionNumberVariable,updateTimeoutVariable, createManyQuestions, 
    startQuestionnary, updateSuccessNoteVariable, getTimeoutVariable,
    getSuccessNotes,
    getQuestionNumber,updateNextTryVariable, 
    getNextTryVariable,
    resetExamUser} = require("../controllers/questionnary");
const { completeQuestionnary, getResponses,getResponsesByUser} = require("../controllers/responses");
const auth = require("../middleware/auth");
    
router.post("/create", auth(['SYSTEM_ADMINISTRATOR']), createQuestionnary);
router.post("/create/many", auth(['SYSTEM_ADMINISTRATOR']), createManyQuestions);
router.post("/update/:id", auth(['SYSTEM_ADMINISTRATOR']), updateQuestionnary);
router.get("/questions", auth(['SYSTEM_ADMINISTRATOR']), getQuestions);
router.post("/update-question-number", auth(['SYSTEM_ADMINISTRATOR']), updateQuestionNumberVariable);
router.post("/update-timeout", auth(['SYSTEM_ADMINISTRATOR']), updateTimeoutVariable);
router.get("/start", auth(['USER']), startQuestionnary);
router.post("/update-success-note", auth(['SYSTEM_ADMINISTRATOR']), updateSuccessNoteVariable);

//New endpoints
router.post("/update-next-try", auth(['SYSTEM_ADMINISTRATOR']), updateNextTryVariable);
router.get("/get-timeout-variable", auth(['SYSTEM_ADMINISTRATOR']), getTimeoutVariable);
router.get("/get-next-try-variable", auth(['SYSTEM_ADMINISTRATOR']), getNextTryVariable);
router.get("/reset-questionnary", auth(["CLIENT"]), resetExamUser);

//Responses requests here
router.post("/complete-questionnary", auth(['USER']), completeQuestionnary);
router.use("/get-responses", auth(['SYSTEM_ADMINISTRATOR']), getResponses);
router.get("/get-timeout", auth(['SYSTEM_ADMINISTRATOR']), getTimeoutVariable);
router.get("/get-success-notes", auth(['SYSTEM_ADMINISTRATOR']), getSuccessNotes);
router.get("/question-number", auth(['SYSTEM_ADMINISTRATOR']), getQuestionNumber);
router.get("/get-responses-by-user/:user_id", auth(['USER']), getResponsesByUser);
module.exports = router;




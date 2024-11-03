const router = require("express").Router();
const {createQuestionnary, updateQuestionnary, getQuestions,updateQuestionNumberVariable,updateTimeoutVariable, createManyQuestions, startQuestionnary, updateSuccessNoteVariable} = require("../controllers/questionnary");
const { completeQuestionnary, getResponses } = require("../controllers/responses");
const auth = require("../middleware/auth");
    
router.post("/create", auth(['SYSTEM_ADMINISTRATOR']), createQuestionnary);
router.post("/create/many", auth(['SYSTEM_ADMINISTRATOR']), createManyQuestions);
router.post("/update/:id", auth(['SYSTEM_ADMINISTRATOR']), updateQuestionnary);
router.get("/questions", auth(['SYSTEM_ADMINISTRATOR']), getQuestions);
router.post("/update-question-number", auth(['SYSTEM_ADMINISTRATOR']), updateQuestionNumberVariable);
router.post("/update-timeout", auth(['SYSTEM_ADMINISTRATOR']), updateTimeoutVariable);
router.get("/start", auth(['USER']), startQuestionnary);
router.post("/update-success-note", auth(['SYSTEM_ADMINISTRATOR']), updateSuccessNoteVariable);


//Responses requests here
router.post("/complete-questionnary", auth(['USER']), completeQuestionnary);
router.use("/get-responses", auth(['SYSTEM_ADMINISTRATOR']), getResponses);

module.exports = router;



[
    {
        "options": [
            "H2O",
            "O2",
            "CO2"
        ],
        "_id": "67225489a3746213c8430b94",
        "question": "Quel est l'élément chimique de l'eau ?",
        "answer": "H2O",
        "__v": 0
    },
    {
        "options": [
            "anglais",
            "mandarin",
            "espagnol"
        ],
        "_id": "67225489a3746213c8430b9b",
        "question": "Quelle est la langue la plus parlée dans le monde ?",
            "answer": "mandarin",
        "__v": 0
    },
    {
        "options": [
            "Mars",
            "Jupiter",
            "Saturne"
        ],
        "_id": "67225489a3746213c8430b91",
        "question": "Quelle planète est connue comme la planète rouge ?",
        "answer": "Mars",
        "__v": 0
    },
    {
        "options": [
            "6",
            "7",
            "8"
        ],
        "_id": "67225489a3746213c8430b9a",
        "question": "Combien de côtés a un hexagone ?",
        "answer": "6",
        "__v": 0
    },
    {
        "options": [
            "éléphant",
            "chien",
            "chat"
        ],
        "_id": "67225489a3746213c8430b95",
        "question": "Quel animal est connu pour sa longue mémoire ?",
        "answer": "éléphant",
        "__v": 0
    },
    {
        "options": [
            "bleu",
            "vert",
            "rouge"
        ],
        "_id": "67225489a3746213c8430b8c",
        "question": "Quelle est la couleur du ciel par temps clair ?",
        "answer": "bleu",
        "__v": 0
    },
    {
        "options": [
            "Italie",
            "Espagne",
            "Grèce"
        ],
        "_id": "67225489a3746213c8430b99",
        "question": "Quel pays est connu pour la pizza ?",
        "answer": "Italie",
        "__v": 0
    },
    {
        "options": [
            "Vatican",
            "Monaco",
            "Malte"
        ],
        "_id": "67225489a3746213c8430b92",
        "question": "Quel est le plus petit pays du monde ?",
        "answer": "Vatican",
        "__v": 0
    },
    {
        "options": [
            "baleine bleue",
            "éléphant",
            "requin"
        ],
        "_id": "67225489a3746213c8430b98",
        "question": "Quel est le plus grand mammifère ?",
        "answer": "baleine bleue",
        "__v": 0
    },
    {
        "options": [
            "ronde",
            "carree",
            "triangle"
        ],
        "_id": "67225489a3746213c8430b8b",
        "question": "Quelle est la forme de la terre ?",
        "answer": "ronde",
        "__v": 0
    }
]
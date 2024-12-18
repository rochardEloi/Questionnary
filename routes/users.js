const router = require('express').Router();
const {createUser, getAllUsers, getUserById, updateUser,uploadIdentityCard,loginUser, downloadID} = require('../controllers/users');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/create', createUser);
router.use("/download/image/:id",  downloadID)
router.use('/users', auth(['SYSTEM_ADMINISTRATOR']), getAllUsers);
router.post('/login', loginUser);
router.get('/user/:id', auth(['USER','SYSTEM_ADMINISTRATOR']), getUserById);
router.put('/update/:id', auth(['SYSTEM_ADMINISTRATOR', 'USER']), updateUser);
router.post('/upload-identity-card', multer, auth(['USER']), uploadIdentityCard);


module.exports = router;

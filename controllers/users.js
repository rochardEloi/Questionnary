const Users = require("../models/users");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Users({
            ...req.body,
            password : hashedPassword,
            //status : "ACTIVE",
            role : "USER",
            created_at :  Date.now()
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

exports.loginUser = async (req, res) => {
    try {
        const user = await Users.findOne({email : req.body.email});
        if(!user) return res.status(404).json({message : "User not found"});
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        console.log(isPasswordValid);
        if(!isPasswordValid) return res.status(401).json({message : "Invalid password"});   
        req.session.user_credentials = {user_id : user._id, user_email : user.email, role : user.role};
        res.status(200).json(req.session.user_credentials);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({...req.body});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if(!userId) return res.status(400).json({message : "User ID is required"});
        const user = await Users.findOne({_id : userId});
        if(!user) return res.status(404).json({message : "User not found"});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        delete req.body._id;
        delete req.body.created_at;
        const userId = req.params.id;
        const password = req.body.password;
        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
        }
        if(!userId) return res.status(400).json({message : "User ID is required"});
        const user = await Users.updateOne({_id : userId}, {...req.body});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

exports.uploadIdentityCard = async (req, res) => {
    try {
        const session = req.session.user_credentials;
        console.log(session);
        //console.log(req);
        if(!session) return res.status(401).json({message : "Unauthorized"});
        const userId = session.user_id;
        if(!userId) return res.status(400).json({message : "User ID is required"});
        //console.log(req.file);
        const data = {}
        if(req.body.side === "front") {
           // req.body.itentity_card_front = req.file.filename;
           data.itentity_card_front = req.file.filename;
        } else if(req.body.side === "back") {
            //req.body.identity_card_back = req.file.filename;
            data.itentity_card_back = req.file.filename;
        }
        else if(req.body.side === "face"){
            data.itentity_card_face = req.file.filename;

        } else {
            return res.status(400).json({message : "Invalid side"});
        }
        //console.log(req.body.itentity_card_front);
        const user = await Users.updateOne({email : session.user_email}, {...data});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


exports.downloadID = (req, res)=>{
    const id = req.params.id 
    let myFile = "images/"+id
    res.download(myFile)
}



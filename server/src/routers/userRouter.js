const express = require("express");
// const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
// const Token = require("../models/tokenModel");
// const auth = require("../middleware/auth");
const generateAuthToken = require('../utils/jwt');
const { getTokenFromRedis, saveTokenInRedis, deleteTokenInRedis } = require('../utils/redis-utils')
const router = new express.Router();


router.post("/users/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = generateAuthToken(user);
        await saveTokenInRedis(token);
        res.status(201).send({ user , token});
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: 400,
            message: err.message,
        });
    }
});



router.post("/users/isEmailExists", async (req, res) => {
    console.log(req.cookies.username);
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });
        if(user) res.status(201).send({ isEmailExists: true });
        else res.status(201).send({ isEmailExists: false });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
        });
    }
});


router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        const token = generateAuthToken(user);
        await saveTokenInRedis(token);
        res.send({ user, token });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "מייל או סיסמה אינם תקינים",
        });
    }
});

// LogOut
router.post("/users/logout", async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        console.log(token);
        let p = await deleteTokenInRedis(token);
        console.log(p);
        res.send("Logout successfully");    
    } catch (err) {
        res.status(500).send();
    }
});



// Delete User
// router.delete("/users/me", auth, async (req, res) => {
//     try {
//         await req.user.remove();
//         res.send(req.user.email);
//     } catch (err) {
//         res.send.status(500);
//     }
// });


// Edit details
// router.patch("/users/me", auth, async (req, res) => {
//     const _id = req.user._id;
//     const update = req.body.update;

//     try {
//         const user = await User.findOneAndUpdate({ _id }, update, {
//             runValidators: true,
//             returnOriginal: false,
//         });

//         res.send({ user, token: req.token });
//     } catch (err) {
//         if (err.keyValue) {
//             let key = Object.keys(err.keyValue)[0];
//             key = key.includes(".") ? key.split(".")[1] : key;
//             const value = err.keyValue[key];

//             return res.status(400).send({
//                 status: 400,
//                 message: `The ${key} ${value} is already in use`,
//             });
//         }
//         res.status(500).send(err);
//     }
// });





module.exports = router;

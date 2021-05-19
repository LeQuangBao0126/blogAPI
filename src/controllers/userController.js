import UserModel from './../models/user';

import jwt from 'jsonwebtoken';
const login = async (req, res) => {
    let userLogin = req.body;
    let userFind = await UserModel.findOne({ "email": userLogin.email });
    if (!userFind) {
        return res.status(401).send({ message: "Invalid Emial Or Password" })
    }
    let token = await jwt.sign({ id: userFind._id }, "secret", { expiresIn: "1d" });
    return res.status(200).send({ token: token });
}
const register = async (req, res) => {
    let userRegister = req.body;
    // console.log(userRegister)
    let userFind = await UserModel.findOne({ "email": userRegister.email });

    if (userFind) {
        return res.status(401).send({ message: "Email already exist please try again! " })
    }
    let user = await UserModel.create(userRegister);

    let token = await jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });
    return res.status(200).send({ token: token });
}
const getCurrentUser = async (req, res) => {
    let user = await UserModel.findById(req.user.id).select("-password");
    return res.status(200).send(user)
}


module.exports = {
    login,
    register,
    getCurrentUser
}
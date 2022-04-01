const express = require('express')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const secret = process.env.TOKEN_SECRET

var decoded = '';
var allow = '';
 

async function login(req, res) {

    const authUser = await User.findOne({ email: req.body.user })
    if (!authUser) return res.send("Email or Password incorrect")


    const authPassword = bcrypt.compareSync(req.body.password, authUser.password)
    if (!authPassword) return res.send("Email or Password incorrect")


    const token = jwt.sign({ name: authUser.name, admin: authUser.admin }, secret, { expiresIn: 3600  })
    
    res.json({ token: token })





}

async function register(req, res) {

    const salt = bcrypt.genSaltSync(14)
    const passwordCrypt = bcrypt.hashSync(req.body.password, salt)

    let user = new User({
        name: req.body.name,
        password: passwordCrypt,
        email: req.body.email,
        admin: req.body.admin
    })

    try {
        const saved = await user.save()
        res.send(saved)

    } catch (error) {
        res.send(error)

    }



}

function valitationToken (req, res, next){

    let token = req.query.token

    console.log(token)

    allow = jwt.verify(token, 'segredo')

    console.log('Allow:', allow)

    jwt.verify(token, 'segredo', (error, tokenData)=>{
        
        if(error) res.json(error)

        if(tokenData) {
            decoded = tokenData
            next()
        }
    })
}

function success(req, res){
    res.json(decoded.name)
}







module.exports = {login, register, valitationToken, success}
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const request = require('request');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//List of entries verifications
var regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var regexPassword = new RegExp(/^[A-Za-z0-9_&²*\-\(\)éèáíóúñà@çãõùìò+$%µ£¤\:!§\;\.\,\?\=/#|\[\]]{5,}$/); //mini 5 caracters
var regexFirstName = new RegExp(/^[A-Za-z]+$/);//mini 1 letter and without accents
var regexLastName = new RegExp(/^[A-Za-z]+$/);
var regexBrazilianPhone = new RegExp(/^\([1-9]{2}\)\d{5}-\d{4}$/);//Valid Brazilian phone number ; exemple : (12)01234-0123


module.exports = {
    verify,
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function verify(id, userParam) {
    // validate
    if (!regexEmail.test(userParam.email)) {
        throw userParam.email + ': invalid email';
    }
    if (id===0 && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }
    if (!regexPassword.test(userParam.password)) {
        throw 'invalid password (minimum 5 characters)';
    }
    if (!regexFirstName.test(userParam.firstName)) {
        throw 'invalid first name (only unaccented characters)';
    }
    if (!regexLastName.test(userParam.lastName)) {
        throw 'invalid last name (only unaccented characters)';
    }
    if (!regexBrazilianPhone.test(userParam.personalPhone)) {
        throw userParam.personalPhone + ': invalid phone number (only brazilian ones are accepted - exemple: (12)01234-0123)';
    }
    return true;
}


async function authenticate({ email, password }) {
    console.log("On commence l'auth...");
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        console.log("Tout se passe bien ?");
        console.log({...userWithoutHash,token});
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    await verify(0,userParam);

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

    let ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:4000/users/authenticate", true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(JSON.stringify({"email":userParam.email,
                              "password":userParam.password
                            }));
    ajax.onreadystatechange = function(){
        console.log('requête :');
        console.log(JSON.stringify({"email":userParam.email,"password":userParam.password}));
        console.log('response fin de signup - auth: '+ajax.responseType);

    }

    // const response = await fetch('http://localhost:4000/users/authenticate', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body : JSON.stringify({
    //                 "email":userParam.email,
    //                 "password":userParam.password,
    //             })
    //         });

    // const response = await request.post('http://localhost:4000/users/authenticate',
    //     { json: { "email":userParam.email,
    //               "password":userParam.password,
    //             }
    //     }
    // )
    // const response = {message:"user created !"};
    
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken3';
    }
    await verify(1,userParam);

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
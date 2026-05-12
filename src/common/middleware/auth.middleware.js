const jwt = require('jsonwebtoken');
const env = require("../../config/env");
const express = require('express');


module.exports = (req, res, next) => {
    const authHeader  = req.header('Authorization');
    console.log(authHeader);
    
    if (!authHeader) {
        return res.status(401).send('Access Denied. No token provided.');
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.jwt.secret);
        req.token = decoded;
        next();
    } 
    catch (error) {
        console.log(error);
        
        res.status(400).send('Invalid token',error);
    }
};
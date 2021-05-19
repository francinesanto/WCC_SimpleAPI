const express = require('express');
const consign = require('consign');

module.exports = () =>{
    const app = express();
    //fala que o app vai usar json
    app.use(express.json())

    consign()
    .include('controllers')
    .into(app)

    return app;
};
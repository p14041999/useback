#!/usr/bin/env node
const app = require('express')();

app.get('/',(req,res)=>{
    res.send(`<p style="color:red">ERROR CP3021: CODE PARTNER CUSTOM DATASET REFF_EARNING_TIER NOT DEFIENED!</p>`);
});

app.listen(3000);
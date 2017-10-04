/*
 * @Author: buji 
 * @Date: 2017-10-04 10:16:50 
 * @Last Modified by: buji
 * @Last Modified time: 2017-10-04 11:07:30
 */
'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Dog', {
    id: ObjectId,
    name: String,
    age: Number
});
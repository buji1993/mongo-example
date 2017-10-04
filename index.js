'use strict'

const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');

const Dog = require('./lib/models/dog');

mongoose.createConnection('localhost', 'test');

const app = new Koa();
const router = new Router();

router.get('/query', (ctx, next) => {
    const callback = ctx => {
        if (error) {
            console.log('query error');
        }
        console.log(data);
        ctx.response.type = 'json';
        ctx.response.body = data;
    }
    Dog.find({}, 'name age', callback);
});

router.get('/add', ctx => {
    const query = ctx.query;
    if (!query.name) {
        return ctx.response.body = 'need name';
    }
    if (!query.age) {
        return ctx.response.body = 'need age';
    }

    let record = new Dog({
        name: query.name,
        age: query.age
    });

    record.save();
    ctx.response.body = 'saved';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(7001);
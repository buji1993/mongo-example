'use strict'

const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');

const Dog = require('./lib/models/dog');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true
});

const app = new Koa();
const router = new Router();

router.get('/query', async ctx => {
    const data = await Dog.find({}, 'name age').exec();
    console.log(data);
    ctx.response.body = JSON.stringify(data);
});

router.get('/add', async ctx => {
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

    await record.save();
    ctx.response.body = 'saved';

});

app.use(router.routes()).use(router.allowedMethods());

app.use(ctx => {
    console.log(ctx.response.body);
});

app.listen(7001);
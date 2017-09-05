import http from 'http';
import path from 'path';
import fs from 'fs';

import Koa from 'koa';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import compress from 'koa-compress';
import staticCache from 'koa-static-cache';
import views from 'koa-views';
import koaBody from 'koa-body';
import log from 'koa-logger2';
import swig from 'swig';

import httpProxy from 'http-proxy';

import database from './dao/database';

import config from '../../../config';

import controller from './controller';

swig.setDefaults({
    varControls: ['{%', '%}']
});

const body = koaBody({
    strict: false,
    multipart: true,
    formidable:{
        uploadDir:'./upload'
    },
    formLimit:"5mb",
    jsonLimit:"5mb",
    textLimit:"5mb",
    strict: false
});

const proxy = httpProxy.createProxyServer({});

const logger = log('ip [year-month-day time] "method url protocol/httpVer" status size "referer" "userAgent" duration ms');

const app = new Koa();

app.keys = ["keys"];

app.use(convert(logger.gen));

app.use(convert(compress()));

app.use(convert(session({
    rolling: true,
    key:"key",
    prefix:"prefix",
    cookie:{
        maxage:1800000
    }
})));

app.use(convert(staticCache('./public', { gzip: true, dynamic: true })));

app.use(convert(views('./public',{ map: { html: 'swig' }})));

app.use(async (ctx,next) => {
    await body.call(this,ctx,next);
});

app.use(controller.routes(), controller.allowedMethods());

app.use(async (ctx,next) => {
    var start = new Date().getTime();
    var callback = (context) => {
        return function(done) {
            var port = config.mock.port || 9000;
            var target = 'http://127.0.0.1' + ':' + port;
            proxy.web(context.req, context.res, { target: target }, function(e) {
                return done(null,null);
            });
            context.res.on('finish', function() {
                var duration = new Date().getTime() - start;
                console.log(context.ip,"[",moment().format("YYYY-MM-DD HH:mm:ss"),"]","proxy",context.req.method,target+context.req.url,context.res.statusCode,duration,"ms");
            });
        }
    };
    await callback(ctx);
});

let server = http.createServer(app.callback());

let port = config.server.port||8080;

server.listen(port, '0.0.0.0', err => {
    database.sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(e => {
        throw e;
    });
    console.log('server start on',port);
});
import base from './base';

import util from 'util';

import crypto from 'crypto';

function auth(){
    
    const self = this;
    
    base.call(this,'user');

    this.login = async function(ctx, next) {
        try {
            let params = { ...ctx.params, ...ctx.query, ...ctx.request.body };
            if(!!params.username && !!params.password) {
                if(params.username=='admin') {
                    ctx.session.admin = {"id":0,"username":"admin","password":""};
                    ctx.body = {"accesstoken":ctx.sessionId};
                } else {
                    let {rows,count} = await self.service.findList({ "where" : { "username" : params.username} });
                    if(count>0 && !!rows && !!rows[0] && !!rows[0]['id']) {
                        let row = rows[0];
                        let md5 = crypto.createHash('md5');
                        md5.update(params.password);
                        let decode = md5.digest('hex');
                        if(decode===row.password) {
                            ctx.session.user = row;
                            ctx.body = {"accesstoken":ctx.sessionId};
                        } else {
                            throw new Error('password incorrect');
                        }
                    } else {
                        throw new Error('user not found');
                    }
                }
            } else {
                throw new Error('field cannot be empty');
            }
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }

    this.logout = async function(ctx, next) {
        try {
            if(!!ctx.session.user) {
                delete ctx.session.user;
                ctx.body = {};
            } else if(!!ctx.session.admin) {
                delete ctx.session.admin;
                ctx.body = {};
            } else {
                throw new Error('user not signed in');
            }
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }

    this.checkLogin = async function(ctx, next) {
        try {
            // if(!!ctx.session.user) {
                await next();
            // } else {
            //     throw new Error('unauthorized');
            // }
        } catch(e) {
            // console.error(e);
            ctx.body = e.message;
            ctx.status = 403;
        }
    }

    this.checkAdmin = async function(ctx, next) {
        try {
            // if(!!ctx.session.admin) {
                await next();
            // } else {
            //     throw new Error('unauthorized');
            // }
        } catch(e) {
            // console.error(e);
            ctx.body = e.message;
            ctx.status = 403;
        }
    }
};

util.inherits(auth, base);

module.exports = auth;
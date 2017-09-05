import Router from 'koa-router';

import Auth from './auth';

import User from './user';

const router = new Router();

const user = new User();

const auth = new Auth();

const ver = 'v1';

router.get('/mobile', async function(ctx, next) {
    await ctx.render('mobile');
});

router.get('/manage', async function(ctx, next) {
    await ctx.render('manage');
});

router.get('/website', async function(ctx, next) {
    await ctx.render('website');
});



router.get(`/api/${ver}/users/:id`, auth.checkLogin, user.findOne);

// http GET :8080/api/v1/users _where:='{"id":{"$in":[1,2,3]}}' _order:='[["id","desc"]]'

router.get(`/api/${ver}/users`, auth.checkLogin, user.findList);

router.delete(`/api/${ver}/users/:id`, auth.checkLogin, user.remove);

router.delete(`/api/${ver}/users`, auth.checkLogin, user.remove);

router.post(`/api/${ver}/users`, auth.checkLogin, user.create);

router.patch(`/api/${ver}/users/:id`, auth.checkLogin, user.update);

// http -f POST :8080/api/v1/auth/login username=test password=test

router.post(`/api/${ver}/auth/login`, auth.login);

router.get(`/api/${ver}/auth/logout`, auth.checkLogin, auth.logout);

export default router;
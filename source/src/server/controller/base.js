import service from '../service';

function base(module) {

    const self = this;

    self.module = module;

    self.service = new service[module](module);

    self.findOne = async function(ctx, next) {
        try {
            let params = { ...ctx.params, ...ctx.query, ...ctx.request.body };
    
            let row = null;
    
            if(!!params.id) {
                row = await self.service.findOne(params.id);
            }
    
            ctx.body = row;
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }

    self.findList = async function(ctx, next) {
        try {
            let params = { ...ctx.params, ...ctx.query, ...ctx.request.body };
    
            let options = {};
    
            let _page = parseInt(params._page);
            let _limit = parseInt(params._limit);

            if(_page>0 && _limit>0) {
                options.offset = (_page - 1) * _limit;
                options.limit = _limit;
            }

            options.where = params._where || {};
            options.order = params._order || [];
            options.include = params._include || [];

            let { rows,count } = await self.service.findList(options,'user');
    
            ctx.set('X-Total-Count',count);
    
            ctx.body = rows;
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }

    self.create = async function(ctx, next) {
        try {

            console.log(ctx.params,ctx.query,ctx.request,ctx.request.body);

            let params = { ...ctx.params, ...ctx.query, ...ctx.request.body };
    
            let row = await self.service.create(params);
    
            if(!!!row) {
                throw new Error('failed to create data');
            }
    
            ctx.body = row;
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }

    self.remove = async function(ctx, next) {
        try {
            let params = { ...ctx.params, ...ctx.query, ...ctx.request.body };
    
            let rows = null;
    
            if(!!params.id) {
                rows = await self.service.remove([params.id]);
            } else if(!!params.ids) {
                rows = await self.service.remove(params.ids);
            } else {
                throw new Error('data not found');
            }
    
            ctx.body = rows;
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }

    self.update = async function(ctx, next) {
        try {
            let params = { ...ctx.params, ...ctx.query, ...ctx.request.body };
    
            let row = null;
    
            if(!!params.id) {
                row = await self.service.update(params.id,params);
                if(!!!row) {
                    throw new Error('failed to update data');
                }
            } else {
                throw new Error('data not found');
            }
    
            ctx.body = row;
        } catch(e) {
            console.error(e);
            ctx.body = e.message;
            ctx.status = 500;
        }
    }
}

module.exports = base;
import dao from '../dao';

function base(module) {

    const self = this;
    
    self.module = module;

    self.dao = new dao.base(self.module);

    self.findOne = async function(id) {
        try {
            let result = null;
            if(!!id) {
                result = await self.dao.findOne(id);
            }
            return result;
        } catch(e) {
            console.error(e);
            throw e;
        }
    };

    self.findList = async function(options) {
        try {
            let result = await self.dao.findList(options);
            return result;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    self.create = async function(obj) {
        try {
            let result = await self.dao.save(obj);
            if(!!!result) {
                throw new Error('failed to save data');
            }
            return result;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    self.remove = async function(ids) {
        try {
            let result = null;
            if(!!ids) {
                result = await self.dao.delete(ids);
            } else {
                throw new Error('data not found');
            }
            return result;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    self.update = async function(id,obj) {
        try {
            let result = null;
            if(!!id) {
                result = await self.dao.update(id,obj);
                if(!!!result) {
                    throw new Error('failed to update data');
                }
            } else {
                throw new Error('data not found');
            }
            return result;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
}

module.exports = base;
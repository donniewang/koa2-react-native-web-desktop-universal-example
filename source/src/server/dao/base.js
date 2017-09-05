import database from './database';

function base(module) {

    const self = this;

    self.database = database;

    self.module = module;

    self.findOne = async (id) => {
        return await self.database.models[self.module].findById(id);
    };
    
    self.find = async (options) => {
        return await self.database.models[self.module].findOne(options);
    };
    
    self.findList = async (options) => {
        return await self.database.models[self.module].findAndCountAll(options);
    };
    
    self.save = async (object) => {
        // let row = self.database.models[self.module].build(object);
        // return await row.save();
        return await self.database.models[self.module].create(object);
    };
    
    self.update = async (id,object) => {
        let row = await self.findOne(id);
        if(!!!row) throw new Error('data not found');
        return await row.update({...object,...row});
    };
    
    self.delete = async (ids) => {
        return await self.database.models[self.module].destroy({'where':{'id':{$in:ids}}});
        // let {rows,count} = await self.findList({'where':{'id':{$in:ids}}},modelName);
        // if(count==0) throw new Error('data not found');
        // let trans = await sequelize.transaction();
        // try {
        //     await Promise.all(rows.map((row) => row.destroy({transaction: trans})));
        //     await trans.commit();
        //     return {};
        // } catch(e) {
        //     await trans.rollback();
        //     throw e;
        // }
    
        // await sequelize.transaction(async (trans) => {
        //     let {rows,count} = await self.database.findList({'where':{'id':{$in:ids}}},modelName);
        //     if(count==0) throw new Error('data not found');
        //     await Promise.all(
        //         rows.map((row) => row.destroy({transaction: trans}))
        //     );
        // });
        // return {};
    };
}

module.exports = base;
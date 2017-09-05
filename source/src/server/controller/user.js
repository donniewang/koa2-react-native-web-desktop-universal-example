import base from './base';

import util from 'util';

function user(){
    
    base.call(this,'user');

};

util.inherits(user, base);

module.exports = user;
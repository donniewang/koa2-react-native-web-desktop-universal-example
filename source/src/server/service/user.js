import base from './base';

import util from 'util';

function user(module){
    
    base.call(this,module);

    


};

util.inherits(user, base);

module.exports = user;
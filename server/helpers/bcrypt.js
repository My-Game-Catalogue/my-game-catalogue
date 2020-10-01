var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

function hashing(password) {
    var hash = bcrypt.hashSync(password, salt);
    return hash
}
 function checking(password, hash) {
     return bcrypt.compareSync(password, hash);
 }

module.exports = { hashing, checking }
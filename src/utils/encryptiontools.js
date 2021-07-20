const bcrypt = require('bcrypt');

const encrypt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const compare = async (password, encryptedPassword) => {
    return bcrypt.compare(password, encryptedPassword);
}

module.exports = {
    encrypt,
    compare
}
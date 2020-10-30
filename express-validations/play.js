const { check } = require('express-validator');

const name = check('name')
    .notEmpty();
const description = check('description')
    .notEmpty();
const imageUrl = check('imageUrl')
    .notEmpty()
    .isURL({ protocols: ['http', 'https',], require_protocol: true, }).withMessage('You must enter a valid URL address');

module.exports = { name, description, imageUrl, }
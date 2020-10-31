const { check } = require('express-validator');

const title = check('title')
    .notEmpty();
const description = check('description')
    .notEmpty()
    .isLength({ max: 50, }).withMessage('Description must be maximum 50 characters long.');
const imageUrl = check('imageUrl')
    .notEmpty()
    .isURL({ protocols: ['http', 'https',], require_protocol: true, }).withMessage('You must enter a valid URL address');

module.exports = { title, description, imageUrl, }
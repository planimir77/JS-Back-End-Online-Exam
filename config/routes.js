const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const playController = require('../controllers/play');
const checkAuth = require('../middlewares/check-auth');
const validateUser = require('../express-validations/user');
const validatePlay = require('../express-validations/play');
const handleValidationErrors = require('../express-validations/handle-validation-errors');

module.exports = (app) => {
    app.get('/', homeController.get.homePage);

    // // ********************* Play *********************
    // // Details
    app.get('/play/details/:id', checkAuth(true), playController.get.details);
    // Create
    app.get('/play/create', checkAuth(true), playController.get.create);
    app.post('/play/create',
        checkAuth(true),
        validatePlay.title,
        validatePlay.description,
        validatePlay.imageUrl,
        handleValidationErrors,
        playController.post.create
    );
    // Edit
    app.get('/play/edit/:id', checkAuth(true), playController.get.update);
    app.post('/play/edit/:id',
        checkAuth(true),
        validatePlay.title,
        validatePlay.description,
        validatePlay.imageUrl,
        handleValidationErrors,
        playController.post.update
    );
    // Like
    app.get('/play/like/:id', checkAuth(true), (playController.get.like));
    // Delete
    app.get('/play/delete/:id', checkAuth(true), playController.get.delete);

    // /********************* User *********************/
    // // Register
    app.get('/user/register', checkAuth(false), userController.get.register);
    app.post('/user/register',
        checkAuth(false),
        validateUser.username,
        validateUser.password,
        handleValidationErrors,
        userController.post.register
    );
    // Login
    app.get('/user/login', checkAuth(false), userController.get.login);
    app.post('/user/login', checkAuth(false), userController.post.login);

    // Logout
    app.get('/logout', checkAuth(true), userController.get.logout);

    // /****************** Not found *********************/
    app.get('*', (req, res) => {
        res.render('404', { title: "Not found", });
    });
};

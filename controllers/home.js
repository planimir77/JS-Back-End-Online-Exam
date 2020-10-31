const { getPlays } = require('./play');

module.exports = {
    get: {
        async homePage(req, res) {
            const query = req.query;
            try {
                const plays = await getPlays(query);

                if (res.locals.isLogged) {
                    return res.render('user/home', { plays: plays, });
                }
                res.render('guest/home', { plays: plays, });

            } catch (error) {
                console.error('Error :', error);
                res.render('index', { title: "Home page", errorMessage: error.message, });
            }
        },
    },
}
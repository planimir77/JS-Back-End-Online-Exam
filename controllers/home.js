const { getPlays } = require('./play');

module.exports = {
    get: {
        async homePage(req, res) {
            const query = req.query;
            try {
                
                if (res.locals.isLogged) {
                    const plays = await getPlays(query);
                    return res.render('user/home', { title: "Express Retake Exam January 2019", plays: plays, });
                }

                const plays = await (await getPlays({ isPublic: true, })).sort((a, b) => {
                    return b.users.length - a.users.length;
                }).slice(0,3);

                res.render('guest/home', { title: "Express Retake Exam January 2019", guestplays: plays, });

            } catch (error) {
                console.error('Error :', error);
                res.render('guest/home', { title: "Express Retake Exam January 2019", errorMessage: error.message, });
            }
        },
    },
}
const Play = require('../models/Play');
const User = require('../models/User');

const getPlay = async (id) => {
    const play = await Play.findOne({ _id: id, }).lean();
    console.log(play);

    return play;
};

const getPlays = async (query) => {

    const plays = await Play.find({}).lean();
    console.log("Plays: ", plays);

    return plays;
};

const getUserslikedPlay = async (playId) => {

    return User.find({ plays: { $in: playId, }, }).lean();
}

module.exports = {
    get: {
        async details(req, res) {
            const playId = req.params.id;
            try {
                const currentUser = req.user._id;
                const play = await getPlay(playId);
                const isCreator = Boolean(play.creator === req.user._id);

                // Find all users in play with playId
                const users = await getUserslikedPlay(playId);

                const isLiked = Boolean(users.some(user => user._id.toString() === currentUser));

                res.render('play/details', {
                    title: "Express Retake Exam January 2019",
                    ...play,
                    isLiked: isLiked,
                    isCreator: isCreator,
                });

            } catch (error) {
                console.error('Error :', error);
                res.render('/', { errorMessage: error.message, });
            }
        },
        create(req, res) {
            res.render('play/create', { title: "Create page", });
        },
        async update(req, res) {
            const playId = req.params.id;
            try {
                const play = await getPlay(playId);
                res.render('play/edit', { title: "Express Retake Exam January 2019", ...play, });

            } catch (error) {
                console.error('Error :', error);
                res.render('play/edit', { errorMessage: error.message, });
            }
        },
        async like(req, res) {
            try {
                const playId = req.params.id;
                const userId = req.user._id;

                await Play.updateOne({ _id: playId, }, {
                    $push: { users: userId, },
                });
                await User.updateOne({ _id: userId, }, {
                    $push: { plays: playId, },
                });

                res.redirect(`/play/details/${playId}`);

            } catch (error) {
                console.error('Error: ' + error);
                req.render(`/play/details/${playId}`, { errorMessage: error.message, })
            }
        },
        async delete(req, res) {
            const playId = req.params.id;
            try {
                const result = await Play.deleteOne({ _id: playId, });
                console.log(JSON.stringify(result));

                res.redirect("/");

            } catch (error) {
                console.error('Error :', error.message);
                res.render(`/play/details/${playId}`, { errorMessage: error.message, });
            }
        },

    },
    post: {
        async create(req, res, next) {
            try {
                const entry = req.body;
                //const date = new Date(Date.now()).toLocaleDateString();
                const newPlay = new Play({
                    'title': entry.title,
                    'description': entry.description,
                    'imageUrl': entry.imageUrl,
                    'isPublic': Boolean(entry.isPublic === 'on'),
                    'creator': req.user._id,
                    //'created': date,
                });

                const play = await newPlay.save();

                //when success
                if (play) {
                    console.log(JSON.stringify(play));
                    return res.redirect(`/play/details/${play._id}`);
                }
                res.render('play/create');

            } catch (error) {
                console.error("Error: ", error.message);
                return res.render('play/create', { errorMessage: error, });
            }
            next();
        },
        async update(req, res, next) {
            try {
                const playId = req.params.id;
                const entry = req.body;

                const result = await Play.updateOne({ _id: playId, }, {
                    'title': entry.title,
                    'description': entry.description,
                    'imageUrl': entry.imageUrl,
                    'isPublic': entry.isPublic || false,
                });
                if (result) {

                    console.log(JSON.stringify(result));
                    return res.redirect(`/play/details/${playId}`);
                }
                res.render('play/edit');

            } catch (error) {
                console.error('Error: ' + error);
                return res.render('play/edit', { errorMessage: error, })
            }
            next();
        },
        async delete(req, res, next) {
            try {
                const playId = req.params.id;

                const result = await Play.deleteOne({ _id: playId, });
                console.log(JSON.stringify(result));

                res.redirect("/");

            } catch (error) {
                console.error('Error: ' + error);
                res.render('play/delete', { errorMessage: error.message, });
            }
            next();
        },
    },
    getPlay,
    getPlays,
}
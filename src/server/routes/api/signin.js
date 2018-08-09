const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    app.post('/api/signup', function (req, res, next) {
        console.log("THIS IS FROM SERVER: ", req.body.username);

        const { body } = req;
        const {
            username,
            password
        } = body;
        let {
            email
        } = body;

        if (!username) {
            return res.send({
                success: false,
                message: "ERROR: Username can not be blank!!!"
            })
        }
        if (!email) {
            return res.send({
                success: false,
                message: "ERROR: Email can not be blank!!!"
            })
        }
        if (!password) {
            return res.send({
                success: false,
                message: "ERROR: Password can not be blank!!!"
            })
        }

        email = email.toLowerCase();

        //Marching Email if doesn't exist
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "ERROR: Server error!!!"
                })
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: "ERROR: Account Already Exist!!!"
                })
            }
            //Save the new user
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "ERROR: Server error!!!"
                    });
                }
                return res.send({
                    success: true,
                    message: "Signed up!!!"
                });
            });
        });
    });

    app.post('/api/signin', function (req, res, next) {
        console.log("THIS IS FROM SERVER: ");

        const { body } = req;
        const {
            password
        } = body;
        let {
            email
        } = body;

        if (!email) {
            return res.send({
                success: false,
                message: "ERROR: Email can not be blank!!!"
            })
        }

        if (!password) {
            return res.send({
                success: false,
                message: "ERROR: password can not be blank!!!"
            })
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "ERROR: server error"
                });
            }
            if (users.length !== 1) {
                return res.send({
                    success: false,
                    message: "ERROR: Invalid"
                });
            }
            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: "ERROR: Invalid"
                });
            }

            //Otherwise
            var userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "ERROR: Server Error!"
                    });
                }
                return res.send({
                    success: true,
                    message: "Valid Sign In!",
                    token: doc._id
                });
            });
        });
    });

    app.get('/api/verify', function (req, res, next) {
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "ERROR: internal server error"
                });
            }
            if (sessions.length !== 1) {
                return res.send({
                    success: false,
                    message: "ERROR: invalid!!"
                });
            } else {
                return res.send({
                    success: true,
                    message: "Verfied!!"
                })
            }
        });
    });

    app.get('/api/logout', function (req, res, next) {
        const { query } = req;
        const { token } = query;

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
                $set: { isDeleted: true }
            }, null, (err, sessions) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "ERROR: internal server error"
                    });
                }
                return res.send({
                    success: true,
                    message: "Verfied!!"
                })

            });
    });
}
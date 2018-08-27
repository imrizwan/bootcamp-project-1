const Chat = require('../../models/Chat');

module.exports = (app) => {

    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.post('/api/message', async function (req, res, next) {
        try {
            const {
                Aduser,
                AduserId,
                currentUser,
                currentUserId,
                message
            } = req.body;
            console.log(req.body);

            if (!message) {
                return res.send({
                    success: false,
                    message: "Type Message..."
                });
            }


            const chat = new Chat();


            chat.Aduser = Aduser;
            chat.AduserId = AduserId;
            chat.currentUser = currentUser;
            chat.currentUserId = currentUserId;
            chat.messages = message;
            await chat.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "ERROR: Server error!!!"
                    });
                }
                //Emit the event  
                return res.send({
                    success: true,
                    message: "Success!!!"
                });
            });
        }
        catch (error) {
            res.sendStatus(500)
            console.error(error)
        }
    });
}
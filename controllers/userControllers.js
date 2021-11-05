const User = require('../models/User');

// Register New user
exports.registerNewUser = async (req, res) => {
    const { email, userName } = req.body;
    try {
        const oldUser = await User.findOne({ email: email })

        if (!oldUser) {
            const userInfo = {
                email: email,
                userName: userName
            }

            const newUser = new User(userInfo)
            await newUser.save();

            res.status(201).json(newUser);
        } else {
            res.status(200).json(oldUser);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const bcrypt = require("bcrypt")
const Member = require("../model/member")
const jwt = require("jsonwebtoken")
const authController = {
    //Register
    register: async (req, res) => {
        const { username, password } = req.body
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            // Create New Member
            const newMember = new Member({
                username: username,
                password: hashed
            })
            //save
            await newMember.save()
                .then((data) => {
                    res.redirect("/login")
                }
                )

            // return res.status(200).json(savedMember)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    loginMember: async (req, res) => {
        const { username, password } = req.body

        try {
            let errors = []

            if (!username || !password) {
                errors.push(({ msg: "Please enter all fields" }))
            }
            if (password.length < 6) {
                errors.push(({ msg: "Password should be at least 6 characters" }))
            }
            if (errors.length > 0) {
                res.render('login', { errors })
            } else {
                const user = await Member.findOne({ username: username })
                if (!user) {
                    errors.push(({ msg: "Wrong username" }))
                    res.render('login', { errors })
                    return res.end()

                }
                const validPassword = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!validPassword) {
                    errors.push(({ msg: "Wrong password" }))
                    res.render('login', { errors })
                    return res.end()

                }

                if (user && validPassword) {
                    const accessToken = jwt.sign({
                        id: user._id,
                    },
                        "ahuhu",
                        {
                            expiresIn: "5d"
                        }
                    );
                    const refreshToken = jwt.sign({
                        id: user._id,
                    },
                        "ahuhu",
                        {
                            expiresIn: "5d"
                        })
                    user.refreshToken = refreshToken;
                    user.save().then((data) => {
                        req.session.accessToken = accessToken;
                        req.session.refreshToken = refreshToken;

                        req.flash('success_msg', 'Login successfully');
                        res.redirect('/course');
                    });
                }


                //redicrect to course page and set accessToken for cookie

                // return res.status(200).json({ user, accessToken, refreshToken })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    loginForm: (req, res) => {
        res.render("login")
    },
    registerForm: (req, res) => {
        res.render("register")
    },
}

module.exports = authController;
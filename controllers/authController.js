const User = require('../models/User')
const jwt = require("jsonwebtoken")


const maxAge = 3 * 24 * 60 * 60;

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email :'', firstName: '', lastName: '', birthDate: '', country: '', password: '' }

    //incorrect email
    if (err.message === "incorrect email")
    {
        errors.email = "E-mail dosn't exist !!"
    }

    //incorrect password
    if (err.message === "incorrect password")
    {
        errors.password = "Incorrect password !!"
    }

    // Validation errors
    if (err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message

        })
    }

    // Duplicate error code
    if (err.code === 11000)
    {
        errors.email = "Email is already registered"
        return errors
    }
    return errors
}


module.exports.signup_post = async (req, res) => {
    const { email, firstName, lastName, birthDate, country, password } = req.body

    try
    {
        const user = await User.create({ email, firstName, lastName, birthDate, country, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })

        res.status(201).json({user: user._id})
    }
    catch (err)
    {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.login_post = async (req, res) => {
    const { email, password} = req.body

    try
    {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    }
    catch (err)
    {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.register_view = (req, res) => {
    res.render("register")
}


module.exports.login_view = (req, res) => {
    res.render("login")
}


module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect("/")
}

//Create json web token
const createToken = (id) => {
    return jwt.sign({ id }, 'IchigO banKai ! $ secret', {
        expiresIn: maxAge
    })
}
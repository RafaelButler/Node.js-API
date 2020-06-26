const joi = require("joi");
const DB = require("../queries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schema = require("../validation/validation");

module.exports = {
    async store(req, res) {
        // Receving person's data
        const personRegistration = req.body;

        // Validate if the data is correct
        const { error } = joi.validate(personRegistration, schema);

        if (error) {
            return res.json(error.message);
        } else {
            DB.query(
                "select email from users where email = $1",
                [personRegistration.email],
                async (err, results) => {
                    try {
                        if (
                            results.rows[0].email === personRegistration.email
                        ) {
                            return res.json({
                                message: "You already registerded"
                            });
                        }
                    } catch (error) {
                        // hasing password
                        //const salt = await bcrypt.genSalt(8);
                        const hashPassword = await bcrypt.hash(
                            JSON.stringify(personRegistration.password),
                            8
                        );

                        DB.query(
                            "insert into users (email, password) values ($1, $2)",
                            [personRegistration.email, hashPassword],
                            (err, results) => {
                                if (err) throw err;

                                return res
                                    .status(200)
                                    .json({ Response: "User Added " });
                            }
                        );
                    }
                }
            );
        }
    },

    async login(req, res) {
        // Receving person's data
        const personRegistration = req.body;

        // Validate if the data is correct
        const { error } = joi.validate(personRegistration, schema);

        if (error) {
            return res.json(error.message);
        } else {
            DB.query(
                "select * from users where email = $1",
                [personRegistration.email],
                async (err, results) => {
                    if (err) throw err;

                    try {
                        if (
                            results.rows[0].email === personRegistration.email
                        ) {
                            const validPassword = await bcrypt.compare(
                                personRegistration.password,
                                results.rows[0].password
                            );
                            if (validPassword) {
                                const secretToken = "ajshd";
                                const token = jwt.sign(
                                    {
                                        id: results.rows[0].id
                                    },
                                    secretToken
                                );
                                return res.header("auth", token);
                            }
                        }
                    } catch (error) {
                        return res.json({ message: "Email not found" });
                    }
                }
            );
        }
    }
};

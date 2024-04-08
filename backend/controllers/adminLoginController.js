const db = require('../database');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    console.log(req.body);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)

    db.query('SELECT * FROM admin WHERE username = ? limit 1', [req.body.username], async (error, result) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).send({
                success: false,
                error: 'Fetching admins failed: ' + error.message,
            });
        }
        if (!result.length) {
            return res.status(400).send({
                success: false,
                error: 'Username doesnt exist',
            });
        }

        const [admin] = result;

        const match = await bcrypt.compare(req.body.password, admin.password);

        if (!match) {
            return res.status(400).send({
                success: false,
                error: 'Wrong password',
            });
        }

        const token = jwt.sign({ id: admin.admin_id }, 'token', { expiresIn: 60 * 60 });
        res.status(200).send({
            success: true,
            data: token,
        });
    });
};

const approve = (req, res) => {
    console.log("approve", req.body, req.user, req.params)

    db.query('UPDATE Posts SET status = "approved", admin_id = ? WHERE post_id = ?', [req.user.id, req.params.id], (err, res) => {
        console.log("err", err)
        console.log("res", res)
    });

    return res.status(200).send({
        success: true,
    })
}

const deny = (req, res) => {
    console.log("deny", req.body, req.user, req.params)

    db.query('UPDATE Posts SET status = "rejected", admin_id = ? WHERE post_id = ?', [req.user.id, req.params.id], (err, res) => {
        console.log("err", err)
        console.log("res", res)
    });

    return res.status(200).send({
        success: true,
    })
}

const deletePost = (req, res) => {
    console.log("delete", req.body, req.user, req.params)

    db.query('DELETE FROM Posts WHERE post_id = ?', [req.params.id], (err, res) => {
        console.log("err", err)
        console.log("res", res)
    });

    return res.status(200).send({
        success: true,
    })
}

module.exports = {
    login,
    approve,
    deny,
    deletePost
};

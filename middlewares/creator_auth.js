import jwt from "jsonwebtoken"


function creator_vali(req, res, next) {

    try {

        if (req.cookies.jwt) {


            const token = req.cookies.jwt

            let decode = jwt.verify(token, process.env.SECRET_KEY)

            req.id = decode.data._id




            if (decode) {
                next()
            } else {
                return res.status(401).json({
                    message: "unauthorized"

                })
            }
        } else {
            return res.status(401).json({
                message: "unauthorized"
            })
        }
    } catch (err) {
        return res.status(500).json(
            { message: err.message }
        )
    }
}

export default creator_vali


import jwt from "jsonwebtoken"


function brand_vali(req, res, next) {

    try {

        if (req.cookies.jwt) {


            const token = req.cookies.jwt

            let decode = jwt.verify(token, process.env.SECRET_KEY)



            req.id = decode.data_2._id
            console.log(req.id)



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

export default brand_vali


const jwt = require("jsonwebtoken")

const tokenControl = (req, res, next) => {
  let token = req.headers.authorization
  if (!token)
    return res.status(401).json({ status: false, message: "Unauthorized" })

  jwt.verify(token, process.env.KEYFORJWT, (err, data) => {
    //verify fonksiyonunu kullanıyoruz.
    if (err)
      return res.status(404).json({
        //json yerine send de yazabiliriz.
        status: false,
        message: "Token is invalid",
      })
    req.data = data
    next()
  })
}
module.exports = tokenControl

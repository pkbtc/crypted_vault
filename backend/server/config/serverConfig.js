require('dotenv').config();

module.exports={

    MONGO_URL:process.env.MONGO_URL,
    PORT:process.env.PORT,
    JWT_SECRETKEY:process.env.JWT_SECRET,
    PINATA_API:process.env.PINATA_API,
    PINATA_SECRET_KEY:process.env.PINATA_SECRET
}
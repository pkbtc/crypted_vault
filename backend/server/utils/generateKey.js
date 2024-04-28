const cyrpto =require('crypto');

const generateEncryptionKey=(length)=>{
    return cyrpto.randomBytes(length/2).toString("hex");
};

module.exports={generateEncryptionKey};
const bcrypt = require('bcrypt')

 async function run () {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed =  await bcrypt.hash('aliciakeys', salt)
        console.log(salt);
        console.log(hashed);     
    }
    catch (err) {console.log(err);
    }
 }

 run()
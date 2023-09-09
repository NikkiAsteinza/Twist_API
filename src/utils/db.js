// Lib to anything related to mongo
const mongoose = require("mongoose");

//? guardamos en una variable nuestro link a la base de datos para poder conectar.
const DB_URL = process.env.DB_URL;

//? creamos la función que me conectará con la bbdd para poder exportarla y utilizarla en el index.js
const connectDB = async () => {

    //? intentamos conectarnos a la base de datos en el try, si no lo consigue sale por el catch
    try {
        //* mongoose.set("strctQuery", true) -> para evitar el warning en consola;
        mongoose.set("strictQuery", true);
        
        //! con la función connect de mongoose pasándole por parámatro el link de la base de datos conectaremos
        const db = await mongoose.connect(DB_URL);

        //? extraemos un dato que queramos mostrar en el console.log()
        const { host } = db.connection;

        //? informamos de que la conexión ha ido guay
        console.log("Connection stablished with the host " + host)

    } catch (error) {
       
        //? mensaje de error
        console.log("Error stablishing connection with the database, check this error -> ", error);

    }

}

//! exportamos la función para que pueda ser utilizada desde cualqueir archivo, en este caso la ejecutaremos en el index.js
module.exports = { connectDB }
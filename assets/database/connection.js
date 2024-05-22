const mongoose = require("mongoose")

const dbUser = process.env.DB_USER;
const dbPassaword = process.env.DB_PASS;

const connect = () => {
    mongoose.connect('')

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o mongoDB")
    })
    connection.on("open", () => {
        console.log("Conectado ao mongoDB com sucesso ")
    })
}
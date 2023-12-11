const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        const url='mongodb://jhoniudigital:1045@ac-qnxqmzd-shard-00-00.1j83waw.mongodb.net:27017,ac-qnxqmzd-shard-00-01.1j83waw.mongodb.net:27017,ac-qnxqmzd-shard-00-02.1j83waw.mongodb.net:27017/database?ssl=true&replicaSet=atlas-12jsj4-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(url);
        console.log('la coneccion ha sido exitosa');

    }catch(error){
        console.log(error);
    };
}
module.exports = {
    getConnection
}
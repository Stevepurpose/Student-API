const mongoose = require('mongoose')

function connectDatabase(){
    const options = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    
mongoose.set('strictQuery',true)
mongoose.connect(process.env.CONN_STR,options)
        .then(conn=>console.log('connected successfully'))
         .catch(err=>console.log('could not connect'))

}
module.exports=connectDatabase
const mongoose= require('mongoose'); 
const URI= 'mongodb://localhost/test-blog';
mongoose.connect(URI,{
  useUnifiedTopology: true,
  useNewUrlParser: true 
})
 
  .then(db=> console.log('db is connect'))
  .catch(err=> console.error(err));

module.exports=mongoose;
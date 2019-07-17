
const Images = require('./schema/images');

module.exports = function(app) {
 

//Send Images as Base64 Strings
app.post('/images', (req,res, next) => {
  const images = new Images({
    horizontal: req.body.horizontal,
    vertical: req.body.vertical,
    hsmall: req.body.hsmall,
    gallery: req.body.gallery
  });
  console.log(images);
   images.save()
   .then(result =>  res.send(result))
   .catch(err => res.send(err))
      
})
  

  //Get All Images 
  app.get('/images', (req, res) => {  
  
    Images.find({})
    .then(images => {
      res.json(images);
    })
    .catch(error => {
      res.json(error);
    });
  });


  

};


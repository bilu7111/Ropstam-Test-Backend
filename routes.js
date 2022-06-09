const { authController, carController, categoryController } = require("./controllers");
const auth = require("./middleware/auth");
const { check, param, oneOf } = require('express-validator');

module.exports = (app) => {
  app.post("/register", 
    oneOf([
        check('email').exists().isEmail(),
        check('password').exists().isLength({ min: 5 }),
        check('first_name').exists().isAlpha(),
        check('last_name').exists().isAlpha()
    ]),
    authController.signup);

  app.post("/login", 
        check('email').isEmail(),
        check('password').isLength({ min: 5 }), 
    authController.login);

  app.post("/cars",   
    oneOf([
        check('name'),
        check('color'), 
        check('model'), 
        check('category'), 
        check('manufacturer'),
        check('registration_no')
    ]),
    auth, carController.create);
  app.put("/cars", 
    oneOf([
        check('name'),
        check('color'), 
        check('model'), 
        check('category'), 
        check('manufacturer'),
        check('registration_no')
    ]),
    auth, carController.update);
  app.delete("/cars", auth, carController.delete);
  app.get("/cars/:limit/:skip", auth, carController.read);

  app.post("/categories", 
    oneOf([
        check('name')
    ]),  
    auth, categoryController.create);
  app.put("/categories", 
    oneOf([
        check('name')
    ]),  
    auth, categoryController.update);
  app.delete("/categories", auth, categoryController.delete);
  app.get("/categories/:limit/:skip", auth, categoryController.read);
};

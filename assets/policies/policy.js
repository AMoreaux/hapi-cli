module.exports = {

  default: `async (decoded, request) => {
    jwt.verify(request.headers.authorization, Config.get('server.auth.secretKey'), (err, decoded) => {
  
      if (typeof decoded === 'undefined') {
        return { isValid: false };
      }
  
      User.findOne({_id: decoded.iduser}).exec((err, currentUser) => {
      
        if (!currentUser || err) {
          return { isValid: false };
        }
 
        request.currentUser = currentUser;
        return { isValid: true };
      });
    });
  };`,

  admin: `async (decoded, request) => {
    jwt.verify(request.headers.authorization, Config.get('server.auth.secretKey'), (err, decoded) => {
  
      if (typeof decoded === 'undefined') {
        return { isValid: false };
      }
  
      User.findOne({_id: decoded.iduser, admin: true}).exec((err, currentUser) => {
  
        if (!currentUser || err) {
          return Boom.badRequest('You must be admin user');
        }
  
        request.currentUser = currentUser;
        return { isValid: true };
      });
    });
  };`,
};

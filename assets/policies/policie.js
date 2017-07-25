module.exports = {

  default: `(decoded, request, callback) => {
    jwt.verify(request.headers.authorization, Config.get('server.auth.secretKey'), (err, decoded) => {
  
      if (typeof decoded === 'undefined') {
        return callback(null, false);
      }
  
      User.findOne({_id: decoded.iduser}).exec((err, currentUser) => {
      
        if (!currentUser || err) {
          return callback(Boom.badRequest());
        }
 
        request.currentUser = currentUser;
        return callback(null, true);
      });
    });
  };`,

  admin: `(decoded, request, callback) => {
    jwt.verify(request.headers.authorization, Config.get('server.auth.secretKey'), (err, decoded) => {
  
      if (typeof decoded === 'undefined') {
        return callback(null, false);
      }
  
      User.findOne({_id: decoded.iduser, admin: true}).exec((err, currentUser) => {
  
        if (!currentUser || err) {
          return callback(Boom.badRequest('You must be admin user'));
        }
  
        request.currentUser = currentUser;
        return callback(null, true);
      });
    });
  };`,
};

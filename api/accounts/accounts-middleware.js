const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  
}

exports.checkAccountNameUnique = (req, res, next) => {
 
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const {id} = req.params;
    const account = await Accounts.getById(id);
    if(!account) {
      next({
        status: 404,
        message: 'account not found'
      });
    } else {
      req.account = account;
      next();
    }
  } catch(err) {
    next(err);
  }
}

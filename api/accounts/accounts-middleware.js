const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;
  if(name === undefined || budget === undefined) {
    return next({
      status: 400,
      message: 'name and budget are required'
    })
  }
  if(typeof name !== 'string'){
    return next({
      status: 400,
      message: 'name must be a string'
    })
  } 
  if(name.trim().length < 3  || name.trim().length > 100) {
    return next({
      status: 400,
      message: 'name of account must be between 3 and 100'
    })
  } 
  if(typeof budget !== 'number' || isNaN(budget)) {
    return next({
      status: 400,
      message: 'budget of account must be a number'
    })
  } 
  if(budget < 0 || budget > 1000000) {
    return next({
      status: 400,
      message: 'budget of account is too large or too small'
    })
  } 
  next();
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

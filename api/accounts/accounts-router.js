const router = require('express').Router()
const Accounts = require('./accounts-model');
const {
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch(err) {
    next(err);
  }
})

router.get('/:id', 
  checkAccountId, 
  (req, res, next) => { // eslint-disable-line
  res.json(req.account);
})

router.post('/', 
  checkAccountPayload,
  checkAccountNameUnique, 
  async (req, res, next) => {
  try {
    const {name, budget} = req.body;
    const newAccount = await Accounts.create({
      name: name.trim(), 
      budget: budget
    });
    res.status(201).json(newAccount);
  }catch(err) {
    next(err);
  }
})

router.put('/:id', 
  checkAccountId, 
  checkAccountPayload, 
  async (req, res, next) => {
  try {
   const {id} = req.params;
   const {name, budget} = req.body;
   const updatedAccount = await Accounts.updateById(id, {
    name: name.trim(), 
    budget: budget
  });
   res.json(updatedAccount);
  }catch(err) {
    next(err);
  }
});

router.delete('/:id', 
  checkAccountId, 
  async (req, res, next) => {
  try {
    const {id} = req.params;
    await Accounts.deleteById(id);
    res.json(req.account);
  }catch(err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong with the server'
  })
})

module.exports = router;

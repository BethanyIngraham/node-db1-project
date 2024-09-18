const router = require('express').Router()
const Accounts = require('./accounts-model');


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch(err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  
})

router.post('/', (req, res, next) => {
 
})

router.put('/:id', (req, res, next) => {
 
});

router.delete('/:id', (req, res, next) => {
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong with the server'
  })
})

module.exports = router;

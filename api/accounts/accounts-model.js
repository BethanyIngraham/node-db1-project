const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  
}

const create = account => {
  
}

const updateById = (id, account) => {

}

const deleteById = id => {
  
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

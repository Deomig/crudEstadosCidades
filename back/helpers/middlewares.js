function mustBeInteger(req, res, next) {
  const id = req.params.id
  if (!Number.isInteger(parseInt(id))) {
      res.status(400).json({ message: 'ID deve ser interger' })
  } else {
      next()
  }
}
function checkFieldsPostEstado(req, res, next) { 
  const { nome, sigla } = req.body  
  if (nome && sigla) {
      next()
  } else {
      res.status(400).json({ message: 'melhorar os campos' })
  }
}
function checkFieldsPostCidade(req, res, next) { 
  const { nome, idEstado } = req.body  
  if (nome && idEstado) {
      next()
  } else {
      res.status(400).json({ message: 'melhorar os campos' })
  }
}
module.exports = {
  mustBeInteger,
  checkFieldsPostEstado,
  checkFieldsPostCidade
}
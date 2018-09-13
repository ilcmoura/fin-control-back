import * as _ from 'lodash'
const Discipline = require('./discipline')

Discipline.methods(['get', 'post', 'put', 'delete'])
Discipline.updateOptions({new: true, runValidators: true})

Discipline.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

Discipline.route(':id', function(req, res, next) {
  Discipline.find({id:req.params.id}, function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.status(200).json(value);
    }
  })
})

Discipline.route('count', function(req, res, next) {
  Discipline.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = Discipline

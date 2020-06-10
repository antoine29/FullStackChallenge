const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', req => JSON.stringify(req.body))
const morganRequestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	switch (error.name) {
	case 'CastError': return response.status(400).send({ error: 'malformatted input' })
	case 'ValidationError': return response.status(400).json({ error: error.message })
	default: logger.error(error.message)
	}

	next(error)
}

module.exports = {
	morganRequestLogger,
	requestLogger,
	unknownEndpoint,
	errorHandler
}
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

const tokenHandler = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer '))
		request.token = authorization.substring(7)

	next()
}

const errorHandler = (error, request, response, next) => {
	switch (error.name) {
	case 'CastError': return response.status(400).send({ error: 'malformatted input' })
	case 'ValidationError': return response.status(400).json({ error: error.message })
	case 'JsonWebTokenError': return response.status(401).json({ error: error.message })
	default: logger.error(error.message)
	}

	next(error)
}


module.exports = {
	morganRequestLogger,
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenHandler
}
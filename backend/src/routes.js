const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const Ongcontrollers = require('./controllers/OngControllers');
const IncidentsControllers = require('./controllers/IncidentsControllers');
const SessionControllers = require('./controllers/SessionControllers');

routes.get('/ongs', Ongcontrollers.list);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), Ongcontrollers.create);


routes.post('/incidents', IncidentsControllers.create);

routes.get('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), IncidentsControllers.list);

routes.get('/incidentsall', IncidentsControllers.listAll);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsControllers.delete);

routes.post('/session', SessionControllers.create);
module.exports = routes;


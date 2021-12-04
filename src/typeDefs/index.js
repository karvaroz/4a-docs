//Se llama al typedef (esquema) de cada submodulo
const affiliatesTypeDefs = require('./affiliates_type_defs');
const covidSurveyTypeDefs = require('./covidSurvey_type_defs');
const authTypeDefs = require('./auth_type_defs');

//Se unen
const schemasArrays = [authTypeDefs, affiliatesTypeDefs, covidSurveyTypeDefs];

//Se exportan
module.exports = schemasArrays;

//Revisar
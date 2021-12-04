const { RESTDataSource } = require("apollo-datasource-rest");
const serverConfig = require("../server");
class AffiliatesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = serverConfig.affiliates_api_url;
  }
  async createAffiliate(affiliate) {
    affiliate = new Object(JSON.parse(JSON.stringify(affiliate)));
    return await this.post("/affiliates", affiliate);
  }
  async affiliatesByDocument_number(document_number) {
    return await this.get(`/affiliates/${document_number}`);
  }
  async createSurvay(covidSurvey) {
    covidSurvey = new Object(JSON.parse(JSON.stringify(covidSurvey)));
    return await this.post("/surveys", covidSurvey);
  }
  async surveyByDocument_number(document_number) {
    return await this.get(`/surveys/${document_number}`);
  }
}

module.exports = AffiliatesAPI;

//revisar cuando se tenga el microservicio de encuentas covid
//si necesita alguna modificación
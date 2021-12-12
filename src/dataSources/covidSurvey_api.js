const { RESTDataSource } = require("apollo-datasource-rest");
const serverConfig = require("../server");
class SurveyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = serverConfig.covidSurvey_api_url;
  }
  async createSurvey(user) {
    user = new Object(JSON.parse(JSON.stringify(user)));
    return await this.post(`/surveys`, user);
  }
  async getSurveysByDocument(userId) {
    return await this.get(`/surveys/${userId}`);
  }
}

module.exports = SurveyAPI;
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const AffiliatesAPI = require("./dataSources/affiliates_api");
const surveysAPI = require("./dataSources/covidSurvey_api");
const AuthAPI = require("./dataSources/auth_api");
const authentication = require("./utils/authentication");

const server = new ApolloServer({
  context: authentication,
  typeDefs,
  resolvers,
  dataSources: () => ({
    affiliatesAPI: new AffiliatesAPI(),
    surveysAPI: new surveysAPI(),
    authAPI: new AuthAPI(),
  }),
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

//revisar
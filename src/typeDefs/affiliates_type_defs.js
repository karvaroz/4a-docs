const { gql } = require("apollo-server");

const affiliatesTypeDefs = gql`
  type Affiliates {
    id: Int!
    name: String!
    lastname: String!
    document
    document_number: String!
    email: String!   
    phone: String!
    city: String!
    address: String!
    created: String!
    updated: String!
  }
  extend type Query {
    affiliatesByDocument_number(document_number: String!): Affiliates
  }
`;

module.exports = affiliatesTypeDefs;

//revisar
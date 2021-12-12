const { gql } = require("apollo-server");

const affiliatesTypeDefs = gql`
  type Affiliates {
    id: Int!
    name: String!
    lastname: String!
    document: String!
    email: String!   
    phone: String!
    city: String!
    address: String!
    created: String!
    updated: String!
  }
  input affiliateInput {
    id: Int!
    name: String!
    lastname: String!
    document: String!
    email: String!   
    phone: String!
    city: String!
    address: String!
  }
  type Mutation {
    createAffiliate(affiliateInput: affiliateInput): String
    updateAffiliate(id: int!,affiliateInput: affiliateInput!): String
    deleteAffiliate(id: int!): String
  }
  extend type Query {
    allAffiliates(): [Affiliates]
    affiliatesByDocument(document: String!): Affiliates
  }
  
`;

module.exports = affiliatesTypeDefs;

//revisar
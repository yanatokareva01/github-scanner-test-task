export const typeDefs = `#graphql
  type Repository {
    name: String!
    size: Int!
    owner: String!
  }
  
  type Webhook {
    id: Int!
    name: String!
  }
  
  type RepositoryDetails {
    name: String!
    size: Int!
    owner: String!
    isPrivate: Boolean!
    numberOfFiles: Int!
    ymlFileContent: String
    activeWebhooks: [Webhook!]!
  }

  type Query {
    repositoriesList(accessToken: String!): [Repository!]!
    repositoryDetails(accessToken: String!, owner: String!, repositoryName: String!): RepositoryDetails!
  }
`;

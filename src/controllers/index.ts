import * as repositoriesController from './repositories/index';

export const controllers = {
  typeDefs: [repositoriesController.typeDefs],
  resolvers: [repositoriesController.resolvers],
};

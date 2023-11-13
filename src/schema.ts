import { makeExecutableSchema } from '@graphql-tools/schema';
import { controllers } from './controllers';

export const schema = makeExecutableSchema({
  typeDefs: controllers.typeDefs,
  resolvers: controllers.resolvers,
});

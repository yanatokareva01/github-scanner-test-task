import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { schema } from './schema';

const server = new ApolloServer({
  schema,
});

const port = 4000;

await startStandaloneServer(server, { listen: { port } });

console.log(`Server listening on port ${port}`);

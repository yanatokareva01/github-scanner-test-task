import { ApolloServer } from '@apollo/server';
import { setupServer } from 'msw/node';
import { schema } from '../schema';

jest.setTimeout(10_000000);

export const testServer = new ApolloServer({
  schema,
});
export const internet = setupServer();

beforeAll(() => internet.listen({ onUnhandledRequest: 'error' }));

beforeEach(() => {
  internet.resetHandlers();
  jest.resetAllMocks();
});

afterAll(() => internet.close());

export async function testApi(gql: string, variables: object) {
  if (!testServer) {
    throw new Error('Apollo server is not ready');
  }

  const result = await testServer.executeOperation({ query: gql, variables });
  if (result.body.kind !== 'single') {
    throw new Error('Not supported');
  }

  if (result.body.singleResult.errors?.length) {
    throw new Error(
      `Api errors: ${result.body.singleResult.errors.map((e) => e.message).join('; ')}`,
    );
  }

  return result.body.singleResult.data;
}

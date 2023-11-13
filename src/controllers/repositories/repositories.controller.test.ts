import { faker } from '@faker-js/faker';
import { testApi, internet } from '../../tests/setupTests';
import {
  fakeGithubRepository,
  fakeGithubRepositoryFileContent,
  fakeGithubRepositoryTree,
  fakeGithubWebhook,
} from '../../tests/fakers/github.faker';
import {
  nockGetRepositoriesList,
  nockGetRepository,
  nockGetRepositoryFileContent,
  nockGetRepositoryTree,
  nockGetRepositoryWebhooks,
} from '../../tests/nocks/github.nock';

describe('repositories', () => {
  describe('get repositories list', () => {
    describe('success', () => {
      it('returns list of repositories', async () => {
        const accessToken = faker.string.uuid();
        const repository = fakeGithubRepository();

        internet.resetHandlers(nockGetRepositoriesList(accessToken, [repository]));

        const result = await testApi(
          /* GraphQL */ `
            query GetRepositoriesList($accessToken: String!) {
              repositoriesList(accessToken: $accessToken) {
                name
                size
                owner
              }
            }
          `,
          { accessToken },
        );

        expect(result).toMatchObject({
          repositoriesList: [
            {
              name: repository.name,
              size: repository.size,
              owner: repository.owner.login,
            },
          ],
        });
      });
    });

    describe('errors', () => {
      // TODO
    });
  });

  describe('get repository details', () => {
    describe('success', () => {
      it('returns repository details', async () => {
        const accessToken = faker.string.uuid();
        const owner = faker.string.alphanumeric();
        const repositoryName = faker.string.alphanumeric();

        const repository = fakeGithubRepository({ owner: { login: owner } });
        const webhook = fakeGithubWebhook();
        const tree = fakeGithubRepositoryTree();
        const file = fakeGithubRepositoryFileContent();

        internet.resetHandlers(
          nockGetRepository({ accessToken, owner, repositoryName }, repository),
          nockGetRepositoryWebhooks({ accessToken, owner, repositoryName }, [webhook]),
          nockGetRepositoryTree(
            { accessToken, owner, repositoryName, sha: repository.default_branch },
            tree,
          ),
          nockGetRepositoryFileContent(
            { accessToken, owner, repositoryName, path: 'test.yml' },
            file,
          ),
        );

        const result = await testApi(
          /* GraphQL */ `
            query GetRepositoryDetails(
              $accessToken: String!
              $owner: String!
              $repositoryName: String!
            ) {
              repositoryDetails(
                accessToken: $accessToken
                owner: $owner
                repositoryName: $repositoryName
              ) {
                name
                size
                owner
                isPrivate
                numberOfFiles
                ymlFileContent
                activeWebhooks {
                  id
                  name
                }
              }
            }
          `,
          { accessToken, owner, repositoryName },
        );

        expect(result).toMatchObject({
          repositoryDetails: {
            name: repository.name,
            owner: repository.owner.login,
            size: repository.size,
            isPrivate: repository.private,
            numberOfFiles: tree.tree.filter((f) => f.type === 'blob').length,
            activeWebhooks: [{ id: webhook.id, name: webhook.name }],
            ymlFileContent: file.content,
          },
        });
      });
    });

    describe('errors', () => {
      // TODO
    });
  });
});

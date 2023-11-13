import {
  getRepositoryFilesNumber,
  getGithubRepositories,
  getRepositoryDetails,
  getYmlFileContentFromRepository,
  getRepositoryActiveWebhooks,
} from '../../services/githubScanner.service';
import { limit } from '../../lib/simpleRateLimiter';

interface GetRepositoryDetailsArguments {
  accessToken: string;
  owner: string;
  repositoryName: string;
}

export const resolvers = {
  Query: {
    repositoriesList: async (parent: object, { accessToken }: { accessToken: string }) => {
      return getGithubRepositories(accessToken);
    },
    // repositoryDetails: async (parent: object, args: GetRepositoryDetailsArguments) => {
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, 10000);
    //   });
    //   return {
    //     ...args,
    //     ...(await getRepositoryDetails(args.accessToken, args.owner, args.repositoryName)),
    //   };
    // },
    repositoryDetails: limit(async (parent: object, args: GetRepositoryDetailsArguments) => {
      return {
        ...args,
        ...(await getRepositoryDetails(args.accessToken, args.owner, args.repositoryName)),
      };
    }, 2),
  },
  RepositoryDetails: {
    activeWebhooks: (parent: GetRepositoryDetailsArguments) =>
      getRepositoryActiveWebhooks(parent.accessToken, parent.owner, parent.repositoryName),
    numberOfFiles: (parent: { defaultBranch: string } & GetRepositoryDetailsArguments) =>
      getRepositoryFilesNumber(
        parent.accessToken,
        parent.owner,
        parent.repositoryName,
        parent.defaultBranch,
      ),
    ymlFileContent: (parent: { defaultBranch: string } & GetRepositoryDetailsArguments) =>
      getYmlFileContentFromRepository(
        parent.accessToken,
        parent.owner,
        parent.repositoryName,
        parent.defaultBranch,
      ),
  },
};

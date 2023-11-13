import { Octokit } from 'octokit';

export async function getGithubRepositories(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });

  const repositories = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser);

  return repositories.map((repository) => ({
    name: repository.name,
    size: repository.size,
    owner: repository.owner.login,
  }));
}

export async function getRepositoryDetails(
  accessToken: string,
  owner: string,
  repositoryName: string,
) {
  const octokit = new Octokit({ auth: accessToken });

  const { data: repository } = await octokit.rest.repos.get({
    owner,
    repo: repositoryName,
  });

  return {
    name: repository.name,
    size: repository.size,
    owner: repository.owner.login,
    isPrivate: repository.private,
    defaultBranch: repository.default_branch,
  };
}

export async function getRepositoryFilesNumber(
  accessToken: string,
  owner: string,
  repositoryName: string,
  defaultBranch: string,
): Promise<number> {
  const octokit = new Octokit({ auth: accessToken });

  const { data: tree } = await octokit.rest.git.getTree({
    owner,
    repo: repositoryName,
    tree_sha: defaultBranch,
    recursive: '1',
  });

  return tree.tree.filter((file) => file.type === 'blob').length;
}

export async function getYmlFileContentFromRepository(
  accessToken: string,
  owner: string,
  repositoryName: string,
  defaultBranch: string,
) {
  const octokit = new Octokit({ auth: accessToken });

  const { data: tree } = await octokit.rest.git.getTree({
    owner,
    repo: repositoryName,
    tree_sha: defaultBranch,
  });

  const ymlFile = tree.tree.find((file) => file.path && file.path.match(/\.(yml)|(yaml)$/));

  if (!ymlFile?.path) {
    return null;
  }

  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo: repositoryName,
    path: ymlFile.path,
  });

  return 'content' in data ? data.content : null;
}

export async function getRepositoryActiveWebhooks(
  accessToken: string,
  owner: string,
  repositoryName: string,
) {
  const octokit = new Octokit({ auth: accessToken });

  const webhooks = await octokit.paginate(octokit.rest.repos.listWebhooks, {
    owner,
    repo: repositoryName,
  });

  return webhooks
    .filter(({ active }) => active)
    .map(({ id, name }) => ({
      id,
      name,
    }));
}

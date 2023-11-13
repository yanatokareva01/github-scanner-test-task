import { http, HttpResponse } from 'msw';

const githubApiUrl = 'https://api.github.com';

export function nockGetRepositoriesList(accessToken: string, result: object[] = []) {
  return http.get(`${githubApiUrl}/user/repos`, ({ request }) => {
    expect(request.headers.get('Authorization')).toEqual(`token ${accessToken}`);
    return HttpResponse.json(result);
  });
}

export function nockGetRepository(
  {
    accessToken,
    owner,
    repositoryName,
  }: {
    accessToken: string;
    owner: string;
    repositoryName: string;
  },
  result: object,
) {
  return http.get(`${githubApiUrl}/repos/${owner}/${repositoryName}`, ({ request }) => {
    expect(request.headers.get('Authorization')).toEqual(`token ${accessToken}`);
    return HttpResponse.json(result);
  });
}

export function nockGetRepositoryWebhooks(
  {
    accessToken,
    owner,
    repositoryName,
  }: {
    accessToken: string;
    owner: string;
    repositoryName: string;
  },
  result: object[] = [],
) {
  return http.get(`${githubApiUrl}/repos/${owner}/${repositoryName}/hooks`, ({ request }) => {
    expect(request.headers.get('Authorization')).toEqual(`token ${accessToken}`);
    return HttpResponse.json(result);
  });
}

export function nockGetRepositoryTree(
  {
    accessToken,
    owner,
    repositoryName,
    sha,
  }: {
    accessToken: string;
    owner: string;
    repositoryName: string;
    sha: string;
  },
  result: object,
) {
  return http.get(
    `https://api.github.com/repos/${owner}/${repositoryName}/git/trees/${sha}`,
    ({ request }) => {
      expect(request.headers.get('Authorization')).toEqual(`token ${accessToken}`);
      return HttpResponse.json(result);
    },
  );
}

export function nockGetRepositoryFileContent(
  {
    accessToken,
    owner,
    repositoryName,
    path,
  }: {
    accessToken: string;
    owner: string;
    repositoryName: string;
    path: string;
  },
  result: object,
) {
  return http.get(
    `https://api.github.com/repos/${owner}/${repositoryName}/contents/${path}`,
    ({ request }) => {
      expect(request.headers.get('Authorization')).toEqual(`token ${accessToken}`);
      return HttpResponse.json(result);
    },
  );
}

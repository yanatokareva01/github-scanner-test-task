import { faker } from '@faker-js/faker';

export function fakeGithubRepository(overrides?: object) {
  return {
    default_branch: faker.string.alphanumeric(),
    id: faker.number.int(),
    private: faker.datatype.boolean(),
    name: faker.string.sample(),
    owner: {
      login: faker.string.sample(),
    },
    size: faker.number.int(100),
    ...overrides,
  };
}

export function fakeGithubWebhook() {
  return {
    type: 'Repository',
    id: faker.number.int(100),
    name: 'web',
    active: true,
    events: ['create', 'push'],
    config: {
      content_type: 'form',
      insecure_ssl: '0',
      url: 'https://test.test',
    },
    updated_at: '2023-11-12T14:33:22Z',
    created_at: '2023-11-12T14:33:22Z',
    url: faker.internet.url(),
    test_url: faker.internet.url(),
    ping_url: faker.internet.url(),
    deliveries_url: faker.internet.url(),
    last_response: {
      code: 502,
      status: 'connection_error',
      message: 'failed to connect to host',
    },
  };
}

export function fakeGithubRepositoryTree(overrides?: object) {
  return {
    tree: [
      {
        path: '.gitignore',
        type: 'blob',
      },
      {
        path: 'test.yml',
        type: 'tree',
      },
    ],
    truncated: false,
    ...overrides,
  };
}

export function fakeGithubRepositoryFileContent(overrides?: object) {
  return {
    name: '.gitignore',
    path: '.gitignore',
    sha: faker.string.uuid(),
    size: 18,
    type: 'file',
    content: 'bm9kZV9tb2R1bGVzCi5pZGVh\n',
    encoding: 'base64',
    ...overrides,
  };
}

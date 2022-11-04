const { fetchRecursively } = require("./helpers");

async function listPullRequests(codeCommitClient, params) {
  const pullRequestIds = await fetchRecursively(codeCommitClient, {
    methodName: "listPullRequests",
    outputDataPath: "pullRequestIds",
  }, {
    repositoryName: params.repository,
  }).catch((error) => {
    throw new Error(`Failed to list pull requests: ${error.message || JSON.stringify(error)}`);
  });

  const pullRequestsData = await Promise.all(
    pullRequestIds.map(
      (pullRequestId) => codeCommitClient
        .getPullRequest({ pullRequestId })
        .promise()
        .then(({ pullRequest }) => pullRequest),
    ),
  );

  return pullRequestsData;
}

async function listRepos(codeCommitClient) {
  const repositories = await fetchRecursively(codeCommitClient, {
    methodName: "listRepositories",
    outputDataPath: "repositories",
  }).catch((error) => {
    throw new Error(`Failed to list repositories: ${error.message || JSON.stringify(error)}`);
  });

  return repositories;
}

async function listBranches(codeCommitClient, params) {
  const branches = await fetchRecursively(codeCommitClient, {
    methodName: "listBranches",
    outputDataPath: "branches",
  }, {
    repositoryName: params.repository,
  }).catch((error) => {
    throw new Error(`Failed to list branches: ${error.message || JSON.stringify(error)}`);
  });

  return branches;
}

module.exports = {
  listPullRequests,
  listRepos,
  listBranches,
};

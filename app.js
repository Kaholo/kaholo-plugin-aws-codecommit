const AWS = require("aws-sdk");
const awsPluginLibrary = require("kaholo-aws-plugin-library");
const payloadFunctions = require("./payload-functions");
const autocomplete = require("./autocomplete");
const { fetchRecursively } = require("./helpers");

const simpleAwsMethods = {
  createRepository: awsPluginLibrary.generateAwsMethod("createRepository", payloadFunctions.prepareCreateRepositoryPayload),
  createBranch: awsPluginLibrary.generateAwsMethod("createBranch", payloadFunctions.prepareCreateBranchPayload),
  createPullRequest: awsPluginLibrary.generateAwsMethod("createPullRequest", payloadFunctions.prepareCreatePullRequestPayload),
  getPullRequest: awsPluginLibrary.generateAwsMethod("getPullRequest", payloadFunctions.prepareGetPullRequestPayload),
};

async function listRepos(codeCommitClient) {
  const repositories = await fetchRecursively(codeCommitClient, {
    methodName: "listRepositories",
    outputDataPath: "repositories",
  }).catch((error) => {
    throw new Error(`Failed to list repositories: ${error.message || JSON.stringify(error)}`);
  });
  return { repositories };
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
  return { branches };
}

async function listPullRequests(codeCommitClient, params) {
  const pullRequestIds = await fetchRecursively(codeCommitClient, {
    methodName: "listPullRequests",
    outputDataPath: "pullRequestIds",
  }, {
    repositoryName: params.repository,
  }).catch((error) => {
    throw new Error(`Failed to list pull requests: ${error.message || JSON.stringify(error)}`);
  });
  return { pullRequestIds };
}

module.exports = awsPluginLibrary.bootstrap(
  AWS.CodeCommit,
  {
    ...simpleAwsMethods,
    listRepos,
    listBranches,
    listPullRequests,
  },
  {
    listRegions: awsPluginLibrary.autocomplete.listRegions,
    ...autocomplete,
  },
  {
    ACCESS_KEY: "awsAccessKeyId",
    SECRET_KEY: "awsSecretAccessKey",
    REGION: "awsRegion",
  },
);

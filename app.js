const AWS = require("aws-sdk");
const awsPluginLibrary = require("@kaholo/aws-plugin-library");

const codeCommitService = require("./code-commit-service");
const payloadFunctions = require("./payload-functions");
const autocomplete = require("./autocomplete");

const simpleAwsMethods = {
  createRepository: awsPluginLibrary.generateAwsMethod("createRepository", payloadFunctions.prepareCreateRepositoryPayload),
  createBranch: awsPluginLibrary.generateAwsMethod("createBranch", payloadFunctions.prepareCreateBranchPayload),
  createPullRequest: awsPluginLibrary.generateAwsMethod("createPullRequest", payloadFunctions.prepareCreatePullRequestPayload),
  getPullRequest: awsPluginLibrary.generateAwsMethod("getPullRequest", payloadFunctions.prepareGetPullRequestPayload),
};

async function listRepos(codeCommitClient, params) {
  const repositories = await codeCommitService.listRepos(codeCommitClient, params);
  return { repositories };
}

async function listBranches(codeCommitClient, params) {
  const branches = await codeCommitService.listBranches(codeCommitClient, params);
  return { branches };
}

async function listPullRequests(codeCommitClient, params) {
  const pullRequests = await codeCommitService.listPullRequests(codeCommitClient, params);
  return { pullRequests };
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
    ACCESS_KEY: "accessKeyId",
    SECRET_KEY: "secretAccessKey",
    REGION: "region",
  },
);

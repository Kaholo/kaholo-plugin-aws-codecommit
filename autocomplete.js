const awsPluginLibrary = require("kaholo-aws-plugin-library");
const { fetchRecursively } = require("./helpers");

async function listReposAuto(query, params, codeCommitClient) {
  const fetchResult = await fetchRecursively(codeCommitClient, {
    methodName: "listRepositories",
    outputDataPath: "repositories",
  }).catch((error) => {
    throw new Error(`Failed to fetch repositories: ${error.message || JSON.stringify(error)}`);
  });

  const mappedAutocompleteItems = fetchResult.map(({ repositoryName }) => (
    awsPluginLibrary.autocomplete.toAutocompleteItemFromPrimitive(repositoryName)
  ));
  return awsPluginLibrary.autocomplete.filterItemsByQuery(mappedAutocompleteItems, query);
}

async function listBranchesAuto(query, params, codeCommitClient) {
  const fetchResult = await fetchRecursively(codeCommitClient, {
    methodName: "listBranches",
    outputDataPath: "branches",
  }, {
    repositoryName: params.repository,
  }).catch((error) => {
    throw new Error(`Failed to fetch branches: ${error.message || JSON.stringify(error)}`);
  });

  const mappedAutocompleteItems = fetchResult.map((branch) => (
    awsPluginLibrary.autocomplete.toAutocompleteItemFromPrimitive(branch)
  ));
  return awsPluginLibrary.autocomplete.filterItemsByQuery(mappedAutocompleteItems, query);
}

async function listPullRequestsAuto(query, params, codeCommitClient) {
  const fetchResult = await fetchRecursively(codeCommitClient, {
    methodName: "listPullRequests",
    outputDataPath: "pullRequestIds",
  }, {
    repositoryName: params.repository,
  }).catch((error) => {
    throw new Error(`Failed to fetch pull requests: ${error.message || JSON.stringify(error)}`);
  });

  const mappedAutocompleteItems = fetchResult.map((pullRequestId) => (
    awsPluginLibrary.autocomplete.toAutocompleteItemFromPrimitive(pullRequestId)
  ));
  return awsPluginLibrary.autocomplete.filterItemsByQuery(mappedAutocompleteItems, query);
}

module.exports = {
  listReposAuto,
  listBranchesAuto,
  listPullRequestsAuto,
};

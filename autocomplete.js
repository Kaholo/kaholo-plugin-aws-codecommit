const awsPluginLibrary = require("@kaholo/aws-plugin-library");

const codeCommitService = require("./code-commit-service");

function createAwsAutocompleteFunction(codeCommitServiceMethodName, { buildId, buildLabel } = {}) {
  return async (query, params, codeCommitClient) => {
    const fetchedData = (
      await codeCommitService[codeCommitServiceMethodName](codeCommitClient, params)
    );

    const mappedAutocompleteItems = fetchedData.map((fetchedItem) => {
      const autocompleteValue = buildId ? buildId(fetchedItem) : fetchedItem;
      const autocompleteLabel = buildLabel ? buildLabel(fetchedItem) : autocompleteValue;
      return awsPluginLibrary.autocomplete.toAutocompleteItemFromPrimitive(
        autocompleteValue,
        autocompleteLabel,
      );
    });

    return awsPluginLibrary.autocomplete.filterItemsByQuery(mappedAutocompleteItems, query);
  };
}

module.exports = {
  listReposAuto: createAwsAutocompleteFunction(
    "listRepos",
    {
      buildId: ({ repositoryName }) => repositoryName,
    },
  ),
  listBranchesAuto: createAwsAutocompleteFunction(
    "listBranches",
  ),
  listPullRequestsAuto: createAwsAutocompleteFunction(
    "listPullRequests",
    {
      buildId: ({ pullRequestId }) => pullRequestId,
      buildLabel: ({ pullRequestId, title }) => `${pullRequestId}: ${title}`,
    },
  ),
};

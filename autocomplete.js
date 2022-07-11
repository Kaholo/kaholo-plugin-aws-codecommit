const awsPluginLibrary = require("kaholo-aws-plugin-library");
const { fetchRecursively } = require("./helpers");

function createAwsAutocompleteFunction(
  methodName,
  outputDataPath,
  [valuePath, labelPath] = [],
  buildPayload = null,
) {
  return async (query, params, codeCommitClient) => {
    const payload = buildPayload !== null ? buildPayload(params) : {};
    const fetchResult = await fetchRecursively(
      codeCommitClient,
      {
        methodName,
        outputDataPath,
      },
      payload,
    ).catch((error) => {
      throw new Error(`Failed to list ${outputDataPath.toLowerCase()}: ${error.message || JSON.stringify(error)}`);
    });

    const mappedAutocompleteItems = fetchResult.map((fetchedItem) => {
      const autocompleteValue = valuePath ? fetchedItem[valuePath] : fetchedItem;
      const autocompleteLabel = labelPath ? fetchedItem[labelPath] : autocompleteValue;
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
    "listRepositories",
    "repositories",
    ["repositoryName"],
  ),
  listBranchesAuto: createAwsAutocompleteFunction(
    "listBranches",
    "branches",
    [],
    (params) => ({ repositoryName: params.repository }),
  ),
  listPullRequestsAuto: createAwsAutocompleteFunction(
    "listPullRequests",
    "pullRequestIds",
    [],
    (params) => ({ repositoryName: params.repository }),
  ),
};

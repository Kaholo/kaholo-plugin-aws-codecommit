const awsPluginLibrary = require("kaholo-aws-plugin-library");
const { fetchRecursively } = require("./helpers");

async function createAwsAutocompleteFunction(
  methodName,
  outputDataPath,
  [valuePath, labelPath] = [],
) {
  return async (query, params, codeCommitClient) => {
    const fetchResult = await fetchRecursively(codeCommitClient, {
      methodName,
      outputDataPath,
    }).catch((error) => {
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
  listReposAuto: createAwsAutocompleteFunction("listRepositories", "repositories", ["repositoryName"]),
  listBranchesAuto: createAwsAutocompleteFunction("listBranches", "branches"),
  listPullRequestsAuto: createAwsAutocompleteFunction("listPullRequests", "pullRequestIds"),
};

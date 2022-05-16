async function fetchRecursively(awsClient, fetchOptions = {}, payload = {}) {
  const methodPayload = { ...payload };
  if (fetchOptions.nextToken) {
    methodPayload.nextToken = fetchOptions.nextToken;
  }

  const fetchResult = await awsClient[fetchOptions.methodName](methodPayload).promise();
  const fetchedItems = fetchResult[fetchOptions.outputDataPath];

  if (!fetchResult.nextToken) {
    return fetchedItems;
  }

  const recursiveItems = await fetchRecursively(awsClient, {
    ...fetchOptions,
    nextToken: fetchResult.nextToken,
  }, payload);
  return fetchedItems.concat(recursiveItems);
}

module.exports = {
  fetchRecursively,
};

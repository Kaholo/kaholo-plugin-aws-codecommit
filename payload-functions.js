function prepareCreateRepositoryPayload(params) {
  const tags = Object.fromEntries(
    params.tags.map((tag) => {
      const [key, ...rest] = tag.split("=");
      return [key, rest.join("=")];
    }),
  );

  return {
    repositoryName: params.name,
    repositoryDescription: params.description,
    tags,
  };
}

function prepareCreateBranchPayload(params) {
  return {
    branchName: params.name,
    commitId: params.commit,
    repositoryName: params.repository,
  };
}

function prepareCreatePullRequestPayload(params) {
  return {
    title: params.title,
    description: params.description,
    targets: [{
      repositoryName: params.repository,
      sourceReference: params.sourceBranch,
      destinationReference: params.targetBranch,
    }],
  };
}

function prepareGetPullRequestPayload(params) {
  return {
    pullRequestId: params.pullRequest,
  };
}

module.exports = {
  prepareCreateRepositoryPayload,
  prepareCreateBranchPayload,
  prepareCreatePullRequestPayload,
  prepareGetPullRequestPayload,
};

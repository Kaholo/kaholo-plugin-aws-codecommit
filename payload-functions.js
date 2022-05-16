function prepareCreateRepositoryPayload(params) {
  return {
    repositoryName: params.name,
    repositoryDescription: params.description,
    tags: params.tags,
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

const parsers = require("./parsers");

const CodeCommitService = require('./aws.codecommit.service');

async function createRepository(action, settings){
    const { name, description, tags } = action.params;

    const client = CodeCommitService.from(action.params, settings);
    return client.createRepository({
        name: parsers.string(name),
        description: parsers.string(description),
        tags: parsers.array(tags)
    });
}

async function createBranch(action, settings){
    const { name, repository, commit } = action.params;
    
    const client = CodeCommitService.from(action.params, settings);
    return client.createBranch({
        name: parsers.string(name),
        repository: parsers.autocomplete(repository),
        commit: parsers.string(commit)
    });
}

async function createPullRequest(action, settings){
    const { title, description, repository, sourceBranch, targetBranch } = action.params;
    
    const client = CodeCommitService.from(action.params, settings);
    return client.createPullRequest({
        title: parsers.string(title),
        repository: parsers.autocomplete(repository),
        sourceBranch: parsers.autocomplete(sourceBranch),
        targetBranch: parsers.autocomplete(targetBranch),
        description: parsers.string(description)
    });
}

async function getPullRequest(action, settings){
    const { repository, pullRequest } = action.params;

    const client = CodeCommitService.from(action.params, settings);
    return client.getPullRequest({
        repository: parsers.autocomplete(repository),
        pullRequest: parsers.autocomplete(pullRequest)
    });
}

async function listRepos(action, settings){
    const client = CodeCommitService.from(action.params, settings);
    return client.listRepos({listAll: true});
}

async function listBranches(action, settings){
    const { repository } = action.params;
    
    const client = CodeCommitService.from(action.params, settings);
    return client.listBranches({
        repository: parsers.autocomplete(repository),
        listAll: true
    });
}

async function listPullRequests(action, settings){
    const { repository } = action.params;
    
    const client = CodeCommitService.from(action.params, settings);
    return client.listPullRequests({
        repository: parsers.autocomplete(repository),
        listAll: true
    });
} 

module.exports = {
    createRepository,
	createBranch,
	createPullRequest,
	getPullRequest,
	listRepos,
	listBranches,
	listPullRequests,
// Autocomplete Functions
    ...require("./autocomplete")
}
const parsers = require("./parsers");
const AWS = require("aws-sdk");

module.exports = class CodeCommitService{
    constructor({accessKeyId, secretAccessKey, region}){
        if (!accessKeyId || !secretAccessKey || !region) throw "Didn't provide access key or region!";
        const creds = {accessKeyId, secretAccessKey, region};
        this.codeCommit = new AWS.CodeCommit(creds);
        this.ec2 = new AWS.EC2(creds);
    }

    static from(params, settings){
        return new CodeCommitService({
            accessKeyId: parsers.string(params.accessKeyId || settings.accessKeyId),
            secretAccessKey: params.secretAccessKey || settings.secretAccessKey,
            region: parsers.autocomplete(params.region || settings.region)
        });
    }
    
    async createRepository({name, description, tags}){
        if (!name) throw "Must provide repository name!";
        return this.codeCommit.createRepository({
            repositoryName: name,
            repositoryDescription: description,
            tags
        }).promise();
    }
    
    async createBranch({name, repository, commit}){
        if (!name || !repository || !commit) throw "Didn't provide one of the required parameters.";
        return this.codeCommit.createBranch({
            branchName: name,
            commitId: commit,
            repositoryName: repository
        }).promise();
    }
    
    async createPullRequest({title, repository, sourceBranch, targetBranch, description}){
        if (!title || !repository || !sourceBranch || !targetBranch) throw "Didn't provide one of the required parameters.";
        return this.codeCommit.createPullRequest({
            title, description,
            targets: [{
                repositoryName: repository,
                sourceReference: sourceBranch,
                destinationReference: targetBranch
            }]
        }).promise();
    }
    
    async getPullRequest({repository, pullRequest}){
        if (!repository || !pullRequest) throw "Didn't provide one of the required parameters.";
        return this.codeCommit.getPullRequest({pullRequestId: pullRequest}).promise();
    }

    async listAll(funcName, outputName, params = {}){
        try {
            var result = await this.codeCommit[funcName](params);
            const items = [result[outputName]];
            while (result.nextToken){
                params.nextToken = result.nextToken;
                result = await this.aws[funcName](params);
                items.push(...result[outputName]);
            }
        }
        catch (error){
            throw `Problem with listing '${outputName}' using '${funcName}': ${error.message || JSON.stringify(error)}`;
        }
        return items;
    }
    
    
    async listRepos({nextToken, listAll}){
        if (listAll) return this.listAll("listRepositories", "repositories");
        return this.codeCommit.listRepositories({nextToken}).promise();
    }
    
    async listBranches({repository, nextToken, listAll}){
        if (listAll) return this.listAll("listBranches", "branches", {repositoryName: repository});
        return this.codeCommit.listBranches({nextToken, repositoryName: repository}).promise();
    }
    
    async listPullRequests({repository, nextToken, listAll}){
        if (listAll) return this.listAll("listPullRequests", "pullRequestIds", {repositoryName: repository});
        return this.codeCommit.listPullRequests({nextToken, repositoryName: repository}).promise();
    }
    
    async listRegions(){
        return this.ec2.describeRegions({}).promise();
    }
}
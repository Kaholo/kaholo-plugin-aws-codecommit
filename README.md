# Kaholo AWS CodeCommit plugin
This plugin extends Kaholo to enable use of [AWS CodeCommit](https://aws.amazon.com/codecommit/). AWS CodeCommit is a secure, highly scalable, managed source control service that hosts private Git repositories.

The CodeCommit plugin is used to list, create and manage repositories, branches, and pull requests. Standard git operations such as clone, commit, and push are done using git, your favorite git-compatible tools, or the [Kaholo Git Plugin](https://github.com/Kaholo/kaholo-plugin-git/blob/master/README.md). For more information about how to use CodeCommit with git or the git plugin, please see the AWS documentation [here](https://docs.aws.amazon.com/codecommit/latest/userguide/getting-started.html). 

## Access and Authentication
To use the plugin, an AWS account is required, including an IAM user with Access Keys and associated groups and policies that grant access to use AWS CodeCommit. AWS Access Keys come in pairs, such as the example below.

    Access Key: AKIA3LQSDLGKHSTJ6PIQI
    Secret Key: uOq2uEoy5/E5KSLDKGskd8rWD0TfbZZLi++L7++gl

To set up an IAM user or get Access Keys, please contact your AWS system administrator. [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)

## Plugin Account
This plugin makes use of Kaholo Accounts. Accounts define a set of parameters that are grouped and applied together as one at the action level. An account set as the default account is applied automatically when creating a new action so the user can configure the account once and thereafter easily reuse it, rather than having to specify the same details again for each action. In the case of AWS, accounts are shared across several AWS plugins. For example if you have already defined an account for use with the AWS EC2 plugin or the AWS CLI plugin, there will be no need to redefine the account for use with AWS CodeCommit plugin.

The Kaholo Account used with AWS CodeCommit contains two parameters:

* Access key - The Access Key ID to use to authenticate to AWS
    
* Secret key (Vault) - The Secret Key to use to authenticate to AWS

##  Plugin Settings
Plugin settings act as default parameter values. If configured in plugin settings, the action parameters may be left unconfigured. Action parameters configured anyway over-ride the plugin-level settings for that Action. This plugin has only one Setting:

* Default Region - The default AWS region where your CodeCommit repositories are located. For example, `ap-southeast-1` if your CodeCommit repositories are in Amazon's Singapore datacenter. [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

## Method: Create Repository
Creates a new CodeCommit repository.

## Parameters
* Region (Autocomplete) - Select the AWS region where the repository will be created.
* Name - The name of the new repository to create
* Description - A description for the new repository
* Tags - If specified, tag the repository with the tags specified. Each tag should either be in the format of Key=Value or just Key. Enter multiple tags one per line.

## Method: Create Branch
Creates a new branch inside the specified repository using a specified commit SHA ID.

## Parameters
* Region (Autocomplete) - Select the AWS region where the repository exists.
* Name - The name of the new branch to create
* Repository (Autocomplete) - Select the repository in which the branch will be created.
* Head Commit - The SHA ID of the commit from which the new branch is created, e.g. `e15412c61810e2192b90dfb9d7deaeaa9aa7d504`

## Method: Create Pull Request
Create a new pull request on the specified repository and branches.

## Parameters
* Region (Autocomplete) - Select the AWS region where the repository exists.
* Title - The title of the new pull request to create
* Repository (Autocomplete) - Select the repository in which the pull request will be created.
* Source Branch (Autocomplete) - Select the branch from which to pull changes.
* Target Branch (Autocomplete) - Select the branch into which the merge is requested.
* Description - A description of the nature of the pull request

## Method: Get Pull Request
Get information about a specific pull request.

## Parameters
* Region (Autocomplete) - Select the AWS region where the repository exists.
* Repository (Autocomplete) - Select the repository in which the pull request exists.
* Pull Request (Autocomplete) - Select the title of the pull request to retrieve details.

## Method: List Repositories
Lists all repositories connected to your AWS IAM user in the specified region.

## Parameters
* Region (Autocomplete) - Select the AWS region where repositories are to be listed.

## Method: List Branches
Lists all branches of the specified repository.

## Parameters
* Region (Autocomplete) - Select the AWS region where the repository exists.
* Repository (Autocomplete) - Select the repository who's branches are to be listed.

## Method: List Pull Requests
List all pull requests in the specified repository.

## Parameters
* Region (Autocomplete) - Select the AWS region where the repository exists.
* Repository (Autocomplete) - Select the repository who's pull requests are to be listed.

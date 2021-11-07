# kaholo-plugin-aws-codecommit
Kaholo plugin for integration with AWS CodeCommit API.

##  Settings
1. Access key (String) **Required if not in action** - The default Access Key ID to use to authenticate to AWS.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in action** - The default Access Key Secret to use to authenticate to AWS.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (String) **Required if not in action** - The default AWS region to make requests on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

## How To Integrate With The Git Plugin
In order to be able to use the Git plugin in Kaholo on repositories created from AWS CodeCommit follow these steps:
* Generate an SSH RSA key, and save both private and public keys for later.
* In [AWS IAM users tab](https://console.aws.amazon.com/iam/home#/users) select a user to use to authenticate to CodeCommit with.
* Make sure the user has the specified permission policy: **AWSCodeCommitPowerUser**
* In the 'Security Credentials' tab go to 'SSH keys for AWS CodeCommit' and then select 'Upload SSH public key' than paste your public SSH key. Save the ID of the uploaded public SSH key for later.
* Save the private ssh key in the Kaholo vault to use with the git plugin.
* When using the git plugin make sure to provide the private key from the vault, abd provide the 'Repository' parameter in the following format: ssh://**Your-SSH-Key-ID@**git-codecommit.us-east-2.amazonaws.com/v1/repos/MyDemoRepo.

## Method: Create Repository
Create a new repository.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
4. Name (String) **Required** - The name of the new repository to create.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)
5. Description (Text) **Optional** - A description of the new repository to create.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)
6. Tags (Text) **Optional** - If specified, tag the repository with the tags specified. Each tag should either be in the format of Key=Value or just Key. To enter multiple values separate each with a new line. Also accepts getting an array of objects in the form of { Key, Value } or { Key }.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-tag-repository.html)

## Method: Create Branch
Create a new branch inside the specified repostiry using a specified commit SHA ID.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
4. Name (String) **Required** - The name of the new branch to create.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-branch.html)
5. Repository (Autocomplete) **Required** - Create the branch in the specified repository.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)
6. Head Commit (Autocomplete) **Required** - The commit the new branch will point to.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-commit.html)

## Method: Create Pull Request
Create a new pull request on the specified repository and branches.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
4. Title (String) **Optional** - The title of the new pull request to create.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/pull-requests.html)
5. Repository (Autocomplete) **Required** - Create the pull request in the specified repository.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)
6. Source Branch (Autocomplete) **Required** - The branch to request to pull/merge into the target branch.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/pull-requests.html)
7. Target Branch (Autocomplete) **Required** - If pull request approved pull/merge the source branch with this branch.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/pull-requests.html)
8. Description (Text) **Optional** - Attach the specified description to the pull request.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/pull-requests.html)

## Method: Get Pull Request
Get information about the specified pull request.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
4. Repository (Autocomplete) **Required** - The repository the pull request belongs to.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)
5. Pull Request (Autocomplete) **Required** - The pull request to return information about
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/pull-requests.html)

## Method: List Repositories
List all repositories connected to your AWS IAM user.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

## Method: List Branches
List all branches of the specified repository.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
4. Repository (Autocomplete) **Required** - List branches of only the specified repository.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)

## Method: List Pull Requests
List all pull requests in the specified repository.

## Parameters
1. Access key (String) **Required if not in settings** - The Access Key ID to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
2. Secret key (Vault) **Required if not in settings** - The Access Key Secret to use to authenticate to AWS for this request.
    [Learn More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Region (Autocomplete) **Required if not in settings** - The AWS region to make this request on.
    [Learn More](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
4. Repository (Autocomplete) **Required** - List pull requests of only the specified repository.
    [Learn More](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html)

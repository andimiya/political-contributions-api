# Political Contributions API

## Project Setup

#### Clone the repository and install local NPM dependencies.

```bash
git clone git@github.com:andimiya/political-contributions-api.git
cd political-contributions-api
npm install
```

#### Install Serverless Globally

```bash
npm install -g serverless
```

#### Load environemnt specific credentials

Get a copy of `env.yaml` (currently in 1Password) and place it in the root directory of the application

#### Setup Database

You'll need Postgres running on your local machine. Once installed, manually create a database `contributions_api_db_local` - Once the DB is created you can run `npm run db:migrate:local` for migrations

## Run/Debug

| Command                                                | Description                                      |
| ------------------------------------------------------ | ------------------------------------------------ |
| sls offline                                            | Starts a local server you can query on localhost |
| sls invoke local --function nameOfFunction             | Allows you to run specific functions             |
| npm run lint                                           | Run ESLint                                       |
| npm run lint:fix                                       | Run ESLint and automatically fix problems.       |
| npm run db:migrate                                     | Run migrations on local database                 |
| npm run typeorm migration:create -- -n NameOfMigration | Create migration file                            |
| npm run db:drop                                        | Drop local database                              |

## Deploy

To deploy you must have [serverless](https://serverless.com/) and the [aws-cli](https://aws.amazon.com/cli/) installed globally.

#### Configure AWS CLI

If you don't already have the it, install the [aws-cli](https://aws.amazon.com/cli/) tool. Once installed, you'll want to create a AWS Profile on your local machine that can connect to the Macy's AWS account. Access Keys can be found in our 1Password Vault.

You're required to have AWS Credentials to deploy this serverless function

```bash
aws configure --profile political-contributions-api-serverless
AWS Access Key ID [None]: [YOUR_ACCESS_KEY]
AWS Secret Access Key [None]: [YOUR_SECRET_ACCESS_KEY]
Default region name [None]: us-west-1
Default output format [None]: json
```

To deploy all functions & serverless changes

```bash
sls deploy --stage {environment}
```

To deploy a single function

```bash
sls deploy function -f function-name --stage {environment}
```

# Newman Test Action

Allows you to run Postman collection using Newman CLI.

## Parameters

All Newman parameters are supported. [See Newman docs](https://github.com/postmanlabs/newman#api-reference).

## Getting Started

This action supports multiple ways of retrieving your Postman collections/environments.

### Local files
If you've exported your collection and/or environment to your repo, provide the relative path/names of collection and/or environment files (default: `postman_collection.json` / `postman_environment.json`).

```
- uses: actions/checkout@master
- uses: g-lalevee/newman-test-action@master
  with:
    collection: postman_collection.json
    environment: postman_environment.json
```          

### Via URL
If you're collection and/or environment is sitting at a URL accessible to your GitHub action, provide URLs of collection and/or environment files.

```
- uses: actions/checkout@master
- uses: g-lalevee/newman-test-action@master
  with:
    collection: https://example.com/test/postman/collection.json
    environment: https://example.com/test/postman/environment.json
```

### Via Postman API
You can use the Postman API to retrieve the latest version of the collection and/or environment file, to save time and be sure that you’re working off the correct version. 

[See Postman's API](https://docs.api.getpostman.com/?version=latest).
You’ll need your Postman API key ([store it in GitHub secret](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables)...) and IDs for . 
 collection and environment files.


```
- uses: actions/checkout@master
- uses: g-lalevee/newman-test-action@master
  with:
    postmanApiKey: ${{ secrets.postmanApiKey }}
    collection: 1234567-12345678-abcd-abcd-1234-111111111111
    environment: 1234567-12345678-abcd-abcd-1234-222222222222
```


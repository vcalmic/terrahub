# Examples

TerraHub CLI is built using [nodejs](https://nodejs.org) and published using [npm](https://www.npmjs.com). Quick steps to get started:
```shell
$ node -v
v6.10.0
$ npm -v
v3.10.0
$ npm install -g terrahub
~/.nvm/versions/node/v6.10.0/lib
└── terrahub@0.0.1
$ terrahub --help
```

> NOTE: [TerraHub CLI](https://www.npmjs.com/package/terrahub) doesn't magically collect your data and upload to [TerraHub API](https://www.terrahub.io), which is further visualized in [TerraHub Console](https://console.terrahub.io). In order to do that, please sign up for a free account at [console.terrahub.io](https://console.terrahub.io) and navigate to [Settings](https://console.terrahub.io/settings) page to copy TerraHub Token. Next, you can setup TerraHub Token as `THUB_TOKEN` environmental variable or update `token` value in global config file - `$HOME/.terrahub/.terrahub.json`.

* [Terraform Automation using AWS Cloud Provider](https://github.com/TerraHubCorp/demo-terraform-automation-aws)
* [Terraform Automation using Google Cloud Provider](https://github.com/TerraHubCorp/demo-terraform-automation-gcp)

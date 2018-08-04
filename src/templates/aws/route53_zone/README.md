# route53_zone

Provides a Route53 Hosted Zone resource.

## input variables

| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
|account_id|The id of AWS account.|string||Yes|
|region|This is the AWS region.|string|us-east-1|Yes|
|route53_name|This is the name of the hosted zone.|string||Yes|
|route53_vpc_id|The VPC to associate with a private hosted zone. Specifying vpc_id will create a private hosted zone. Conflicts with delegation_set_id as delegation sets can only be used for public zones.|string||Yes|
|route53_comment|A comment for the hosted zone.|string|Managed by TerraHub|No|
|route53_force_destroy|Whether to destroy all records (possibly managed outside of Terraform) in the zone when destroying the zone.|boolean|false|No|
|custom_tags|Custom tags.|map||No|
|default_tags|Default tags.|map|{"ThubName"= "{{ name }}","ThubCode"= "{{ code }}","ThubEnv"= "default","Description" = "Managed by TerraHub"}|No|

## output parameters

| Name | Description | Type |
|------|-------------|:----:|
|route53_name|This is the name of the hosted zone.|string|
|route53_zone_id|The Hosted Zone ID. This can be referenced by zone records.|string|
|route53_name_servers|A list of name servers in associated (or default) delegation set. Find more about delegation sets in AWS docs.|array|
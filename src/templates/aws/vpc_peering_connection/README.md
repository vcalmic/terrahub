# aws_vpc_peering_connection

Provides a resource to manage a VPC peering connection.

NOTE on VPC Peering Connections and VPC Peering Connection Options: Terraform provides both a standalone VPC Peering Connection Options and a VPC Peering Connection resource with accepter and requester attributes. Do not manage options for the same VPC peering connection in both a VPC Peering Connection resource and a VPC Peering Connection Options resource. Doing so will cause a conflict of options and will overwrite the options. Using a VPC Peering Connection Options resource decouples management of the connection options from management of the VPC Peering Connection and allows options to be set correctly in cross-account scenarios.

Note: For cross-account (requester's AWS account differs from the accepter's AWS account) or inter-region VPC Peering Connections use the aws_vpc_peering_connection resource to manage the requester's side of the connection and use the aws_vpc_peering_connection_accepter resource to manage the accepter's side of the connection.

## input variables

| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
|account_id|The id of AWS account.|string||Yes|
|region|This is the AWS region.|string|us-east-1|Yes|
|vpc_peering_connection_peer_vpc_id|The ID of the VPC with which you are creating the VPC Peering Connection.|string||Yes|
|vpc_peering_connection_vpc_id|The ID of the requester VPC.|string||Yes|
|vpc_peering_connection_accepter_allow_remote|Allow a local VPC to resolve public DNS hostnames to private IP addresses when queried from instances in the peer VPC.|boolean|true|No|
|vpc_peering_connection_requester_allow_remote|Allow a local VPC to resolve public DNS hostnames to private IP addresses when queried from instances in the peer VPC.|boolean|true|No|
|custom_tags|Custom tags.|map||No|
|default_tags|Default tags.|map|{"ThubName"= "{{ name }}","ThubCode"= "{{ code }}","ThubEnv"= "default","Description" = "Managed by TerraHub"}|No|

## output parameters

| Name | Description | Type |
|------|-------------|:----:|
|id|The ID of the VPC Peering Connection.|string|
|thub_id|The ID of the VPC Peering Connection (hotfix for issue hashicorp/terraform#[7982]).|string|
|accept_status|The status of the VPC Peering Connection request.|string|
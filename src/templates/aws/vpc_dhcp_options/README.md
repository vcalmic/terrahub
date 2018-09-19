# aws_vpc_dhcp_options

Provides a VPC DHCP Options resource.

## input variables

| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
|account_id|The id of AWS account.|string||Yes|
|region|This is the AWS region.|string|us-east-1|Yes|
|vpc_dhcp_options_domain_name|The suffix domain name to use by default when resolving non Fully Qualified Domain Names. In other words, this is what ends up being the search value in the /etc/resolv.conf file.|string|service.consul|No|
|vpc_dhcp_options_domain_name_servers|List of name servers to configure in /etc/resolv.conf. If you want to use the default AWS nameservers you should set this to AmazonProvidedDNS.|list|["127.0.0.1", "10.0.0.2"]|No|
|vpc_dhcp_options_ntp_servers|List of NTP servers to configure.|list|["127.0.0.1"]|No|
|vpc_dhcp_options_netbios_name_servers|List of NETBIOS name servers.|list|["127.0.0.1"]|No|
|vpc_dhcp_options_netbios_node_type|The NetBIOS node type (1, 2, 4, or 8). AWS recommends to specify 2 since broadcast and multicast are not supported in their network. For more information about these node types, see RFC 2132.|number|2|No|
|custom_tags|Custom tags.|map||No|
|default_tags|Default tags.|map|{"ThubName"= "{{ name }}","ThubCode"= "{{ code }}","ThubEnv"= "default","Description" = "Managed by TerraHub"}|No|

## output parameters

| Name | Description | Type |
|------|-------------|:----:|
|id|The ID of the DHCP Options Set.|string|
|thub_id|The ID of the DHCP Options Set (hotfix for issue hashicorp/terraform#[7982]).|string|
# aws_launch_template

Provides an EC2 launch template resource. Can be used to create instances or auto scaling groups.

## input variables

| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
|account_id|The id of AWS account.|string||Yes|
|region|This is the AWS region.|string|us-east-1|Yes|

|launch_template_name|The name of the launch template. If you leave this blank, Terraform will auto-generate a unique name.|string|{{ name }}|No|
|launch_template_api_termination|If true, enables EC2 Instance Termination Protection.|boolean|true|No|
|launch_template_ebs_optimized|If true, the launched EC2 instance will be EBS-optimized.|boolean|true|No|
|launch_template_image_id|The AMI from which to launch the instance.|string||Yes|
|launch_template_shutdown_behavior|Shutdown behavior for the instance. Can be stop or terminate. |string|stop|No|
|launch_template_instance_type|The type of the instance.|string|t2.micro|No|
|launch_template_kernel_id|The kernel ID.|string||Yes|
|launch_template_key_name|The key name to use for the instance.|string||Yes|
|launch_template_ram_disk_id|The ID of the RAM disk.|string||Yes|
|launch_template_vpc_security_group_ids|A list of security group IDs to associate with.|list||Yes|

|launch_template_ebs_device_name|The name of the device to mount.|string|/dev/sda1|No|
|launch_template_ebs_delete_on_termination|Whether the volume should be destroyed on instance termination.|boolean|true|No|
|launch_template_ebs_encrypted|Enables EBS encryption on the volume (Default: false). Cannot be used with snapshot_id.|boolean|false|No|
|launch_template_ebs_volume_size|The size of the volume in gigabytes.|number|8|No|
|launch_template_ebs_volume_type|The type of volume. Can be standard, gp2, or io1.|string|standard|No|

|launch_template_cpu_credits|The credit option for CPU usage. Can be standard or unlimited.|string|standard|No|
|launch_template_elastic_gpu_type|The Elastic GPU Type.|string||Yes|
|launch_template_iam_name|The name of the instance profile.|string||Yes|
|launch_template_market_type|The market type. Can be spot.|string|spot|No|
|launch_template_monitoring_enabled|If true, the launched EC2 instance will have detailed monitoring enabled.|boolean|false|No|
|launch_template_availability_zone|The Availability Zone for the instance.|string|us-east-1a|No|

|launch_template_ni_associate_public_ip_address|Associate a public ip address with the network interface. Boolean value.|boolean|false|No|
|launch_template_ni_subnet_id|The VPC Subnet ID to associate.|string||Yes|

|launch_template_resource_type|The type of resource to tag. Valid values are instance and volume.|string|instance|No|
|custom_tags|Custom tags.|map||No|
|default_tags|Default tags.|map|{"ThubName"= "{{ name }}","ThubCode"= "{{ code }}","ThubEnv"= "default","Description" = "Managed by TerraHub"}|No|

## output parameters

| Name | Description | Type |
|------|-------------|:----:|
|arn|Amazon Resource Name (ARN) of the launch template.|string|
|id|The ID of the launch template (hotfix for issue hashicorp/terraform#[7982]).|string|
|thub_id|The ID of the launch template.|string|
|default_version|The default version of the launch template.|string|
|latest_version|The latest version of the launch template.|string|
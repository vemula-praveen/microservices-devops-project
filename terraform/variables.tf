variable "aws_region" {
  description = "AWS region used for ECR and EC2 resources. Must be lowercase to satisfy Docker/ECR repository naming rules."
  type        = string
  default     = "ap-south-1"

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.aws_region))
    error_message = "aws_region must be lowercase and use the AWS region format, for example ap-south-1."
  }
}

variable "project_name" {
  description = "Prefix used for AWS resources. Must be lowercase because ECR repository names are lower-case only."
  type        = string
  default     = "microservices-devops"

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.project_name))
    error_message = "project_name must contain only lowercase letters, numbers, and hyphens."
  }
}

variable "environment" {
  description = "Deployment environment name used for resource naming"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Availability zone for the public subnet"
  type        = string
  default     = "ap-south-1a"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "ami_id" {
  description = "Optional override for the EC2 AMI. Leave empty to use the latest Amazon Linux 2023 AMI for this region."
  type        = string
  default     = ""

  validation {
    condition     = var.ami_id == "" || can(regex("^ami-[0-9a-fA-F]+$", var.ami_id))
    error_message = "Set a valid AMI ID in terraform.tfvars or leave it empty to auto-select the latest Amazon Linux 2023 AMI for this region."
  }
}

variable "service_names" {
  description = "Names of backend services to create ECR repositories for. Each name must be lowercase and hyphen-safe."
  type        = list(string)
  default     = ["api", "auth", "user"]

  validation {
    condition = alltrue([
      for service_name in var.service_names : can(regex("^[a-z0-9-]+$", service_name))
    ])
    error_message = "Each service name must be lowercase and contain only letters, numbers, and hyphens."
  }
}

variable "key_name" {
  description = "AWS EC2 key pair name"
  type        = string
  default     = ""
}

variable "ssh_allowed_cidr" {
  description = "CIDR allowed to SSH into the EC2 instance"
  type        = string
  default     = "0.0.0.0/0"
}
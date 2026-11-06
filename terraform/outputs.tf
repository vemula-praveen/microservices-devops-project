output "vpc_id" {
  description = "The ID of the VPC created for this project"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "The ID of the public subnet"
  value       = aws_subnet.public.id
}

output "ec2_instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.app.id
}

output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app.public_ip
}

output "ecr_repository_urls" {
  description = "URLs for the ECR repositories created for each service"
  value = {
    for name, repo in aws_ecr_repository.services : name => repo.repository_url
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  cloud {
    organization = "hoaftq"
    workspaces {
      name = "tictactoe"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}

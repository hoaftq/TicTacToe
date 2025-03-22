variable "bucket_name" {
  description = "Name of the bucket that contains the game"
  type        = string
  default     = "simpletictactoe"
}

resource "aws_s3_bucket" "tictactoe" {
  bucket = var.bucket_name

  tags = {
    "Environment" = "Production"
  }
}

resource "aws_s3_bucket_acl" "tictactoe" {
  bucket = aws_s3_bucket.tictactoe.id
  acl    = "public-read"
}

data "aws_iam_policy_document" "public_access" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = ["s3:GetObject"]
    resources = [
      aws_s3_bucket.tictactoe.arn,
      "${aws_s3_bucket.tictactoe.arn}/*"
    ]
    effect = "Allow"
  }
}

resource "aws_s3_bucket_policy" "tictactoe" {
  bucket = aws_s3_bucket.tictactoe.id
  policy = data.aws_iam_policy_document.public_access.json
}

resource "aws_s3_bucket_website_configuration" "tictactoe" {
  bucket = aws_s3_bucket.tictactoe.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_cors_configuration" "tictactoe" {
  bucket = aws_s3_bucket.tictactoe.id

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["https://lively-pebble-02058e800.4.azurestaticapps.net/"]
  }
}

output "tictactoe_url" {
  description = "url of the deployed tictactoe game"
  value       = aws_s3_bucket_website_configuration.tictactoe.website_endpoint
}

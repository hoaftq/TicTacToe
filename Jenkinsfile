pipeline {
    agent any
    tools {
        terraform 'terraform21207'
        nodejs 'nodejs14'
    }

    stages {
        stage('Create infrastructure') {
            when {
                branch 'master'
            }

            environment {
                TF_IN_AUTOMATION = true
                TF_INPUT = false
                TF_TOKEN_app_terraform_io = credentials('app_terraform_io')
            }

            stages {
                stage('Terraform init') {
                    steps {
                        dir('infrastructure') {
                            sh 'terraform init'
                        }
                    }
                }

                stage('Terraform validate') {
                    steps {
                        dir('infrastructure') {
                            sh 'terraform validate'
                        }
                    }
                }

                stage('Terraform apply') {
                    steps {
                        dir('infrastructure') {
                            sh 'terraform apply -auto-approve'
                        }
                    }
                }
            }
        }

        stage('Build and deploy game') {
            stages {
                stage('Install dependencies') {
                    steps {
                        dir('game') {
                            sh 'npm install'
                        }
                    }
                }

                stage('Run eslint') {
                    steps {
                        dir('game') {
                            sh 'npm run eslint-export-file'
                        }
                    }
                    post {
                        always {
                            recordIssues enabledForFailure: true, tools: [esLint(pattern: 'eslint.xml')]
                        }
                    }
                }

                stage('Build') {
                    steps {
                        dir('game') {
                            sh 'npm run build'
                        }
                    }
                }

                stage('Deploy to S3') {
                    when {
                        branch 'master'
                    }
                    steps {
                        withAWS(region: 'ap-southeast-1', credentials:'tictactoe_credential') {
                            s3Delete bucket: 'simpletictactoe', path: ''
                            s3Upload bucket: 'simpletictactoe', path: '', workingDir: 'game/dist', includePathPattern: '*.*'
                        }
                    }
                }
            }
        }
    }
}

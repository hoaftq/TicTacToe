pipeline {
    agent any
    stages {
        stage('Install dependencies') {
            steps {
                nodejs('nodejs14') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                nodejs('nodejs14') {
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy to S3') {
            steps {
                withAWS(region: 'ap-southeast-1', credentials:'tictactoe_credential') {
                    s3Delete bucket: 'simpletictactoe', path: ''
                    s3Upload bucket: 'simpletictactoe', path: '', workingDir: 'dist', includePathPattern: '*.*'
                }
            }
        }
    }
}

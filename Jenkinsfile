pipeline {
    agent any
    stages {
        stage('Deploy to S3') {
            steps {
                withAWS(region: 'ap-southeast-1', credentials:'tictactoe_credential') {
                    s3Delete bucket: 'simpletictactoe', path: ''
                    s3Upload bucket: 'simpletictactoe', includePathPattern: '*.*'
                }
            }
        }
    }
}

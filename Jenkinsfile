pipeline {
    agent any
    stages {
        stage('Clone source code') {
            steps {
                git 'https://github.com/hoaftq/TicTacToe.git'
            }
        }
        stage('Deploy to S3') {
            steps {
                withAWS(region: 'ap-southeast-1', credentials:'tictactoe_credential') {
                    s3Upload bucket: 'simpletictactoe', includePathPattern: '*.*'
                }
            }
        }
    }
}

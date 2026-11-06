pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building microservices'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing microservices'
            }
        }

    }
}

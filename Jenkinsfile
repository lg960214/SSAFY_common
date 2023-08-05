pipeline {
    agent any

    stages {
        stage('React Build') {
            steps {
                dir('dev/FE') {
                    script {
                        sh 'npm cache clean --force'
                        sh 'rm -rf node_modules'
                        sh 'npm install' 
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('React Build Complete') {
            steps {
                script {
                    echo 'FE Build Complete'
                }
            }
        }

        stage('SpringBoot Build') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'rm -R target'
                        sh 'mvn clean package'
                    }
                }
            }
        }

        stage('SpringBoot Build Complete') {
            steps {
                script {
                    echo 'BE Build Complete'
                }
            }
        }
    }
}
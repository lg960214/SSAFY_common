pipeline {
    agent any
    tools {
        nodejs 'nodejs-20.5.0'
    }

    stages {
        stage('SpringBoot Build') {
            steps {
                dir('dev/BE') {
                    script {
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
        
        
    
        stage('Node install') {
            steps {
                sh 'node --version'
            }
        }
    

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
    }
}

pipeline {
    agent any

    stages {
        stage('Remove Previous SpringBoot Settings') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'rm -rf target'
                    }
                }
            }
        }

        stage('SpringBoot Build') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'mvn clean package'
                    }
                }
                dir('dev/BE/target') {
                    script {
                        sh 'mv *.jar A104.jar'
                    }
                }
            }
        }

        stage('Remove Previous SpringBoot Docker') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'docker stop be || true'
                        sh 'docker rm be || true'
                        sh 'docker rmi ibe || true'
                    }
                }
            }
        }

        stage('Spring Docker Build and Run') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'docker build -t ibe .'
                        sh 'docker run -p 10002:8081 -d --name be ibe'
                    }
                }
            }
        }

        stage('Remove Previous React Settings') {
            steps {
                dir('dev/FE') {
                    script {
                        sh 'npm cache clean --force'
                        sh 'rm -rf node_modules'
                    }
                }
            }
        }

        stage('React Build') {
            steps {
                dir('dev/FE') {
                    script {
                        sh 'npm install' 
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Remove Previous React Docker') {
            steps {
                dir('dev/FE') {
                    script {
                        sh 'docker stop fe || true'
                        sh 'docker rm fe || true'
                        sh 'docker rmi ife || true'
                    }
                }
            }
        }

        stage('React Docker Build and Run') {
            steps {
                dir('dev/FE') {
                    script {
                        sh 'docker build -t ife .'
                        sh 'docker run -p 10001:3000 -d --name fe ife'
                    }
                }
            }
        }

    }
}

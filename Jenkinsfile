pipeline {
    agent any
    
    tools {
        nodejs 'nodejs-20.5.0'
    }

    stages {
        stage('Node install') {
            steps {
                sh 'node --version'
            }
        }

        stage('Remove Previous SpringBoot Settings') {
            steps {
                dir('dev/FE') {
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

        stage('Previous SpringBoot Docker remove') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'sudo docker stop be'
                        sh 'sudo docker rm -f be'
                        sh 'sudo docker rmi ibe'
                    }
                }
            }
        }

        stage('Spring Docker Build') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'sudo docker build -t ibe .'
                        sh 'sudo docker run --name be -p 10002:8081 ibe'
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

        stage('Previous React Docker remove') {
            steps {
                dir('dev/FE') {
                    script {
                        sh 'sudo docker stop fe'
                        sh 'sudo docker rm -f fe'
                        sh 'sudo docker rmi ife'
                    }
                }
            }
        }

        stage('Spring Docker Build') {
            steps {
                dir('dev/BE') {
                    script {
                        sh 'sudo docker build -t ife .'
                        sh 'sudo docker run --name fe -p 10001:3000 ife'
                    }
                }
            }
        }
    }
}

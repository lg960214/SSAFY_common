pipeline {
    agent any
    
    tools {
        nodejs 'nodejs-20.5.0'
    }

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
                script {
                    sh 'docker -H=unix:///var/run/docker.sock stop be || true'
                    sh 'docker -H=unix:///var/run/docker.sock rm be || true'
                    sh 'docker -H=unix:///var/run/docker.sock rmi ibe || true'
                }
            }
        }

        stage('Spring Docker Build') {
            steps {
                script {
                    sh 'docker -H=unix:///var/run/docker.sock build -t ibe .'
                    sh 'docker -H=unix:///var/run/docker.sock run -p 10002:8081 -d --name be ibe'
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
                script {
                    sh 'docker -H=unix:///var/run/docker.sock stop fe || true'
                    sh 'docker -H=unix:///var/run/docker.sock rm fe || true'
                    sh 'docker -H=unix:///var/run/docker.sock rmi ife || true'
                }
            }
        }

        stage('Spring React Build') {
            steps {
                script {
                    sh 'docker -H=unix:///var/run/docker.sock build -t ife .'
                    sh 'docker -H=unix:///var/run/docker.sock run -p 10001:3000 -d --name fe ife'
                }
            }
        }
    }
}
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
                    def containers = docker.containerList(filter: "name=be")
                    if (containers) {
                        containers.each { container ->
                            sh "docker stop ${container.id}"
                            sh "docker rm ${container.id}"
                        }
                    } else {
                        echo "No SpringBoot containers found."
                    }

                    def images = docker.imageList(filter: "reference:ibe")
                    if (images) {
                        images.each { image ->
                            sh "docker rmi ${image.id}"
                        }
                    } else {
                        echo "No SpringBoot images found."
                    }
                }
            }
        }

        stage('Spring Docker Build') {
            steps {
                script {
                    def dockerImage = docker.build("ibe", '.')
                    dockerImage.run('-p 10002:8081 -d be')
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
                    def containers = docker.containerList(filter: "name=fe")
                    if (containers) {
                        containers.each { container ->
                            sh "docker stop ${container.id}"
                            sh "docker rm ${container.id}"
                        }
                    }

                    def images = docker.imageList(filter: "reference:ife")
                    if (images) {
                        images.each { image ->
                            sh "docker rmi ${image.id}"
                        }
                    }
                }
            }
        }

        stage('Spring React Build') {
            steps {
                script {
                    def dockerImage = docker.build("ife", '.')
                    dockerImage.run('-p 10001:3000 -d fe')
                }
            }
        }
    }
}
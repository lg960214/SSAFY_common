FROM ubuntu:20.04

ENV TZ=Asia/Seoul

USER root

EXPOSE 8080

# Install jenkins
RUN apt-get update && apt-get install -y openjdk-11-jdk wget gnupg2
RUN wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | apt-key add -
RUN sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
RUN apt-get update && apt-get install -y jenkins

RUN \
    # Install nvm(Node Version Manager)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && \
    # Install node.js v.20
    nvm install 20 && \
    # Install mvn
    apt-get install -y maven


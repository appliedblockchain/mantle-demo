FROM amazonlinux:2017.03.1.20170812

WORKDIR /home/ec2-user

RUN yum -y install git

RUN yum -y groupinstall "Development Tools"

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash - && \
    yum -y install nodejs && \
    node -e "console.log('Running Node.js ' + process.version)"

CMD [ "npm" ]

pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        REPOSITORY_URI = "228490195182.dkr.ecr.ap-south-1.amazonaws.com/tmtc-backend"
        APP_PORT = "5000"
    }

    stages {
        stage('Checkout') {
            steps {
                // Use SSH URL since your key is set up
                git branch: 'main', url: 'git@github.com:vijay6781/tmtc-backend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t tmtc-backend .'
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI
                docker tag tmtc-backend:latest $REPOSITORY_URI:latest
                docker push $REPOSITORY_URI:latest
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop tmtc-backend || true
                docker rm tmtc-backend || true
                docker pull $REPOSITORY_URI:latest
                docker run -d --name tmtc-backend -p $APP_PORT:$APP_PORT --env-file /home/ec2-user/tmtc-backend.env $REPOSITORY_URI:latest
                '''
            }
        }
    }
}

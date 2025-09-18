FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v22-ub22

RUN apt-get update && apt-get install -y zip

WORKDIR /repo

COPY . .
COPY .git .git

# Install dependencies
RUN yarn --immutable

# Build the app with nx
ENV NODE_ENV=development
ENV NODE_OPTIONS="--max-old-space-size=24000"
ENV CODEFLOW=true
RUN yarn nx run docs:build

# Zip the app for deploy
RUN (cd /repo/apps/docs/dist && zip -r - .) > /repo/app.zip

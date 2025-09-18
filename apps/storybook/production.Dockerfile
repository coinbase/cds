FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v22-ub22

RUN apt-get update && apt-get install -y zip

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the app with nx
ENV NODE_ENV=production
RUN yarn nx run storybook:build

# Zip the app for deploy
RUN (cd /repo/apps/storybook/dist && zip -r - .) > /repo/app.zip

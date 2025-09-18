FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v22-ub22

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run mobile:typecheck:prod
RUN yarn nx run mobile:build:prod

# Prepare the package for publish
RUN cd /repo/packages/mobile && yarn pack
RUN mv /repo/packages/mobile /shared

WORKDIR /shared

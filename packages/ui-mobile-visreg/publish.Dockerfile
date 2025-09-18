FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v22-ub22

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run ui-mobile-visreg:typecheck:prod
RUN yarn nx run ui-mobile-visreg:build

# Prepare the package for publish
RUN cd /repo/packages/ui-mobile-visreg && yarn pack
RUN mv /repo/packages/ui-mobile-visreg /shared

WORKDIR /shared

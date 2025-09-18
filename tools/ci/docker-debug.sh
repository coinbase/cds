#!/bin/bash
docker build --no-cache --progress plain -f - . -t cds --rm <<EOF
FROM busybox
WORKDIR /build-context
COPY . .
CMD find .
EOF
#!/bin/bash
set -euo pipefail

# Script to build and push Docker image to Docker Hub
# Usage: ./docker-build-push.sh [tag]

TAG=${1:-latest}
IMAGE_NAME="hashiif/nusatoys:${TAG}"

echo "🚀 Building and pushing Docker image: ${IMAGE_NAME}"

# Build and push in one step with buildx
docker buildx build \
  --platform=linux/amd64 \
  -t ${IMAGE_NAME} \
  --push \
  .

echo "✅ Successfully built and pushed ${IMAGE_NAME}"

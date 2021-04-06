export PROJECT_NAME=itis_discord_bot

echo "Building itis_discord_bot..."
docker buildx build --platform linux/arm64 --tag $PROJECT_NAME --load .

echo "Updating image..."
docker tag $(docker images --filter=reference=$PROJECT_NAME --format "{{.ID}}") 192.168.0.8:32768/$PROJECT_NAME:latest

echo "Pushing image..."
docker push 192.168.0.8:32768/$PROJECT_NAME:latest

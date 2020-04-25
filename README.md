# Python Blackjack

- Game logic in `game` folder
- Flask server
- Preact frontend

## To run locally:

1. `yarn watch` in `frontend` directory
2. `python server.py` in `game` directory

## To run in Docker:

1. `yarn build:local` in `frontend` directory
2. `docker-compose up --build` in root
3. Open `localhost` in a browser

## Kubernetes

All service and deployment `yml` files are in the `k8s` directory. Either run them individually:

```
kubectl apply -f <service or deployment>.yml
```

Or all at once:

```
kubectl apply -f .
```

### Making changes

If you make changes to a project, you'll need to do a few things to update kubernetes. For example, after making changes to `frontend`:

1. Rebuild from `src`: `yarn build:minikube` (within the `frontend` directory)
2. Rebuild docker image: `docker build -t helloitsjoe/blackjack-preact-frontend:minikube .` (Note the `.`)
3. Push to docker hub: `docker push helloitsjoe/blackjack-preact-frontend:minikube`
4. Bring down the running kubernetes pods for the frontend: `kubectl delete -f preact-frontend.yml`
5. Restart them: `kubectl apply -f preact-frontend.yml`

Note: `preact-frontend.yml` includes both the `service` and `deployment` for the frontend. The game server is split into separate service/deployment files. This is because the service port is hardcoded in the frontend, so when you make changes to the game you can just delete/recreate `deployment-python-backend.yml` and the service will continue running on the same port.

Despite the `imagePullPolicy: Always` in the `deployment.yml`, it will not pull a new image without restarting (`apply` is not enough)

### Starting a new node service

If you need to start a new node service (or bring it down and back up), you'll need to update the URL in the frontend's `src/services.js`, since the IP address and port are hardcoded. Update the `NODE_URL` and follow the instructions above to rebuild the frontend container.

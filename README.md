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

If you make changes to a project, you'll need to do a few things to update kubernetes. For example,
after making changes to `frontend`:

1. Rebuild from `src`: `yarn build:minikube` (within the `frontend` directory)
2. Rebuild docker image: `docker build -t helloitsjoe/blackjack-preact-frontend:minikube .` (Note
   the `.`)
3. Push to docker hub: `docker push helloitsjoe/blackjack-preact-frontend:minikube`
4. In the `k8s` directory, bring down the running kubernetes pods for the frontend:
   `kubectl delete -f preact-frontend.yml`
5. Restart them: `kubectl apply -f preact-frontend.yml`

Despite the `imagePullPolicy: Always` in the `deployment.yml`, it will not pull a new image without
restarting (`apply` is not enough)

Note: `preact-frontend.yml` includes both the `service` and `deployment` for the frontend. The game
server is split into separate service/deployment files. This is because the service port is
hardcoded in the frontend, so when you make changes to the game you can just delete/recreate
`deployment-python-backend.yml` and the service will continue running on the same port. (TODO:
Combine these now that MINIKUBE_URL is an env var)

### Building for Minikube

Note this line in the `build:minikube` package.json script:

```
MINIKUBE_URL=$(minikube service --url blackjack-backend-lb -n blackjack)
```

The `build:minikube` script expects minikube to be running the Flask service in a service called
`blackjack-backend-lb`, in the `blackjack` namespace. If not found, it will fall back to
`0.0.0.0:5000`, which will work locally but not in minikube.

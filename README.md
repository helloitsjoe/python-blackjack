# Kubernetes Blackjack

- Flask server with game logic
- Preact frontend

## To run in Minikube:

1. Make sure minikube is running: 
```
minikube status
```
2. In the `k8s` directory, create services/deployments:
```
kubectl apply -f .
```
3. Enable an ingress controller:
```
minikube addons enable ingress
```
4. Open a browser to the minikube IP address. You can find it by running:
```
minikube ip
```

## To run in Docker:

1. `yarn build:local` in `frontend` directory
2. `docker-compose up --build` in root
3. Open `localhost` in a browser

## To run locally:

1. `python server.py` in `backend` directory
2. `yarn watch` in `frontend` directory
3. `open dist/index.html` in `frontend` directory

### Making changes

If you make changes to a project, you'll need to do a few things to update kubernetes. For example,
after making changes to `frontend`:

1. In the `frontend` directory, rebuild from `src`: `yarn build:minikube`
2. Rebuild docker image: `docker build -t helloitsjoe/blackjack-preact-frontend:minikube .` (Note
   the `.`)
3. Push to docker hub: `docker push helloitsjoe/blackjack-preact-frontend:minikube`
4. Despite the `imagePullPolicy: Always` in the `deployment.yml`, it will not pull a new image without
restarting (`apply` is not enough)
5. In the `k8s` directory, bring down the running kubernetes pods for the frontend:
   `kubectl delete -f preact-frontend.yml`
6. Restart them: `kubectl apply -f preact-frontend.yml`


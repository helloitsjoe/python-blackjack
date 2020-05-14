# Python Blackjack

- Game logic in `backend` folder
- Flask server
- Preact frontend

## To run locally:

1. `python server.py` in `backend` directory
2. `yarn watch` in `frontend` directory
3. `open dist/index.html` in `frontend` directory

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

- Enable an ingress controller, e.g. `minikube addons enable ingress`
- Run `minikube ip` and open a browser to the IP address shown (without a port)

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

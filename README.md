# Todo App

## Setup instructions

First of all you need to install minikube and kubectl. You can find the instructions [here](https://kubernetes.io/docs/tasks/tools/install-minikube/).

Then you need to start minikube:

```bash
minikube start
```

And then to start all the apps:

```bash
kubectl apply -f kube
```

To run the projects locally:
    
```bash
minikube addons enable ingress
minikube tunnel
```

Finally, you can access the project on your localhost.

## Utils

If you need to delete every resource (does not include the persistent volumes):

```bash
kubectl delete -f kube
```

If you want to see the logs of a pod:

```bash
kubectl logs -f <pod-name>
```

If you want to connect to the postgres database:
    
```bash
kubectl exec -it <pod-name> -- psql -d todoapp -U postgres -W
```

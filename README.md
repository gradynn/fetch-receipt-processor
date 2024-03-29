The challenge to which this repository is a response can be found [here](https://github.com/fetch-rewards/receipt-processor-challenge).

# Installation and Running Instructions

This guide will help you set up and run the Receipt Processor application on your local machine using Docker.

## Prerequisites

- Docker installed on your machine. If you do not have Docker installed, follow the instructions on the [official Docker website](https://docs.docker.com/get-docker/).

## Installation

1. **Clone the repository**

   First, clone the project repository to your local machine using Git:

   ```bash
   git clone https://github.com/gradynn/fetch-receipt-processor.git
   cd receipt-processor
    ```

2. **Build the Docker image**

   Navigate to the cloned directory, and build the Docker image using the provided `Dockerfile`:

   ```bash
   docker build -t receipt-processor .
   ```

## Running the Application

1. **Run the Docker container**

    After the image is built, you can run the application in a Docker container using the following command:

    ```bash
    docker run -p 3000:3000 receipt-processor
    ```

    This command starts a container from the receipt-processor image, mapping port 3000 of the container to port 3000 on your host machine.

2. **Access the application**

   Once the container is running, you can access the Receipt Processor application by navigating to http://localhost:3000 in your web browser.

## Stopping the Application

To stop the Docker container, you will need to:

1. Find the container ID or name using:

    ```bash
    docker ps
    ```

2. Stop the container using the following command:

    ```bash
    docker stop container_id_or_name
    Replace container_id_or_name with the actual container ID or name from the docker ps output.
    ```

## Cleanup

To remove the Docker image you created, execute:

```bash
docker rmi receipt-processor
```

If the image is in use or you encounter issues, you can force the removal with:

```bash
docker rmi -f receipt-processor
```

# Create an image using Python 3.9
FROM python:3.9

# Expose a port for the api
EXPOSE 5000

# Set the working directory
WORKDIR /app

# Prevent writing of .pyc files
ENV PYTHONDONTWRITEBYTECODE 1

# Disable buffering
ENV PYTHONUNBUFFERED 1

# Add requirements.txt and use pip to install
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

# Add flask_backend to the working directory
ADD . /app

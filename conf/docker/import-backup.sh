#!/bin/bash

docker run --volumes-from ciedwebsitedev_data_1 -v /vagrant/Documents/projects/cied-website/cied-website-dev/shared:/shared ubuntu tar xvf /shared/uploads.tar -C /app

#!/bin/bash

docker run --volumes-from jhuhopkinslocaldev_data_1 -v /vagrant/jhu-hopkinslocal-dev/shared:/shared ubuntu tar cvf /shared/uploads.tar -C /app

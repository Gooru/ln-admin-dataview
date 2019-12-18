#!/bin/bash
sudo cp -r /tmp/research /var/www/
sudo /etc/init.d/nginx restart
sudo rm -rf /tmp/research

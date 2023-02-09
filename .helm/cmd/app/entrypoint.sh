#!/bin/sh

set -e

cd /var/www/html

#find ./ -type f -exec sed -i "s/BUILDTEMPLATE_APP_BASE_URL/${APP_BASE_URL//\//\\/}/g" {} \;

exec "$@"

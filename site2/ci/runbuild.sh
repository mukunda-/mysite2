#!/bin/bash

echo "Running Build"
chmod u+x gen.py
./gen.py
go build
cp main /output/mysite2.fcgi

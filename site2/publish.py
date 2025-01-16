#!/usr/bin/env python3
import subprocess as sp, os

def run(cmd):
    sp.run(cmd, shell=True, check=True)

if input("Publish to Dreamhost? (y/n): ") != "y":
    print("Aborted.")
    exit()

os.chdir("ci")
print("building")
run("docker-compose up --build")
print("uploading")
run(f'scp -i ../.dreamhost.key -r build/gens/* mukunda@iad1-shared-e1-06.dreamhost.com:~/mukunda.com/')
run(f'scp -i ../.dreamhost.key build/mysite2.fcgi mukunda@iad1-shared-e1-06.dreamhost.com:~/mukunda.com/')

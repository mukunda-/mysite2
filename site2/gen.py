#!/usr/bin/env python3
import subprocess as sp

def run(cmd):
    sp.run(cmd, shell=True, check=True)

run("templ generate")
run("npm run build")

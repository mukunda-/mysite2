import os, shutil

if input("Publish to Dreamhost? (y/n): ") != "y":
    print("Aborted.")
    exit()

print("cleaning")
shutil.rmtree('dist', ignore_errors=True)
print("building")
os.system('npm run build')
print("uploading")
os.system(f'scp -i .dreamhost.key -r dist/* mukunda@iad1-shared-e1-06.dreamhost.com:~/mukunda.com/')

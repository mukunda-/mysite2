import os

os.system("templ generate")
os.system("npx tailwindcss -i \"./style/main.css\" -o \"./gens/main.css\" --minify")

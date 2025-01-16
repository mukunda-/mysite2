# A container for cross compiling to Ubuntu.
FROM ubuntu:22.04

WORKDIR /app/

ENV PATH=$PATH:/usr/local/go/bin:/root/go/bin
ENV NVM_DIR=/root/.nvm

RUN apt-get update && apt-get install -y \
   ca-certificates python3 curl \
   && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
   && \. /root/.nvm/nvm.sh \
   && nvm install 22

RUN \. /root/.nvm/nvm.sh \
   && curl -L -O https://go.dev/dl/go1.23.4.linux-amd64.tar.gz \
   && tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz \
   && go install github.com/a-h/templ/cmd/templ@latest \
   && npm i -g tailwindcss@latest 

COPY . /app/

RUN \. /root/.nvm/nvm.sh \
   && chmod u+x ./gen.py \
   && go generate . \
   && go build

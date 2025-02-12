#
# Copyright (C) Zetafence 2021-2025
#

PKG_CMD := yarn
REPO := docker.io/zetafence
WEBUI := vfeed-webui

# Tagged release
#TAG := $(shell git describe --tags || echo latest)
TAG := v2.0.0

all:
	@echo "Installing dependencies.."
	@$(PKG_CMD) install
	@echo "Building uiserver.."
	@$(PKG_CMD) build

start:
	@echo "Starting uiserver.."
	@$(PKG_CMD) start

docker-build:
	@echo "Building docker image"
	docker buildx build --no-cache --platform linux/amd64 -t $(REPO)/$(WEBUI):$(TAG) -f Dockerfile .
	@echo "Finished building docker $(WEBUI):$(TAG)"

docker-push: 
	docker login $(REPO)
	docker push $(REPO)/$(WEBUI):$(TAG)
	@echo "Pushed docker image $(REPO)/$(WEBUI):$(TAG)"

clean:
	@echo "Cleaning $(WEBUI) files.."
	@rm -rf build/ node_modules/
	@echo "Done cleaning $(WEBUI) files.."

.PHONY: all start clean docker-build docker-push

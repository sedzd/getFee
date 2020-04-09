VERSION ?= latest

APP_IMAGE_NAME ?= saeed/fee-calculator

NODE_ENV ?= development

PORT ?= 8080

APP_CONTAINER_NAME ?= fee-calculator

build:
	@echo "\n\033[0;33m=> Building $(APP_IMAGE_NAME) image... \033[0m"
	@docker build -t $(APP_IMAGE_NAME):$(VERSION) --rm .

run-dev:
	@echo "\n\033[0;33m=> Starting app... \033[0m"
	@docker run \
		--name $(APP_CONTAINER_NAME) \
		--restart always \
		-p $(PORT):$(PORT) \
		$(APP_IMAGE_NAME):$(VERSION)

destroy:
	@echo "\n\033[0;33m=> Tearing down... \033[0m"
	@docker stop $(APP_CONTAINER_NAME)
	@docker rm -v $(APP_CONTAINER_NAME)

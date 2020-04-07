.PHONY: ls
ls:
	# ------------------------------- #
	# List of Available Make Commands #
	# ------------------------------- #
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

VIRTUAL_HOST = $(shell grep VIRTUAL_HOST .env | cut -d '=' -f2)
PROJECT = $(subst .,, $(shell basename $(CURDIR)))

# Start our docker container using dash and display the virtual host for easy opening in browser.
up:
	# --------------------------- #
	# Start: Starting virtual env #
	# --------------------------- #

	dev up;
	@echo
	@echo Virtual Host: https://$(VIRTUAL_HOST)
	@echo

	# ------------------------- #
	# End: Starting virtual env #
	# ------------------------- #

# If you're going to use this command, use it via Jenkins.
# https://wiki.happycog.com/pages/viewpage.action?pageId=8326016
deploy-on-staging:
	# ------------------------------- #
	# Start: Deploy to staging
	# ------------------------------- #

	yarn build && \
	rsync -avz -e 'ssh' --exclude=.DS_Store web/assets XXX@test.vmgdev.com:web/web && \
	ssh -t XXX@test.vmgdev.com 'cd web && \
	git pull origin staging && \
	cd ../ && \
	docker-compose exec -T web composer install'

	# ------------------------------- #
	# End: Deploy to staging
	# ------------------------------- #

# Give us a bash instance inside of our container
bash:
	# ----------------------------------------- #
	# Start: Running Web Container Bash Command #
	# ----------------------------------------- #

	@read -p "Enter Bash Command: " COMMAND && \
	docker-compose run web /bin/bash -c "cd /var/www; $$COMMAND"

	# --------------------------------------- #
	# End: Running Web Container Bash Command #
	# --------------------------------------- #

# Give us a node instance inside of our container
node:
	# ----------------------------------------- #
	# Start: Running Node Container Command #
	# ----------------------------------------- #

	@read -p "Enter Node Command: " NODECOMMAND && \
	dev run --rm node $$NODECOMMAND

	# --------------------------------------- #
	# End: Running Web Container Bash Command #
	# --------------------------------------- #

# Run Ngrok Instance
ngrok:
	# -------------------- #
	# Start: Running ngrok #
	# -------------------- #

	@echo http://localhost:4040 && \
	docker run --rm -it \
		--network dash \
		--name $(PROJECT)_ngroktunnel \
		-p 4040:4040 \
		--env NGROK_REGION=us \
		--env TARGET_HOST=web \
		--env TARGET_PORT=80 \
		gtriggiano/ngrok-tunnel:development

	# ------------------ #
	# End: Running ngrok #
	# ------------------ #

# Synchronization
pull-db-staging:
	# --------------------------------------- #
	# Start: Copy database from staging       #
	# --------------------------------------- #

	./scripts/pull-db.sh

	# --------------------------------------- #
	# End: Copy database from staging         #
	# --------------------------------------- #
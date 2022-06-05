vueui:
	docker-compose run --rm bw-frontend vue ui

build:
	docker-compose run --rm bw-vue-ui-node npm run --prefix frontend build

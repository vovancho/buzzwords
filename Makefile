vueui:
	docker-compose run --rm bw-frontend vue ui

up:
	docker-compose up -d --build --remove-orphans

stop:
	docker-compose stop

build:
	docker-compose run --rm bw-vue-ui-node npm run --prefix frontend build

log:
	docker-compose logs --tail=50 -f bw-vue-ui-node

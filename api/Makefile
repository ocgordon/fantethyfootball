truffle-compile:
	docker-compose run --rm truffle compile --all

truffle-test:
	docker-compose run --rm truffle test contracts/test/*.js

truffle-migrate:
	docker-compose run --rm truffle migrate --network=skale --reset

truffle-clean:
	rm ./truffle/build/contracts/*

api-test:
	# --verbose displays individual tests being run. --silent suppress console logs/errors
	docker-compose run --rm api npm test

get-started:
	docker-compose up -d && make truffle-migrate

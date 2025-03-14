.PHONY: start build test eject lint clean

start:
	yarn run start

build:
	yarn run build

test:
	yarn run test

eject:
	yarn run eject

lint:
	yarn run lint

clean:
	rm -rf node_modules yarn.lock package-lock.json && yarn install

format:
	npx prettier --write .
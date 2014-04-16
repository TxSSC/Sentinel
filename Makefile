test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--timeout 2000 \
		test/

.PHONY: test
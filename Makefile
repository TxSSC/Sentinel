test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		test/

.PHONY: test
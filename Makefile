lint: # комманда для запуска линтера
	npx eslint .
start1: # комманда для запуска программы
	node bin/gendiff './__fixtures__/file1.json' './__fixtures__/file2.json'
start2: # комманда для запуска программы
	node bin/gendiff './__fixtures__/file1.yaml' './__fixtures__/file2.yml'
install: #установка зависимостей при клонировании проекта или при удалении node_modules
	npm ci
publish: # чтобы не засорять общее хранилище учебными пакетами
	npm publish --dry-run
test: # комманда для запуска тестов
	npx jest
test-coverage:
	npx jest --coverage --coverageProvider=v8
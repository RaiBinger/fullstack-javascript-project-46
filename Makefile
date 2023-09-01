lint: # комманда для запуска линтера
	npx eslint .
start: # комманда для запуска программы
	node bin/gendiff './file1.json' './file2.json'
install: #установка зависимостей при клонировании проекта или при удалении node_modules
	npm ci
publish: # чтобы не засорять общее хранилище учебными пакетами
	npm publish --dry-run
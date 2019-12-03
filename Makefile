.SILENT:

start: reload node

reload:
	cd front && npm run dev &

node:
	node back/index.js
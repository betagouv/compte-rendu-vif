web: pnpm frontend start
docker run --pull always --rm --interactive --tty -e STACK=scalingo-22 -v ./heroku-buildpack-pnpm:/buildpack -v ./compte-rendu-vif:/build scalingo/scalingo-22:latest bash

## Sigbit-admin

#### [Live demo/docs](https://significantbit.github.io/sigbit-admin/)

### Installation
To install repository run the following command

`npm install`

You also need to install gulp cli

`npm install -g gulp-cli`

This will install all neccessary node packages

### Running dev mode
In dev mode we use gulp and broswersync to create a server, watch the files and auto reload. 
Run the following commands to start

`gulp`

This will start a server on `localhost:3200` (default) where you can develop on

### Github page

To deploy to gh-pages run the following commands

```bash
gulp prod
gulp deploy
```

It will build and deploy lastest version to the gh-pages branch

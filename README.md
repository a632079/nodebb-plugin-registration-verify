# nodebb-plugin-registration-verify
A plugin that requires visitors to fill in the verification code when registering.
**This is a test plugin, the function is not yet complete (no ajax check, no click-to-reload).**
## How to install?
```shell
npm i nodebb-plugin-registration-verify
```
**Because Beta,you should do following to build node-canvas(!important)**

* First,install node-canvas dependences
OS | Command
----- | -----
OS X | `brew install pkg-config cairo pango libpng jpeg giflib`
Ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
Windows | [Instructions on our wiki](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)

```shell
#build node-canvas && restart nodeBB
cd ./node_modules/nodebb-plugin-registration-verify && npm i && cd ../../ && ./nodebb build && ./nodebb restart
```

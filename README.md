# Skeleton

Skeleton is the boilerplate for quick rup-up any responsive project

## Getting started

### Install Global Dependencies
  * [Node.js](http://nodejs.org)
  * [bower](http://bower.io): `[sudo] npm install bower -g`
  * [bower installer](https://github.com/rquadling/bower-installer): `[sudo] npm install bower-installer -g`
  * [gulp](http://gulpjs.com/): `[sudo] npm install gulp -g`

### Install Local Dependencies
  * cd to project folder
  * run `[sudo] npm install` (first time users)
  * run `bower-installer` (first time users)
  * run `gulp` (to watch and compile sass files)

## FAQ

### Windows users

To use Bower on Windows, you must install Git for Windows correctly. Be sure to check the options shown below:

  * Use Git from the Windows Command Prompt
  * Checkout Windows-style, commit Unix-style line endings

Download link [Git for Windows](http://git-for-windows.github.io/)

### Git

If you have problem to get bower packages with this error:

```
bower ECMDERR	Failed to execute "git ls-remote --tags --heads git://github.com/...", exit code of #128 fatal: unable to connect to github.com: github.com[0: 192.30.252.128]: errno=No error
```

You have to change the protocol by running this command:
```
git config --global url."https://".insteadOf git://
```

# RimeRoyal
guild villanelle game

Stealing/modifying the Villanelle Readme for now:

### Installing

You will need to install nodejs and npm on your machine first 

For Windows, install from: https://nodejs.org/en/

After cloning the project, you will need to install all the module dependencies via npm. Navigate to the project folder (make sure you're in it, there should be a package.json file) and run the command:

Tip: Open the project directory in Windows Explorer and type 'cmd' in the address bar to open a terminal in the folder (no need to navigate).

```
npm install
```

This will install typescript, gulp and other dependencies. You will see a node_modules folder appear in the directory.

Install gulp-cli globally in order to run gulp from the command line:

```
npm install -g gulp-cli
```

Run gulp:
```
gulp
```

This will recompile the files in the src directory and republish them in the dist folder. You can run the guild.html in the dist folder. If you make any changes to scripting.ts or guild.ts, you dont have to recompile (as long as you have the gulp process open), just refresh guild.html.
gulp is used to streamline our build process which is specified in gulpfile.js. We use browserify to bundle all the files together (and it is this bundle.js which is used in guild.html) and we use watchify to monitor for changes in the source files to compile them again.

Source code is guild.js and guild.html. Guild.js is in src/. I think the html file is in dist/ and the one in src/ is unneeded but I'll have to check later.

### Running typescript individually on files

If you want to run typescript individually on files in order to check the exact compiler errors, you would first have to install typescript globally:

```
npm install -g typescript
```

You can then enter the source folder and run the tsc command on any typescript file:

```
tsc scripting.ts
```


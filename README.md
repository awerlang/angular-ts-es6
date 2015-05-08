# angular-ts-es6
Build-as-you-save for your TypeScript+ES6+AngularJS workflow

## Audience

Do you build apps on AngularJS, use TypeScript outputting ECMAScript 6 flavored code, and want to run on current browsers? Keep reading this then.

For those who are using TypeScript, must already be aware that the feedback cycle is just too slow if you recompile all input files every time.
I found that the faster workflow is to use tsc own watch mode, then watching tsc output for changes, feed that to babel, then to ng-annotate.

Also, if you build your apps with AngularJS, you must annotate all injectable functions, in case you'll want to minify your scripts (and you'll want to do so, it loads your apps faster!). It is way boring having to write and maintain all these annotations by hands, so you'd prefer a tool to handle it.

## Features

* Input files: TypeScript;
* Transpiler: Babel;
* Minification-safe AngularJS apps, runs ng-annotate on your files after transpiling to ES5;
* Faster than most workflows using this tools.

## Configuring

It is assumed your project follows the following structure:

Directory Layout
```
\ (root)
  + tscfiles.txt
  + dist
    + all.js
```

There you'll find a `tscfiles.txt` whose contents shall be one filename per line, for each and all files that should be fed to TypeScript `tsc` command.
Inside `dist` folder, you'll find generated files. Final output is named `all.js`.

If you wish, you can automate creation of `tscfiles.txt` on Windows by creating these two scripts on your project's package.json, given that your *.ts files are saved to a folder called `features`:

```
"scripts": {
  ...
  "prewatch": "dir features\\*.ts /B /S > tscfiles.txt",
  "watch": "node watch.js"
}
```

# Running

Whenever you start working on your project, open a terminal and type the following:

```
npm run watch
```

Keep this window open as long you want to work on your project.

var sh = require('shelljs'),
    chokidar = require('chokidar');

function tsc() {
    sh.exec("tsc --target ES6 --noEmitOnError --out dist\\all.es6.js -w @tscfiles.txt", { async: true }, function (code) {
        if (code !== 0) tsc();
    });
}

function babel() {
    sh.exec("6to5 dist\\all.es6.js --blacklist=useStrict --out-file dist\\all.es5.js", { async: true }, function (code) {
        if (code !== 0) babel();
    });
}

function annotate() {
    sh.exec("ng-annotate -a dist\\all.es5.js > dist\\all.js", { async: true }, function (code) {
        console.log('ann (' + code + ')');
    });
}

function babel_annotate() {
    sh.exec("6to5 dist\\all.es6.js --blacklist=useStrict | ng-annotate -a - > dist\\all.js", { async: true }, function (code) {
        if (code !== 0) babel_annotate();
        console.log('ann (' + code + ')');
    });
}

function run() {
    tsc();

    var babelto, annto;
    chokidar.watch('dist\\all.es6.js', { ignoreInitial: true })
        .on('add', function (path) {
            console.log("babel: add " + path);
            clearTimeout(babelto);
            clearTimeout(annto);
            babelto = setTimeout(babel_annotate, 150);
        }).on('change', function (path) {
            console.log("babel: change " + path);
            clearTimeout(babelto);
            clearTimeout(annto);
            babelto = setTimeout(babel_annotate, 150);
        });

    chokidar.watch('dist\\all.es5.js', { ignoreInitial: true })
        .on('add', function (path) {
            console.log("annotate: add " + path);
            clearTimeout(annto);
            annto = setTimeout(annotate, 150);
        }).on('change', function (path) {
            console.log("annotate: change " + path);
            clearTimeout(annto);
            annto = setTimeout(annotate, 150);
        });
}

var d = require('domain').create();
d.on('error', function (err) {
    console.log("ERROR: " + err);
})

// catch the uncaught errors in this asynchronous or synchronous code block
d.run(function () {
    run();
});

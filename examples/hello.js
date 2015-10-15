try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start(
            'http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost');
        spooky.then(
          function () {
            this.viewport(1920, 1080);
            // this.viewport(values.viewport.width, values.viewport.height);
            // this.emit('hello', 'Hello, from ' + this.evaluate(function () {
            //     return document.title;
            // }));
            this.capture('test.png');
        });
        spooky.thenOpen('http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost', function() {
          this.wait(5000);
          this.evaluate(function() {
            if(document.body.style.backgroundColor===''){
            // 透過背景になるのを防止
            document.body.style.backgroundColor="#fff"
            }
          });
        });
        spooky.run();
    });

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
    console.log(line);
});
*/

spooky.on('hello', function (greeting) {
    console.log(greeting);
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});

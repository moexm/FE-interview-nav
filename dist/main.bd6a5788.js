// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var xObject = JSON.parse(localStorage.getItem('x'));
var hashmap = xObject || [{
  logo: 'a',
  logoType: 'url',
  link: 'https://www.acfun.cn'
}, {
  logo: 'b',
  logoType: 'img',
  link: 'http://bilibili.com'
}]; //简化URL

var removeX = function removeX(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashmap.forEach(function (node, index) {
    var $li = $(" <li class=\"site\">\n                            <div class=\"logo\">".concat(node.logo, "</div>\n                            <div class=\"link\"> ").concat(removeX(node.link), "</div>\n                            <div class=\"close\"> \n                                <svg class=\"icon\" >\n                                <use xlink:href=\"#icon-close\"></use>\n                                </svg>\n                            </div>\n                    </li>"));
    $li.insertBefore($lastLi); // 代替<a>标签, 有问题

    $li.on('click', function () {
      window.open(node.link);
    });
    $li.on('click', '.close', function (e) {
      console.log(index + 'stop');
      e.stopPropagation();
      hashmap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加什么网站');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashmap.push({
    logo: removeX(url)[0],
    logoType: "url",
    link: url
  });
  render();
});

window.onbeforeunload = function () {
  console.log(hashmap);
  var string = JSON.stringify(hashmap);
  localStorage.setItem('x', string);
}; // 键盘事件， 快捷打开


$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashmap.length; i++) {
    if (hashmap[i].logo.toLowerCase() === key) {
      window.open(hashmap[i].link);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=https://github.com/moexm/FE-interview-nav/dist/main.bd6a5788.js.map
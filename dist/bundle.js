'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var UncommentWebpackPlugin =
/*#__PURE__*/
function () {
  /**
   * @param {string} options.startComment
   * @param {string} options.endComment
   */
  function UncommentWebpackPlugin(options) {
    _classCallCheck(this, UncommentWebpackPlugin);

    var defaultOptions = {
      startComment: 'uncomment-in-development-start',
      endComment: 'uncomment-in-development-end'
    };
    this.options = Object.assign({}, defaultOptions, options);
  }

  _createClass(UncommentWebpackPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.compilation.tap('UncommentWebpackPlugin', function (compilation) {
        var _this$options = _this.options,
            startComment = _this$options.startComment,
            endComment = _this$options.endComment;
        compilation.hooks.optimizeModules.tap('UncommentWebpackPlugin', function () {
          var reg = new RegExp("(?:[\\t\\ ]*)(?:\\/\\/|\\/\\*)(?:[\\t\\ ]*)".concat(startComment, "(?:[\\t\\ ]*)(?:\\*\\/)*\n([\\s\\S]*?)(?:[\\t\\ ]*)(?:\\/\\/|\\/\\*)*(?:[\\t\\ ]*)").concat(endComment, "(?:[\\t\\ ]*)(?:\\*\\/)*\n?"), 'g');
          compilation.modules.forEach(function (module) {
            var file = module.resource;

            if (/\.js$/.test(file) && /src\//.test(file)) {
              var contents = module._source._value;
              var match = '';

              while (match = reg.exec(contents)) {
                var uncommentCode = match[1].replace(/\/\/|\\\*|\*\//g, '');
                module._source._value = contents.replace(match[0], uncommentCode);
              }
            }
          });
        });
      });
    }
  }]);

  return UncommentWebpackPlugin;
}();

module.exports = UncommentWebpackPlugin;

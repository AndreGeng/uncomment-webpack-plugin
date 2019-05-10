class UncommentWebpackPlugin{
  /**
   * @param {string} options.startComment
   * @param {string} options.endComment
   */
  constructor(options) {
    const defaultOptions = {
      startComment: 'uncomment-in-development-start',
      endComment: 'uncomment-in-development-end',
    };
    this.options = Object.assign({}, defaultOptions, options);
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('UncommentWebpackPlugin', (compilation) => {
      const {
        startComment,
        endComment,
      } = this.options;
      compilation.hooks.optimizeModules.tap('UncommentWebpackPlugin', () => {
        const reg = new RegExp(`(?:[\\t\\ ]*)(?:\\/\\/|\\/\\*)(?:[\\t\\ ]*)${startComment}(?:[\\t\\ ]*)(?:\\*\\/)*\n([\\s\\S]*?)(?:[\\t\\ ]*)(?:\\/\\/|\\/\\*)*(?:[\\t\\ ]*)${endComment}(?:[\\t\\ ]*)(?:\\*\\/)*\n?`, 'g');
        compilation.modules.forEach((module) => {
            const file = module.resource;
            if (/\.js$/.test(file) && /src\//.test(file)) {
              const contents = module._source._value;
              let match = '';
              while (match = reg.exec(contents)) {
                const uncommentCode = match[1].replace(/\/\/|\\\*|\*\//g, '');
                module._source._value = contents.replace(match[0], uncommentCode);
              }
            }
          });
      });
    });
  }
}

module.exports = UncommentWebpackPlugin;

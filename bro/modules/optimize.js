'use strict';

import js2svg from 'svgo/lib/svgo/js2svg';
import svg2js from 'svgo/lib/svgo/svg2js';
import plugins from 'svgo/lib/svgo/plugins';

var PLUGINS_LIST = [];

export default function optimize(svg, callback) {
  svg2js(svg, (ast) => {
    if (ast.error) {
      return callback(ast.error);
    }

    var optimizedAst = plugins(ast, PLUGINS_LIST);
    var optimizedSvg = js2svg(optimizedAst).data;
    callback(null, optimizedSvg);
  });
}

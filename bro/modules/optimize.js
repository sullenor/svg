'use strict';

import js2svg from 'svgo/lib/svgo/js2svg';
import svg2js from 'svgo/lib/svgo/svg2js';

var PLUGINS_LIST = [
  require('svgo/plugins/cleanupAttrs'),
  require('svgo/plugins/removeDoctype'),
  require('svgo/plugins/removeXMLProcInst'),
  require('svgo/plugins/removeComments'),
  require('svgo/plugins/removeMetaData'),
  require('svgo/plugins/removeDesc'),
  require('svgo/plugins/removeUselessDefs'),
  require('svgo/plugins/removeEditorsNSData'),
  require('svgo/plugins/removeEmptyAttrs'),
  require('svgo/plugins/removeHiddenElems'),
  require('svgo/plugins/removeEmptyText'),
  require('svgo/plugins/removeEmptyContainers'),
  require('svgo/plugins/convertStyleToAttrs'),
  require('svgo/plugins/convertColors'),
  require('svgo/plugins/convertPathData'),
  require('svgo/plugins/convertTransform'),
  require('svgo/plugins/removeUnknownsAndDefaults'),
  require('svgo/plugins/removeNonInheritableGroupAttrs'),
  require('svgo/plugins/removeUselessStrokeAndFill'),
  require('svgo/plugins/removeUnusedNS'),
  require('svgo/plugins/cleanupIDs'),
  require('svgo/plugins/cleanupNumericValues'),
  require('svgo/plugins/moveElemsAttrsToGroup'),
  require('svgo/plugins/moveGroupAttrsToElems'),
  require('svgo/plugins/collapseGroups'),
  require('svgo/plugins/convertShapeToPath')
];

function plugins(ast, list) {
  list.forEach(function (plugin) {
    switch(plugin.type) {
    case 'perItem':
      ast = perItem(ast, plugin);
      break;
    case 'perItemReverse':
      ast = perItem(ast, plugin, true);
      break;
    case 'full':
      ast = full(ast, plugin);
      break;
    }
  });

  return ast;
}

function perItem(data, plugin, reverse) {
  function monkeys(items) {
    items.content = items.content.filter(function(item) {
      if (reverse && item.content && item.elem != 'foreignObject') {
        monkeys(item);
      }

      var filter = true;
      if (plugin.active && plugin.fn(item, plugin.params) === false) {
        filter = false;
      }

      if (!reverse && item.content && item.elem != 'foreignObject') {
        monkeys(item);
      }

      return filter;
    });

    return items;
  }

  return monkeys(data);
}

function full(data, plugin) {
  if (plugin.active) {
      data = plugin.fn(data, plugin.params);
  }

  return data;
}

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

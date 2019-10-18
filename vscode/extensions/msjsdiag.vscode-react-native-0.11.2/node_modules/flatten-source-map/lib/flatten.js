WebInspector = require('./inspector');
SourceMap = require('source-map');

function FlattenSourceMap(map) {
  var originalMap = new WebInspector.SourceMap(map.file, map);
  
  var generatedMap = new SourceMap.SourceMapGenerator();
  generatedMap._file = map.file;

  var sources = originalMap.sources();
  sources.forEach(function(sourceFile){
    var sourceContent = originalMap.sourceContent(sourceFile);
    generatedMap.setSourceContent(sourceFile, sourceContent);
  });

  originalMap._mappings.forEach(function(m){
    if (m.length < 5) {
      return;
    }
    var mapping = {
      source: m[2],
      original: {
        line: m[3] + 1, // Mozilla lines are 1-based?
        column: m[4]
      },
      generated: {
        line: m[0] + 1,
        column: m[1]
      }
    };
    generatedMap.addMapping(mapping);
  });

  return generatedMap.toJSON();
}

module.exports = FlattenSourceMap;

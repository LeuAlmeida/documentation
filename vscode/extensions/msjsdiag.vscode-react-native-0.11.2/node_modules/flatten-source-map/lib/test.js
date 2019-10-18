var originalMap = {
  "version":3,
  "file":"/app.js",
  "sections":[
    {
      "map": {
        "version":3,
        "file":"",
        "sourceRoot":"",
        "sources":["/main/main.coffee"],
        "names":[],
        "mappings":"AAAA;AAAA,EAAA,OAAO,CAAC,MAAR,CAAe,eAAf,EAAgC,CAC5B,0BAD4B,EAE5B,eAF4B,CAAhC,CAAA,CAAA;AAAA",
        "sourcesContent":["angular.module('stassets.main', [\n    'stassets.main.controller'\n    'main.template'\n])\n"]
      },
      "offset":{"line":0,"column":0}
    },
    {
      "map": {
        "version":3,
        "sources": ["/main/nav/service.js"],
        "names": ["angular","module","service","NavSvc","started","Date"],
        "mappings":";AAAAA,OAAO,CAACC,MAAM,CAAC,2BAA2B,EAAE;AAC5C,CAAC,CAAC,CAACC,OAAO,CAAC,QAAQ,EAAE,SAASC,MAAM,CAAC,CAAC;IAClC,IAAI,CAACC,QAAQ,EAAE,IAAIC,IAAI,CAAC,CAAC;AAC7B,CAAC,CAAC",
        "file":"/main/nav/service.js",
        "sourcesContent": ["angular.module('stassets.main.nav.service', [\n]).service('NavSvc', function NavSvc(){\n    this.started = new Date();\n});\n"]
      },
      "offset":{"line":6,"column":0}
    },
    {
      "map":{
        "version":3,
        "file":"",
        "sourceRoot":"",
        "sources":["/main/controller.coffee"],
        "names":[],
        "mappings":"AAAA;AAAA,MAAA,QAAA;;AAAA,EAAM;AACW,IAAA,kBAAA,GAAA,CAAb;;oBAAA;;MADJ,CAAA;;AAAA,EAGA,OAAO,CAAC,MAAR,CAAe,0BAAf,EAA2C,EAA3C,CACA,CAAC,UADD,CACY,UADZ,EACwB,QADxB,CAHA,CAAA;AAAA",
        "sourcesContent":["class MainCtrl\n    constructor: ->\n\nangular.module('stassets.main.controller', [])\n.controller 'MainCtrl', MainCtrl\n"]
      },"offset":{"line":14,"column":0}
    },
    {
      "map":{
        "version":3,
        "file":"",
        "sourceRoot":"",
        "sources":["/main/nav/directive.coffee"],
        "names":[],
        "mappings":"AAAA;AAAA,EAAA,OAAO,CAAC,MAAR,CAAe,6BAAf,EAA8C,CAC1C,mBAD0C,EAE1C,kBAF0C,CAA9C,CAGE,CAAC,SAHH,CAGa,YAHb,EAG2B,SAAA,GAAA;WACvB;AAAA,MAAA,QAAA,EAAU,IAAV;AAAA,MACA,WAAA,EAAa,UADb;MADuB;EAAA,CAH3B,CAAA,CAAA;AAAA",
        "sourcesContent":["angular.module('stassets.main.nav.directive', [\n    'main.nav.template'\n    'main.nav.service'\n]).directive 'stassetNav', ->\n    restrict: 'AE'\n    templateUrl: 'main/nav'\n"]
      },"offset":{"line":28,"column":0}
    }
  ]
};

var expectedMap = {
  version: 3,
  sources: [
    "/main/main.coffee",
    "/main/nav/service.js",
    "/main/controller.coffee",
    "/main/nav/directive.coffee"
  ],
  names: [],
  mappings: "AAAA;AAAA,EAAA,OAAO,CAAC,MAAR,CAAe,eAAf,EAAgC,CAC5B,0BAD4B,EAE5B,eAF4B,CAAhC,CAAA,CAAA;AAAA;;;;;ACAA,OAAO,CAAC,MAAM,CAAC,2BAA2B,EAAE;AAC5C,CAAC,CAAC,CAAC,OAAO,CAAC,QAAQ,EAAE,SAAS,MAAM,CAAC,CAAC;IAClC,IAAI,CAAC,QAAQ,EAAE,IAAI,IAAI,CAAC,CAAC;AAC7B,CAAC,CAAC;;;;ACHF;AAAA,MAAA,QAAA;;AAAA,EAAM;AACW,IAAA,kBAAA,GAAA,CAAb;;oBAAA;;MADJ,CAAA;;AAAA,EAGA,OAAO,CAAC,MAAR,CAAe,0BAAf,EAA2C,EAA3C,CACA,CAAC,UADD,CACY,UADZ,EACwB,QADxB,CAHA,CAAA;AAAA;;;ACAA;AAAA,EAAA,OAAO,CAAC,MAAR,CAAe,6BAAf,EAA8C,CAC1C,mBAD0C,EAE1C,kBAF0C,CAA9C,CAGE,CAAC,SAHH,CAGa,YAHb,EAG2B,SAAA,GAAA;WACvB;AAAA,MAAA,QAAA,EAAU,IAAV;AAAA,MACA,WAAA,EAAa,UADb;MADuB;EAAA,CAH3B,CAAA,CAAA;AAAA",
  file: "/app.js",
  sourcesContent: [
    "angular.module('stassets.main', [\n    'stassets.main.controller'\n    'main.template'\n])\n",
    "angular.module('stassets.main.nav.service', [\n]).service('NavSvc', function NavSvc(){\n    this.started = new Date();\n});\n",
    "class MainCtrl\n    constructor: ->\n\nangular.module('stassets.main.controller', [])\n.controller 'MainCtrl', MainCtrl\n",
    "angular.module('stassets.main.nav.directive', [\n    'main.nav.template'\n    'main.nav.service'\n]).directive 'stassetNav', ->\n    restrict: 'AE'\n    templateUrl: 'main/nav'\n"
  ]
};

var flatten = require('./flatten');
var generatedMap = flatten(originalMap);

if (JSON.stringify(expectedMap) === JSON.stringify(generatedMap))
  console.log("\x1B[32m Tests passing!");
else
  console.error('\033[31m Tests failing!');
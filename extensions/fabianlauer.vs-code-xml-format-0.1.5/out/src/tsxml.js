!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.xml=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _regenerator = _dereq_("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = _dereq_("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Parser_1 = _dereq_('./parser/Parser');

var Compiler = function () {
    function Compiler() {
        (0, _classCallCheck3.default)(this, Compiler);
    }

    (0, _createClass3.default)(Compiler, null, [{
        key: "parseXml",

        /**
         * Parses an XML string and returns the parser object that parsed it.
         */
        value: function parseXml(xmlString, ruleSet) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt("return", Parser_1.Parser.parseString(xmlString, ruleSet));

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * Parses an XML string and returns the a syntax tree.
         */

    }, {
        key: "parseXmlToAst",
        value: function parseXmlToAst(xmlString, ruleSet) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt("return", Parser_1.Parser.parseStringToAst(xmlString, ruleSet));

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * Parses an XML string to a syntax tree, then serializes it to formatted XML.
         */

    }, {
        key: "formatXmlString",
        value: function formatXmlString(xmlString, formattingOptions, ruleSet) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return Parser_1.Parser.parseStringToAst(xmlString, ruleSet);

                            case 2:
                                _context3.t0 = formattingOptions;
                                return _context3.abrupt("return", _context3.sent.toFormattedString(_context3.t0));

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return Compiler;
}();

exports.Compiler = Compiler;
},{"./parser/Parser":17,"babel-runtime/core-js/promise":32,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/regenerator":42}],2:[function(_dereq_,module,exports){
"use strict";

var Attribute_1 = _dereq_('./ast/Attribute');
exports.Attribute = Attribute_1.Attribute;
var Node_1 = _dereq_('./ast/Node');
exports.Node = Node_1.Node;
var SelfClosingNode_1 = _dereq_('./ast/SelfClosingNode');
exports.SelfClosingNode = SelfClosingNode_1.SelfClosingNode;
var VoidNode_1 = _dereq_('./ast/VoidNode');
exports.VoidNode = VoidNode_1.VoidNode;
var TextNode_1 = _dereq_('./ast/TextNode');
exports.TextNode = TextNode_1.TextNode;
var CommentNode_1 = _dereq_('./ast/CommentNode');
exports.CommentNode = CommentNode_1.CommentNode;
var CDataSectionNode_1 = _dereq_('./ast/CDataSectionNode');
exports.CDataSectionNode = CDataSectionNode_1.CDataSectionNode;
var DeclarationOpenerNode_1 = _dereq_('./ast/DeclarationOpenerNode');
exports.DeclarationOpenerNode = DeclarationOpenerNode_1.DeclarationOpenerNode;
var ProcessingInstructionNode_1 = _dereq_('./ast/ProcessingInstructionNode');
exports.ProcessingInstructionNode = ProcessingInstructionNode_1.ProcessingInstructionNode;
var ContainerNode_1 = _dereq_('./ast/ContainerNode');
exports.ContainerNode = ContainerNode_1.ContainerNode;
var DocumentNode_1 = _dereq_('./ast/DocumentNode');
exports.DocumentNode = DocumentNode_1.DocumentNode;
},{"./ast/Attribute":3,"./ast/CDataSectionNode":4,"./ast/CommentNode":5,"./ast/ContainerNode":6,"./ast/DeclarationOpenerNode":7,"./ast/DocumentNode":8,"./ast/Node":9,"./ast/ProcessingInstructionNode":10,"./ast/SelfClosingNode":11,"./ast/TextNode":12,"./ast/VoidNode":13}],3:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = _dereq_("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attribute = function () {
    function Attribute() {
        (0, _classCallCheck3.default)(this, Attribute);
    }

    (0, _createClass3.default)(Attribute, [{
        key: "valueOf",
        value: function valueOf() {
            return this.value;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.value + '';
        }
    }], [{
        key: "create",
        value: function create(value) {
            return new (function (_Attribute) {
                (0, _inherits3.default)(_class, _Attribute);

                function _class() {
                    var _Object$getPrototypeO;

                    (0, _classCallCheck3.default)(this, _class);

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(_class)).call.apply(_Object$getPrototypeO, [this].concat(args)));

                    _this.value = value;
                    return _this;
                }

                return _class;
            }(Attribute))();
        }
    }]);
    return Attribute;
}();

exports.Attribute = Attribute;
},{"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],4:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextNode_1 = _dereq_('./TextNode');

var CDataSectionNode = function (_TextNode_1$TextNode) {
    (0, _inherits3.default)(CDataSectionNode, _TextNode_1$TextNode);

    function CDataSectionNode() {
        (0, _classCallCheck3.default)(this, CDataSectionNode);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CDataSectionNode).apply(this, arguments));
    }

    (0, _createClass3.default)(CDataSectionNode, [{
        key: 'stringify',

        /**
         * @override
         */
        value: function stringify(params, nodeIndentDepth) {
            return CDataSectionNode.generateIndentString(params.indentChar, nodeIndentDepth) + '<![CDATA[' + this.stringifyContent(params, nodeIndentDepth) + ']]>' + params.newlineChar;
        }
        /**
         * @override
         */

    }, {
        key: 'stringifyMultiLineContent',
        value: function stringifyMultiLineContent(params, nodeIndentDepth) {
            if (/\n/.test(params.newlineChar)) {
                return '\n' + (0, _get3.default)((0, _getPrototypeOf2.default)(CDataSectionNode.prototype), 'stringifyMultiLineContent', this).call(this, params, nodeIndentDepth) + CDataSectionNode.generateIndentString(params.indentChar, nodeIndentDepth);
            } else {
                return (0, _get3.default)((0, _getPrototypeOf2.default)(CDataSectionNode.prototype), 'stringifyMultiLineContent', this).call(this, params, nodeIndentDepth);
            }
        }
        /**
         * @override
         */

    }, {
        key: 'stringifySingleLineContent',
        value: function stringifySingleLineContent(params, nodeIndentDepth) {
            return (this.content || '').replace(/(\r?\n(\t*))+/g, ' ');
        }
    }]);
    return CDataSectionNode;
}(TextNode_1.TextNode);

exports.CDataSectionNode = CDataSectionNode;
},{"./TextNode":12,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/get":37,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],5:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextNode_1 = _dereq_('./TextNode');

var CommentNode = function (_TextNode_1$TextNode) {
    (0, _inherits3.default)(CommentNode, _TextNode_1$TextNode);

    function CommentNode() {
        (0, _classCallCheck3.default)(this, CommentNode);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentNode).apply(this, arguments));
    }

    (0, _createClass3.default)(CommentNode, [{
        key: 'stringify',

        /**
         * @override
         */
        value: function stringify(params, nodeIndentDepth) {
            return CommentNode.generateIndentString(params.indentChar, nodeIndentDepth) + '<!--' + this.stringifyContent(params, nodeIndentDepth) + '-->' + params.newlineChar;
        }
        /**
         * @override
         */

    }, {
        key: 'stringifyMultiLineContent',
        value: function stringifyMultiLineContent(params, nodeIndentDepth) {
            if (/\n/.test(params.newlineChar)) {
                return '\n' + (0, _get3.default)((0, _getPrototypeOf2.default)(CommentNode.prototype), 'stringifyMultiLineContent', this).call(this, params, nodeIndentDepth) + CommentNode.generateIndentString(params.indentChar, nodeIndentDepth);
            } else {
                return ' ' + (0, _get3.default)((0, _getPrototypeOf2.default)(CommentNode.prototype), 'stringifyMultiLineContent', this).call(this, params, nodeIndentDepth) + ' ';
            }
        }
        /**
         * @override
         */

    }, {
        key: 'stringifySingleLineContent',
        value: function stringifySingleLineContent(params, nodeIndentDepth) {
            return ' ' + (this.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim() + ' ';
        }
    }]);
    return CommentNode;
}(TextNode_1.TextNode);

exports.CommentNode = CommentNode;
},{"./TextNode":12,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/get":37,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],6:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node_1 = _dereq_('./Node');
/**
 * Base class for all nodes that may contain child elements.
 */

var ContainerNode = function (_Node_1$Node) {
    (0, _inherits3.default)(ContainerNode, _Node_1$Node);

    function ContainerNode() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, ContainerNode);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(ContainerNode)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.childNodes = [];
        return _this;
    }

    (0, _createClass3.default)(ContainerNode, [{
        key: 'getNumberOfChildren',
        value: function getNumberOfChildren() {
            return this.childNodes.length;
        }
    }, {
        key: 'getChildAtIndex',
        value: function getChildAtIndex(index) {
            return this.childNodes[index];
        }
    }, {
        key: 'getIndexOfChild',
        value: function getIndexOfChild(child) {
            return this.childNodes.indexOf(child);
        }
    }, {
        key: 'hasChild',
        value: function hasChild(child) {
            return this.getIndexOfChild(child) !== -1;
        }
        /**
         * @chainable
         */

    }, {
        key: 'insertChildAt',
        value: function insertChildAt(child, index) {
            Node_1.Node.changeParentNode(child, this);
            this.childNodes.splice(index, 0, child);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'removeChildAt',
        value: function removeChildAt(index) {
            var removedNode = this.childNodes.splice(index, 1)[0];
            Node_1.Node.removeParentNode(removedNode);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'insertChildBefore',
        value: function insertChildBefore(child, referenceChild) {
            if (!this.hasChild(referenceChild)) {
                throw new Error('Can not insert child: reference child not found.');
            }
            this.insertChildAt(child, this.getIndexOfChild(referenceChild));
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'insertChildAfter',
        value: function insertChildAfter(child, referenceChild) {
            if (!this.hasChild(referenceChild)) {
                throw new Error('Can not insert child: reference child not found.');
            }
            this.insertChildAt(child, this.getIndexOfChild(referenceChild) + 1);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'prependChild',
        value: function prependChild(child) {
            this.insertChildAt(child, 0);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'appendChild',
        value: function appendChild(child) {
            this.insertChildAt(child, this.getNumberOfChildren());
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'replaceChild',
        value: function replaceChild(oldChild, newChild) {
            var index = this.getIndexOfChild(oldChild);
            this.removeChildAt(index);
            this.insertChildAt(newChild, index);
            return this;
        }
    }, {
        key: 'forEachChildNode',
        value: function forEachChildNode(fn) {
            this.childNodes.forEach(function (childNode, index) {
                return fn(childNode, index);
            });
        }
    }, {
        key: 'isSubtreeIdenticalTo',
        value: function isSubtreeIdenticalTo(otherNode) {
            if (this.getNumberOfChildren() !== otherNode.getNumberOfChildren()) {
                return false;
            }
            for (var i = 0; i < this.getNumberOfChildren(); i++) {
                if (!this.getChildAtIndex(i).isIdenticalTo(otherNode.getChildAtIndex(i))) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Checks whether a node is identical to another node by comparing tag names, attribute names and values and subtree.
         */

    }, {
        key: 'isIdenticalTo',
        value: function isIdenticalTo(otherNode) {
            return (0, _get3.default)((0, _getPrototypeOf2.default)(ContainerNode.prototype), 'isIdenticalTo', this).call(this, otherNode) && this.isSubtreeIdenticalTo(otherNode);
        }
        /**
         * @override
         */

    }, {
        key: 'stringify',
        value: function stringify(params, nodeIndentDepth) {
            nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
            return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + '<' + this.tagName + this.stringifyAttributes(nodeIndentDepth) + '>' + this.stringifyAllChildNodes(params, nodeIndentDepth) + Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + '</' + this.tagName + '>' + params.newlineChar;
        }
    }, {
        key: 'stringifyAllChildNodes',
        value: function stringifyAllChildNodes(params, nodeIndentDepth) {
            var _this2 = this;

            var xml = params.newlineChar;
            this.forEachChildNode(function (childNode) {
                xml += _this2.stringifyChildNode(childNode, params, nodeIndentDepth + 1);
            });
            return xml;
        }
    }, {
        key: 'stringifyChildNode',
        value: function stringifyChildNode(childNode, params, nodeIndentDepth) {
            return childNode.stringify(params, nodeIndentDepth);
        }
    }]);
    return ContainerNode;
}(Node_1.Node);

exports.ContainerNode = ContainerNode;
},{"./Node":9,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/get":37,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],7:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node_1 = _dereq_('./Node');

var DeclarationOpenerNode = function (_Node_1$Node) {
    (0, _inherits3.default)(DeclarationOpenerNode, _Node_1$Node);

    function DeclarationOpenerNode() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, DeclarationOpenerNode);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(DeclarationOpenerNode)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.systemLiterals = [];
        _this.literalAndAttrOrder = [];
        return _this;
    }

    (0, _createClass3.default)(DeclarationOpenerNode, [{
        key: 'getNumberOfSystemLiterals',
        value: function getNumberOfSystemLiterals() {
            return this.systemLiterals.length;
        }
    }, {
        key: 'getIndexOfSystemLiteral',
        value: function getIndexOfSystemLiteral(literal) {
            return this.systemLiterals.indexOf(literal);
        }
    }, {
        key: 'getSystemLiteralAtIndex',
        value: function getSystemLiteralAtIndex(literalIndex) {
            return this.systemLiterals[literalIndex];
        }
    }, {
        key: 'getAllSystemLiterals',
        value: function getAllSystemLiterals() {
            return [].concat(this.systemLiterals);
        }
    }, {
        key: 'hasSystemLiteral',
        value: function hasSystemLiteral(literal) {
            return this.getIndexOfSystemLiteral(literal) !== -1;
        }
        /**
         * @chainable
         */

    }, {
        key: 'insertIntoSystemLiteralList',
        value: function insertIntoSystemLiteralList(literal, index) {
            this.appendSystemLiteralIndexToOrderList(index);
            this.systemLiterals.splice(index, 0, literal);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'prependToSystemLiteralList',
        value: function prependToSystemLiteralList(literal) {
            this.insertIntoSystemLiteralList(literal, 0);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'appendToSystemLiteralList',
        value: function appendToSystemLiteralList(literal) {
            this.insertIntoSystemLiteralList(literal, this.getNumberOfSystemLiterals());
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'removeSystemLiteralAtIndex',
        value: function removeSystemLiteralAtIndex(index) {
            this.removeSystemLiteralIndexFromOrderList(index);
            this.systemLiterals.splice(index, 1);
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'removeSystemLiteral',
        value: function removeSystemLiteral(literal) {
            var index = this.getIndexOfSystemLiteral(literal);
            while (index !== -1) {
                this.systemLiterals.splice(index, 1);
                index = this.getIndexOfSystemLiteral(literal);
            }
            return this;
        }
        /**
         * @chainable
         * @override
         */

    }, {
        key: 'setAttribute',
        value: function setAttribute(attrName, value, namespaceName) {
            this.appendAttributeToOrderList(Node_1.Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName));
            (0, _get3.default)((0, _getPrototypeOf2.default)(DeclarationOpenerNode.prototype), 'setAttribute', this).call(this, attrName, value, namespaceName);
            return this;
        }
        /**
         * @chainable
         * @override
         */

    }, {
        key: 'removeAttribute',
        value: function removeAttribute(attrName, namespaceName) {
            this.removeAttributeFromOrderList(Node_1.Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName));
            (0, _get3.default)((0, _getPrototypeOf2.default)(DeclarationOpenerNode.prototype), 'removeAttribute', this).call(this, attrName, namespaceName);
            return this;
        }
    }, {
        key: 'isSystemLiteralListIdenticalTo',
        value: function isSystemLiteralListIdenticalTo(otherNode) {
            if (this.systemLiterals.length !== otherNode.systemLiterals.length) {
                return false;
            }
            for (var i = 0; i < this.systemLiterals.length; i++) {
                if (this.systemLiterals[i] !== otherNode.systemLiterals[i]) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
         * @override
         */

    }, {
        key: 'isIdenticalTo',
        value: function isIdenticalTo(otherNode) {
            return (0, _get3.default)((0, _getPrototypeOf2.default)(DeclarationOpenerNode.prototype), 'isIdenticalTo', this).call(this, otherNode) && this.isSystemLiteralListIdenticalTo(otherNode);
        }
        /**
         * @override
         */

    }, {
        key: 'stringify',
        value: function stringify(params, nodeIndentDepth) {
            nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
            return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + '<!' + this.tagName + this.stringifyAttributesAndSystemLiterals(params, nodeIndentDepth) + '>' + params.newlineChar;
        }
    }, {
        key: 'stringifyAttributesAndSystemLiterals',
        value: function stringifyAttributesAndSystemLiterals(params, nodeIndentDepth) {
            var _this2 = this;

            return this.literalAndAttrOrder.map(function (attrNameOrLiteralIndex) {
                if (typeof attrNameOrLiteralIndex === 'string') {
                    return _this2.stringifyAttribute(attrNameOrLiteralIndex, _this2.getAttribute(attrNameOrLiteralIndex));
                } else {
                    return ' "' + _this2.getSystemLiteralAtIndex(attrNameOrLiteralIndex) + '"';
                }
            }).join('');
        }
    }, {
        key: 'appendSystemLiteralIndexToOrderList',
        value: function appendSystemLiteralIndexToOrderList(literalIndex) {
            this.removeSystemLiteralIndexFromOrderList(literalIndex);
            this.literalAndAttrOrder.push(literalIndex);
        }
    }, {
        key: 'removeSystemLiteralIndexFromOrderList',
        value: function removeSystemLiteralIndexFromOrderList(literalIndex) {
            var index = this.literalAndAttrOrder.indexOf(literalIndex);
            if (index !== -1) {
                this.literalAndAttrOrder.splice(index, 1);
            }
        }
    }, {
        key: 'appendAttributeToOrderList',
        value: function appendAttributeToOrderList(attrNameWithNamespace) {
            this.removeAttributeFromOrderList(attrNameWithNamespace);
            this.literalAndAttrOrder.push(attrNameWithNamespace);
        }
    }, {
        key: 'removeAttributeFromOrderList',
        value: function removeAttributeFromOrderList(attrNameWithNamespace) {
            var index = this.literalAndAttrOrder.indexOf(attrNameWithNamespace);
            if (index !== -1) {
                this.literalAndAttrOrder.splice(index, 1);
            }
        }
    }]);
    return DeclarationOpenerNode;
}(Node_1.Node);

exports.DeclarationOpenerNode = DeclarationOpenerNode;
},{"./Node":9,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/get":37,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],8:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContainerNode_1 = _dereq_('./ContainerNode');

var DocumentNode = function (_ContainerNode_1$Cont) {
    (0, _inherits3.default)(DocumentNode, _ContainerNode_1$Cont);

    function DocumentNode() {
        (0, _classCallCheck3.default)(this, DocumentNode);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DocumentNode).apply(this, arguments));
    }

    (0, _createClass3.default)(DocumentNode, [{
        key: 'stringify',

        /**
         * @override
         */
        value: function stringify(params, nodeIndentDepth) {
            nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
            return this.stringifyAllChildNodes(params, nodeIndentDepth);
        }
    }, {
        key: 'stringifyAllChildNodes',
        value: function stringifyAllChildNodes(params, nodeIndentDepth) {
            var _this2 = this;

            var xml = '';
            this.forEachChildNode(function (childNode) {
                xml += _this2.stringifyChildNode(childNode, params, nodeIndentDepth);
            });
            return xml;
        }
    }]);
    return DocumentNode;
}(ContainerNode_1.ContainerNode);

exports.DocumentNode = DocumentNode;
},{"./ContainerNode":6,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],9:[function(_dereq_,module,exports){
"use strict";

var _defineProperty = _dereq_('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = _dereq_('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeFlags_1 = _dereq_('../parser/NodeFlags');
/**
 * Base class for all nodes.
 */

var Node = function () {
    function Node() {
        (0, _classCallCheck3.default)(this, Node);

        this.parserFlags = NodeFlags_1.NodeFlags.None;
        this.attrList = {};
        this.applyAttributePropertyBindings();
    }
    /**
     * The default formatting options for stringification.
     */


    (0, _createClass3.default)(Node, [{
        key: 'getAllAttributeNames',
        value: function getAllAttributeNames() {
            return (0, _keys2.default)(this.attrList);
        }
    }, {
        key: 'getNumberOfAttributes',
        value: function getNumberOfAttributes() {
            return this.getAllAttributeNames().length;
        }
    }, {
        key: 'hasAttribute',
        value: function hasAttribute(attrName) {
            return this.getAllAttributeNames().indexOf(attrName) !== -1;
        }
    }, {
        key: 'getAttribute',
        value: function getAttribute(attrName, namespaceName) {
            if ((0, _typeof3.default)(this.attrList) !== 'object' || this.attrList === null) {
                return undefined;
            }
            attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
            return this.attrList[attrName];
        }
        /**
         * @chainable
         */

    }, {
        key: 'setAttribute',
        value: function setAttribute(attrName, value, namespaceName) {
            attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
            this.attrList = this.attrList || {};
            this.attrList[attrName] = value;
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'removeAttribute',
        value: function removeAttribute(attrName, namespaceName) {
            attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
            delete this.attrList[attrName];
            return this;
        }
    }, {
        key: 'toFormattedString',
        value: function toFormattedString(stringificationParams) {
            if ((typeof stringificationParams === 'undefined' ? 'undefined' : (0, _typeof3.default)(stringificationParams)) === 'object' && stringificationParams !== null) {
                stringificationParams = Node.mergeObjects(Node.defaultStringificationParams, stringificationParams);
            } else {
                stringificationParams = Node.defaultStringificationParams;
            }
            return this.stringify(stringificationParams);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.stringify({
                indentChar: '',
                newlineChar: '',
                attrParen: '"'
            });
        }
    }, {
        key: 'isTagNameAndNamespaceIdenticalTo',
        value: function isTagNameAndNamespaceIdenticalTo(otherNode) {
            return this.namespacePrefix === otherNode.namespacePrefix && this.tagName === otherNode.tagName;
        }
    }, {
        key: 'isAttributeListIdenticalTo',
        value: function isAttributeListIdenticalTo(otherNode) {
            var _this = this;

            if (this.getNumberOfAttributes() !== otherNode.getNumberOfAttributes()) {
                return false;
            }
            var indexOfFirstNonIdenticalAttributeName = this.getAllAttributeNames().findIndex(function (attrName) {
                return _this.getAttribute(attrName) !== otherNode.getAttribute(attrName);
            });
            return indexOfFirstNonIdenticalAttributeName === -1;
        }
        /**
         * Checks whether a node is identical to another node by comparing tag names, attribute names and values.
         */

    }, {
        key: 'isIdenticalTo',
        value: function isIdenticalTo(otherNode) {
            return this.constructor === otherNode.constructor && this.isTagNameAndNamespaceIdenticalTo(otherNode) && this.isAttributeListIdenticalTo(otherNode);
        }
        /**
         * Decorator.
         */

    }, {
        key: 'getBoundAttributeNameForProperty',
        value: function getBoundAttributeNameForProperty(propertyName) {
            if ((0, _typeof3.default)(this.attrPropertyBindings) !== 'object' || this.attrPropertyBindings === null) {
                return undefined;
            }
            return this.attrPropertyBindings[propertyName];
        }
    }, {
        key: 'getBoundPropertyNamesForAttribute',
        value: function getBoundPropertyNamesForAttribute(attributeName) {
            var propertyNames = [];
            if ((0, _typeof3.default)(this.attrPropertyBindings) !== 'object' || this.attrPropertyBindings === null) {
                return propertyNames;
            }
            for (var propertyName in this.attrPropertyBindings) {
                if (this.attrPropertyBindings[propertyName] === attributeName) {
                    propertyNames.push(propertyName);
                }
            }
            return propertyNames;
        }
    }, {
        key: 'stringify',
        value: function stringify(params, nodeIndentDepth) {
            nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
            return Node.generateIndentString(params.indentChar, nodeIndentDepth) + '<' + this.tagName + this.stringifyAttributes(nodeIndentDepth) + ' />' + params.newlineChar;
        }
    }, {
        key: 'stringifyAttributes',
        value: function stringifyAttributes(nodeIndentDepth) {
            var attrString = '';
            for (var attrName in this.attrList) {
                attrString += this.stringifyAttribute(attrName, this.attrList[attrName]);
            }
            return attrString;
        }
    }, {
        key: 'stringifyAttribute',
        value: function stringifyAttribute(attrName, attrValue) {
            if (typeof attrValue !== 'undefined') {
                return ' ' + attrName + '="' + attrValue + '"';
            } else {
                return ' ' + attrName;
            }
        }
    }, {
        key: 'addAttributeProxyProperty',
        value: function addAttributeProxyProperty(propertyName, attrName) {
            this.attrPropertyBindings = this.attrPropertyBindings || {};
            this.attrPropertyBindings[propertyName] = attrName;
        }
    }, {
        key: 'applyAttributePropertyBindings',
        value: function applyAttributePropertyBindings() {
            if ((0, _typeof3.default)(this.attrPropertyBindings) !== 'object' || this.attrPropertyBindings === null) {
                return;
            }
            for (var propertyName in this.attrPropertyBindings) {
                this.applyAttributePropertyBinding(propertyName, this.attrPropertyBindings[propertyName]);
            }
        }
    }, {
        key: 'applyAttributePropertyBinding',
        value: function applyAttributePropertyBinding(propertyName, attributeName) {
            var _this2 = this;

            var value = this[propertyName];
            (0, _defineProperty2.default)(this, propertyName, {
                get: function get() {
                    return _this2.getAttribute(attributeName);
                },
                set: function set(newValue) {
                    return _this2.setAttribute(attributeName, newValue);
                }
            });
            this.setAttribute(attributeName, value);
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return this._parentNode;
        }
    }], [{
        key: 'attributePropertyBinding',
        value: function attributePropertyBinding(attributeName) {
            return function (target, propertyName) {
                target.addAttributeProxyProperty(propertyName, attributeName);
            };
        }
    }, {
        key: 'joinAttributeNameWithNamespacePrefix',
        value: function joinAttributeNameWithNamespacePrefix(attrName, namespaceName) {
            if (typeof namespaceName !== 'undefined') {
                attrName = namespaceName + ':' + attrName;
            }
            return attrName;
        }
    }, {
        key: 'changeParentNode',
        value: function changeParentNode(childNode, newParentNode) {
            childNode._parentNode = newParentNode;
        }
    }, {
        key: 'removeParentNode',
        value: function removeParentNode(childNode) {
            childNode._parentNode = undefined;
        }
    }, {
        key: 'generateIndentString',
        value: function generateIndentString(indentChar, indentDepth) {
            indentDepth = Math.max(indentDepth || 0, 0);
            if (indentDepth === 0) {
                return '';
            }
            var indentString = '';
            while (indentDepth-- > 0) {
                indentString += indentChar;
            }
            return indentString;
        }
    }, {
        key: 'mergeObjects',
        value: function mergeObjects(baseObject, overlayObject) {
            for (var key in overlayObject) {
                baseObject[key] = overlayObject[key];
            }
            return baseObject;
        }
    }, {
        key: 'defaultStringificationParams',
        get: function get() {
            return {
                attrParen: '"',
                indentChar: '\t',
                newlineChar: '\n'
            };
        }
    }]);
    return Node;
}();

exports.Node = Node;
},{"../parser/NodeFlags":16,"babel-runtime/core-js/object/define-property":27,"babel-runtime/core-js/object/keys":30,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/typeof":41}],10:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node_1 = _dereq_('./Node');

var ProcessingInstructionNode = function (_Node_1$Node) {
    (0, _inherits3.default)(ProcessingInstructionNode, _Node_1$Node);

    function ProcessingInstructionNode() {
        (0, _classCallCheck3.default)(this, ProcessingInstructionNode);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProcessingInstructionNode).apply(this, arguments));
    }

    (0, _createClass3.default)(ProcessingInstructionNode, [{
        key: "stringify",

        /**
         * @override
         */
        value: function stringify(params, nodeIndentDepth) {
            nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
            return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + "<?" + this.tagName + this.stringifyAttributes(nodeIndentDepth) + "?>" + params.newlineChar;
        }
    }]);
    return ProcessingInstructionNode;
}(Node_1.Node);

exports.ProcessingInstructionNode = ProcessingInstructionNode;
},{"./Node":9,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],11:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = _dereq_("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node_1 = _dereq_('./Node');

var SelfClosingNode = function (_Node_1$Node) {
  (0, _inherits3.default)(SelfClosingNode, _Node_1$Node);

  function SelfClosingNode() {
    (0, _classCallCheck3.default)(this, SelfClosingNode);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SelfClosingNode).apply(this, arguments));
  }

  return SelfClosingNode;
}(Node_1.Node);

exports.SelfClosingNode = SelfClosingNode;
},{"./Node":9,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],12:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node_1 = _dereq_('./Node');
/**
 * Base class for all nodes that may contain child elements.
 */

var TextNode = function (_Node_1$Node) {
    (0, _inherits3.default)(TextNode, _Node_1$Node);

    function TextNode() {
        (0, _classCallCheck3.default)(this, TextNode);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TextNode).apply(this, arguments));
    }

    (0, _createClass3.default)(TextNode, [{
        key: 'getContentLines',
        value: function getContentLines() {
            if (typeof this.content !== 'string' || this.content.length < 1) {
                return [];
            }
            return this.content.trim().split(/\r?\n/);
        }
        /**
         * Returns whether the text content contains line breaks.
         */

    }, {
        key: 'isContentMultiLine',
        value: function isContentMultiLine() {
            return (/\r?\n/.test(this.content.trim())
            );
        }
    }, {
        key: 'isContentIdenticalTo',
        value: function isContentIdenticalTo(otherNode) {
            return TextNode.makeContentStringComparable(this.content || '') === TextNode.makeContentStringComparable(otherNode.content || '');
        }
        /**
         * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
         */

    }, {
        key: 'isIdenticalTo',
        value: function isIdenticalTo(otherNode) {
            return (0, _get3.default)((0, _getPrototypeOf2.default)(TextNode.prototype), 'isIdenticalTo', this).call(this, otherNode) && this.isContentIdenticalTo(otherNode);
        }
    }, {
        key: 'stringify',
        value: function stringify(params, nodeIndentDepth) {
            return this.stringifyContent(params, nodeIndentDepth);
        }
    }, {
        key: 'stringifyContent',
        value: function stringifyContent(params, nodeIndentDepth) {
            if (this.isContentMultiLine()) {
                return this.stringifyMultiLineContent(params, nodeIndentDepth);
            } else {
                return this.stringifySingleLineContent(params, nodeIndentDepth);
            }
        }
    }, {
        key: 'stringifyMultiLineContent',
        value: function stringifyMultiLineContent(params, nodeIndentDepth) {
            var stringifiedContent = '',
                newlineChar = params.newlineChar;
            if (!/\n/.test(params.newlineChar)) {
                newlineChar = ' ';
            }
            stringifiedContent += this.getContentLines().map(function (contentLine) {
                return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + contentLine.trim();
            }).join(newlineChar);
            if (/\n/.test(params.newlineChar)) {
                return stringifiedContent + params.newlineChar;
            }
            return stringifiedContent;
        }
    }, {
        key: 'stringifySingleLineContent',
        value: function stringifySingleLineContent(params, nodeIndentDepth) {
            var formattedContent = (this.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim();
            if (/\n/.test(params.newlineChar)) {
                return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + formattedContent + '\n';
            } else {
                return formattedContent;
            }
        }
    }], [{
        key: 'makeContentStringComparable',
        value: function makeContentStringComparable(contentString) {
            return contentString.trim().replace(/[\t\r\n ]+/g, '').replace(/ +/g, ' ');
        }
    }]);
    return TextNode;
}(Node_1.Node);

exports.TextNode = TextNode;
},{"./Node":9,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/get":37,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],13:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node_1 = _dereq_('./Node');

var VoidNode = function (_Node_1$Node) {
    (0, _inherits3.default)(VoidNode, _Node_1$Node);

    function VoidNode() {
        (0, _classCallCheck3.default)(this, VoidNode);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(VoidNode).apply(this, arguments));
    }

    (0, _createClass3.default)(VoidNode, [{
        key: "stringify",

        /**
         * @override
         */
        value: function stringify(params, nodeIndentDepth) {
            nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
            return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + "<" + this.tagName + this.stringifyAttributes(nodeIndentDepth) + ">" + params.newlineChar;
        }
    }]);
    return VoidNode;
}(Node_1.Node);

exports.VoidNode = VoidNode;
},{"./Node":9,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],14:[function(_dereq_,module,exports){
"use strict";

var ast = _dereq_('./ast');
exports.ast = ast;
var parser = _dereq_('./parser');
exports.parser = parser;
var SyntaxErrorCode_1 = _dereq_('./parser/SyntaxErrorCode');
exports.SyntaxErrorCode = SyntaxErrorCode_1.SyntaxErrorCode;
var SyntaxError_1 = _dereq_('./parser/SyntaxError');
exports.SyntaxError = SyntaxError_1.SyntaxError;
var Parser_1 = _dereq_('./parser/Parser');
exports.Parser = Parser_1.Parser;
var Compiler_1 = _dereq_('./Compiler');
exports.Compiler = Compiler_1.Compiler;
},{"./Compiler":1,"./ast":2,"./parser":15,"./parser/Parser":17,"./parser/SyntaxError":18,"./parser/SyntaxErrorCode":19}],15:[function(_dereq_,module,exports){
"use strict";

var SyntaxErrorCode_1 = _dereq_('./parser/SyntaxErrorCode');
exports.SyntaxErrorCode = SyntaxErrorCode_1.SyntaxErrorCode;
var SyntaxError_1 = _dereq_('./parser/SyntaxError');
exports.SyntaxError = SyntaxError_1.SyntaxError;
var TagCloseMode_1 = _dereq_('./parser/TagCloseMode');
exports.TagCloseMode = TagCloseMode_1.TagCloseMode;
var TagSyntaxRule_1 = _dereq_('./parser/TagSyntaxRule');
exports.TagSyntaxRule = TagSyntaxRule_1.TagSyntaxRule;
var SyntaxRuleSet_1 = _dereq_('./parser/SyntaxRuleSet');
exports.SyntaxRuleSet = SyntaxRuleSet_1.SyntaxRuleSet;
var NodeFlags_1 = _dereq_('./parser/NodeFlags');
exports.NodeFlags = NodeFlags_1.NodeFlags;
var Parser_1 = _dereq_('./parser/Parser');
exports.Parser = Parser_1.Parser;
var ruleSet = _dereq_('./parser/ruleSet');
exports.ruleSet = ruleSet;
},{"./parser/NodeFlags":16,"./parser/Parser":17,"./parser/SyntaxError":18,"./parser/SyntaxErrorCode":19,"./parser/SyntaxRuleSet":20,"./parser/TagCloseMode":21,"./parser/TagSyntaxRule":22,"./parser/ruleSet":23}],16:[function(_dereq_,module,exports){
"use strict";
/**
 * Flags applied to nodes during parsing.
 * Bitmask.
 */

(function (NodeFlags) {
    NodeFlags[NodeFlags["None"] = 0] = "None";
    NodeFlags[NodeFlags["Opened"] = 1] = "Opened";
    NodeFlags[NodeFlags["Closed"] = 2] = "Closed";
    NodeFlags[NodeFlags["SelfClosing"] = 7] = "SelfClosing";
    NodeFlags[NodeFlags["Void"] = 15] = "Void";
})(exports.NodeFlags || (exports.NodeFlags = {}));
var NodeFlags = exports.NodeFlags;
},{}],17:[function(_dereq_,module,exports){
"use strict";

var _regenerator = _dereq_('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = _dereq_('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var ast = _dereq_('../ast');
var Node_1 = _dereq_('../ast/Node');
var SelfClosingNode_1 = _dereq_('../ast/SelfClosingNode');
var DocumentNode_1 = _dereq_('../ast/DocumentNode');
var ContainerNode_1 = _dereq_('../ast/ContainerNode');
var VoidNode_1 = _dereq_('../ast/VoidNode');
var SyntaxErrorCode_1 = _dereq_('./SyntaxErrorCode');
var SyntaxError_1 = _dereq_('./SyntaxError');
var TagCloseMode_1 = _dereq_('./TagCloseMode');
var TagSyntaxRule_1 = _dereq_('./TagSyntaxRule');
var SyntaxRuleSet_1 = _dereq_('./SyntaxRuleSet');
var NodeFlags_1 = _dereq_('./NodeFlags');
/**
 * Parsers create a syntax tree from an XML string.
 * PARSER INTERNALS:
 * Parsers see every character in an XML string as a "token". This means that there is no tokenization stage, but rather just a quick (and lazy) mapping of characters to their line and column number. Even without tokenization, XML is fairly simple to parse due to its non-complex syntax. The absence of a tokenization stage means there are less dependencies, less coupling is necessary, which leads to lower maintenance time. Also, we're saving a few CPU cycles and some memory, although performance is not the primary factor for the decision against a dedicated tokenizer.
 * The public interface provided by the parser class encourages the use of static methods, such as `parseStringToAst(...)`, instead of manually creating and handling parser objects (at least for now). Also, these static methods enforce user code to await promises, even though parser code is not **yet** async, but it might become async when (and if) incremental parsing and streams are implemented (incremental parsing might use generators and allow async user code to interfere with the parser).
 * SYNTAX RULES:
 * Parsers can accept some syntax rules, however by default they expect XML (no void tags, unclosed tags are handled as if they were). To override default parsing rules, use the `addTagSyntaxRule(...)` (and similar) methods.
 */

var Parser = function () {
    /**
     * Creates a new parser object. Use the static methods `create*()` or `parse*()` instead of instantiating manually.
     * @param stringToParse The XML string to be parsed.
     */

    function Parser(stringToParse) {
        (0, _classCallCheck3.default)(this, Parser);

        this.stringToParse = stringToParse;
        this.defaultTagSyntaxRule = Parser.createDefaultTagSyntaxRule();
        this.tagSyntaxRules = {};
        this.ast = new DocumentNode_1.DocumentNode();
        this.currentContainerNode = this.getAst();
        this.currentTokenIndex = 0;
    }
    /**
     * Creates a parser object, but does not begin parsing.
     * @param stringToParse The XML string to be parsed.
     */


    (0, _createClass3.default)(Parser, [{
        key: 'getDefaultTagSyntaxRule',

        ///
        /// CONFIGURATION METHODS:
        ///
        value: function getDefaultTagSyntaxRule() {
            return this.defaultTagSyntaxRule;
        }
        /**
         * @chainable
         */

    }, {
        key: 'setDefaultTagSyntaxRule',
        value: function setDefaultTagSyntaxRule(rule) {
            this.defaultTagSyntaxRule = rule;
        }
    }, {
        key: 'getTagSyntaxRuleForTagName',
        value: function getTagSyntaxRuleForTagName(tagName) {
            return this.tagSyntaxRules[tagName] || undefined;
        }
    }, {
        key: 'hasTagSyntaxRuleForTagName',
        value: function hasTagSyntaxRuleForTagName(tagName) {
            var rule = this.getTagSyntaxRuleForTagName(tagName);
            return (typeof rule === 'undefined' ? 'undefined' : (0, _typeof3.default)(rule)) === 'object' && rule !== null;
        }
        /**
         * @chainable
         */

    }, {
        key: 'addTagSyntaxRule',
        value: function addTagSyntaxRule(rule) {
            var _this = this;

            rule.getTagNames().forEach(function (tagName) {
                _this.tagSyntaxRules[tagName] = rule;
            });
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'addTagSyntaxRules',
        value: function addTagSyntaxRules() {
            var _this2 = this;

            for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
                rules[_key] = arguments[_key];
            }

            rules.forEach(function (rule) {
                return _this2.addTagSyntaxRule(rule);
            });
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'removeTagSyntaxRuleForTagName',
        value: function removeTagSyntaxRuleForTagName(tagName) {
            this.tagSyntaxRules[tagName] = undefined;
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: 'removeTagSyntaxRulesForTagNames',
        value: function removeTagSyntaxRulesForTagNames(tagNames) {
            var _this3 = this;

            tagNames.forEach(function (tagName) {
                return _this3.removeTagSyntaxRuleForTagName(tagName);
            });
            return this;
        }
        /**
         * Applies all rules defined by a syntax rule set to the parser.
         * @chainable
         * @param ruleSet The syntax rule set to apply.
         */

    }, {
        key: 'applySyntaxRuleSet',
        value: function applySyntaxRuleSet(ruleSet) {
            if (SyntaxRuleSet_1.SyntaxRuleSet.isSyntaxRuleSetClass(ruleSet)) {
                ruleSet = ruleSet.createInstance();
            }
            this.addTagSyntaxRules.apply(this, (0, _toConsumableArray3.default)(ruleSet.getAllTagSyntaxRules()));
            return this;
        }
        ///
        /// PUBLIC GETTERS & REQUESTS:
        ///
        /**
         * Returns the syntax tree object the parser creates.
         */

    }, {
        key: 'getAst',
        value: function getAst() {
            return this.ast;
        }
        /**
         * Parses the complete XML string passed to a parser instance.
         */

    }, {
        key: 'parseComplete',
        value: function parseComplete() {
            // don't do anything if the source string is empty
            if (this.stringToParse.length < 1) {
                return;
            }
            while (!this.isAtEndOfInput()) {
                this.parseFromCurrentToken();
            }
        }
        ///
        /// INTERNAL GETTERS & REQUESTS:
        ///
        /**
         * Returns the line the parser's cursor is currently on.
         */

    }, {
        key: 'getCurrentLine',
        value: function getCurrentLine() {
            var tokenMatrix = this.getTokenMatrix();
            if (tokenMatrix[this.getCurrentTokenIndex()]) {
                return tokenMatrix[this.getCurrentTokenIndex()].line;
            } else if (this.getCurrentTokenIndex() === 0) {
                return 1;
            } else {
                return undefined;
            }
        }
        /**
         * Returns the column the parser's cursor is currently at.
         */

    }, {
        key: 'getCurrentColumn',
        value: function getCurrentColumn() {
            var tokenMatrix = this.getTokenMatrix();
            if (tokenMatrix[this.getCurrentTokenIndex()]) {
                return tokenMatrix[this.getCurrentTokenIndex()].column;
            } else if (this.getCurrentTokenIndex() === 0) {
                return 1;
            } else {
                return undefined;
            }
        }
        /**
         * Returns the index of the current token in the XML source string.
         */

    }, {
        key: 'getCurrentTokenIndex',
        value: function getCurrentTokenIndex() {
            return this.currentTokenIndex;
        }
        /**
         * Returns whether the parser's cursor has reached the end of the XML source string.
         */

    }, {
        key: 'isAtEndOfInput',
        value: function isAtEndOfInput() {
            return this.getCurrentTokenIndex() >= this.stringToParse.length;
        }
        /**
         * Returns the token at a certain index in the XML source string.
         */

    }, {
        key: 'getTokenAtIndex',
        value: function getTokenAtIndex(index) {
            return this.stringToParse[index];
        }
        /**
         * Return the token at the current cursor index.
         */

    }, {
        key: 'getCurrentToken',
        value: function getCurrentToken() {
            return this.getTokenAtIndex(this.getCurrentTokenIndex());
        }
        /**
         * Returns a range of tokens from the source XML string.
         * @param startIndex The index of the first token in the requested range.
         * @param endIndex The index of the last token in the requested range (inclusive).
         */

    }, {
        key: 'getTokenRange',
        value: function getTokenRange(startIndex, endIndex) {
            /// TODO: Prevent this from returning ranges that go "beyond" the end of the source string.
            return this.stringToParse.slice(startIndex, endIndex);
        }
        /**
         * Returns a range of tokens from the source XML string.
         * @param startIndex The index of the first token in the requested range.
         * @param length The length of the range to be returned.
         */

    }, {
        key: 'getTokenRangeStartingAt',
        value: function getTokenRangeStartingAt(startIndex, length) {
            return this.stringToParse.slice(startIndex, startIndex + length);
        }
        /**
         * Returns the token that follows the token the cursor is currently at.
         */

    }, {
        key: 'getNextToken',
        value: function getNextToken() {
            return this.getTokenAtIndex(this.getCurrentTokenIndex() + 1);
        }
        /**
         * Returns the token that preceeds the token the cursor is currently at.
         */

    }, {
        key: 'getPreviousToken',
        value: function getPreviousToken() {
            return this.getTokenAtIndex(this.getCurrentTokenIndex() - 1);
        }
        /**
         * Finds the first occurence of a certain token after in the source XML string after a certain token index and returns the index of the searched token.
         * @param token The token to find.
         * @param startIndex The index at which to start searching.
         */

    }, {
        key: 'findFirstOccurenceOfTokenAfterIndex',
        value: function findFirstOccurenceOfTokenAfterIndex(token, startIndex) {
            return this.stringToParse.indexOf(token[0], startIndex);
        }
        /**
         * Checks if a certain token occurs before the next occurence of another token.
         * @param token The token to check if it occurs before `otherToken`.
         * @param otherToken The token before which `token` must occur for this method to return `true`.
         * @param startIndex The index at which to start searching for `token` and `otherToken`.
         */

    }, {
        key: 'doesTokenOccurBeforeNextOccurenceOfOtherToken',
        value: function doesTokenOccurBeforeNextOccurenceOfOtherToken(token, otherToken, startIndex) {
            var tokenIndex = this.findFirstOccurenceOfTokenAfterIndex(token, startIndex),
                otherTokenIndex = this.findFirstOccurenceOfTokenAfterIndex(otherToken, startIndex);
            if (tokenIndex < 0 || otherTokenIndex < 0) {
                return false;
            }
            return tokenIndex < otherTokenIndex;
        }
        /**
         * Returns the container ast node the parser is currently parsing into, depending on the semantic context around the cursor. At the start and end of each parsing run, this will return the outermost `DocumentNode` of the syntax tree.
         */

    }, {
        key: 'getCurrentContainerNode',
        value: function getCurrentContainerNode() {
            return this.currentContainerNode;
        }
    }, {
        key: 'descendInto',
        value: function descendInto(containerNode) {
            this.currentContainerNode = containerNode;
        }
    }, {
        key: 'ascend',
        value: function ascend() {
            if (!(this.currentContainerNode.parentNode instanceof ContainerNode_1.ContainerNode)) {
                this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.Unknown, 'can not ascend: current containing node has no parent node'));
            }
            this.currentContainerNode = this.currentContainerNode.parentNode;
        }
        ///
        /// SYNTAX ERROR HANDLING & FACTORY METHODS:
        /// The following methods help creating and raising syntax errors.
        ///

    }, {
        key: 'createSyntaxError',
        value: function createSyntaxError(errorCode, line, column, message) {
            return new SyntaxError_1.SyntaxError(errorCode, line, column, this.stringToParse, message);
        }
    }, {
        key: 'createSyntaxErrorAtCurrentToken',
        value: function createSyntaxErrorAtCurrentToken(errorCode, message) {
            return this.createSyntaxError(errorCode, this.getCurrentLine(), this.getCurrentColumn(), message);
        }
    }, {
        key: 'createUnexpectedTokenSyntaxErrorAtCurrentToken',
        value: function createUnexpectedTokenSyntaxErrorAtCurrentToken(message) {
            message = message || 'token can not be parsed';
            return this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.UnexpectedToken, message);
        }
        /**
         * Raises an error. Use this method instead of throwing manually so errors can be logged or modified by the parser before it is thrown.
         * @throws
         * @param error The error to raise.
         */

    }, {
        key: 'raiseError',
        value: function raiseError(error) {
            throw error;
        }
        ///
        /// SYNTAX RULE LOOKUPS:
        ///

    }, {
        key: 'getOverrideOrDefaultTagSyntaxRuleForTagName',
        value: function getOverrideOrDefaultTagSyntaxRuleForTagName(tagName) {
            return this.getTagSyntaxRuleForTagName(tagName) || this.getDefaultTagSyntaxRule();
        }
        /**
         * Returns all tag close modes allowed for a certain tag name. The returned modes are either defined by tag syntax rules or fall back to the default if no syntax rule for the given tag name exists.
         */

    }, {
        key: 'getAllowedTagCloseModesForTagName',
        value: function getAllowedTagCloseModesForTagName(tagName) {
            return this.getOverrideOrDefaultTagSyntaxRuleForTagName(tagName).getCloseMode();
        }
    }, {
        key: 'isCloseModeAllowedForTagName',
        value: function isCloseModeAllowedForTagName(tagName, closeMode) {
            if (!Parser.isSingularCloseMode(closeMode)) {
                throw new Error('Rule lookup failed: tag close mode must not be a combination of close modes.');
            }
            return (this.getAllowedTagCloseModesForTagName(tagName) & closeMode) === closeMode;
        }
        ///
        /// TOKEN IDENTIFICATION & CLASSIFICATION UTILITIES:
        /// Methods that help identifying certain tokens.
        ///

    }, {
        key: 'moveByNumberOfTokens',

        ///
        /// TOKEN ITERATION METHODS:
        /// These methods handle the iteration over the XML string that is being parsed. Only use
        /// the methods provided here to iterate over, move along, look at (back or ahead) the XML
        /// string, don't do this manually.
        ///
        value: function moveByNumberOfTokens(numberOfTokens) {
            this.currentTokenIndex += numberOfTokens;
        }
    }, {
        key: 'goBackByNumberOfTokens',
        value: function goBackByNumberOfTokens(numberOfTokens) {
            this.moveByNumberOfTokens(0 - Math.abs(numberOfTokens));
        }
    }, {
        key: 'goBackToPreviousToken',
        value: function goBackToPreviousToken() {
            this.goBackByNumberOfTokens(1);
        }
    }, {
        key: 'advanceByNumberOfTokens',
        value: function advanceByNumberOfTokens(numberOfTokens) {
            this.moveByNumberOfTokens(Math.abs(numberOfTokens));
        }
    }, {
        key: 'advanceToNextToken',
        value: function advanceToNextToken() {
            this.advanceByNumberOfTokens(1);
        }
        ///
        /// PARSING METHODS:
        /// All methods that actually parse XML into AST nodes.
        ///

    }, {
        key: 'parseFromCurrentToken',
        value: function parseFromCurrentToken() {
            if (this.isAtEndOfInput()) {
                return;
            }
            switch (true) {
                default:
                    this.parseIntoNewTextNode();
                    break;
                case typeof this.getCurrentToken() !== 'string':
                case Parser.isWhitespaceToken(this.getCurrentToken()) || this.getCurrentToken() === '\r' || this.getCurrentToken() === '\n':
                    this.advanceToNextToken();
                    break;
                case this.getCurrentToken() === '<':
                    this.parseFromOpenAngleBracket();
                    break;
            }
        }
        /**
         * Called when the parser is at an open angle bracket (`<`) and needs to decide how to parse upcoming tokens. This method looks ahead to decide
         * whether the open angle bracket is the beginning of an XML tag, or if it's the beginning of text node content, so either:
         *     <foo...
         *     ^       here
         * or:
         *     <foo><</foo>
         *          ^ here
         *
         * Keep in mind that this method must *only* be called in these two cases, all other possible occurences of open angle brackets are handled in
         * more specific methods (namely when parsing CDATA or comments), which are not ambiguous (comments and CDATA nodes have delimiters that clearly
         * indicate where their content begins and ends, text nodes do not have this).
         * The same goes for attributes: An open angle bracket in a properly quoted attribute string is always going to be parsed as an attribute value.
         * An open angle bracket in an attribute value *that is not enclosed by quotes* is always a syntax error:
         *     <foo bar="1<2" />
         *                ^       OK, but does not concern this method
         *     <foo bar=1<2 />
         *               ^        NOT OK, always a syntax error. Also doesn't concern this method.
         */

    }, {
        key: 'parseFromOpenAngleBracket',
        value: function parseFromOpenAngleBracket() {
            // If:
            //     the next token does not indicate a CDATA node, comment, PI or MDO
            //   and:
            //     there's another open angle bracket before the next occurence of a closing angle bracket
            // assume that the current open angle bracket is text node content. In all other cases, assume that the current open angle bracket indicates
            // the bginning of a new tag.
            if (this.getNextToken() !== '!' && this.getNextToken() !== '?' && this.doesTokenOccurBeforeNextOccurenceOfOtherToken('<', '>', this.getCurrentTokenIndex() + 1)) {
                this.parseIntoNewTextNode();
            } else {
                this.parseFromBeginningOfTag();
            }
        }
        /**
         * Creates a new text node, appends it to the ast and parses all upcoming text into it. Stops parsing at the first character that can not be
         * considered text anymore.
         */

    }, {
        key: 'parseIntoNewTextNode',
        value: function parseIntoNewTextNode() {
            var textNode = new ast.TextNode();
            textNode.content = '';
            this.getCurrentContainerNode().appendChild(textNode);
            // skip all whitespace
            while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                this.advanceToNextToken();
            }
            while (!this.isAtEndOfInput()) {
                // If the current token is an open angle bracket ('<'), we could have the following two situations:
                //     <a>123</a>
                //           ^
                // or:
                //     <a>123<456</a>
                //           ^
                // To distinguish between these situations, we have to check whether another open angle bracket appears
                // before the next closing bracket:
                //     <a>123</a>
                //           ^  |
                //              ^ — There's no other open angle bracket before the closing one, hence
                //                  the open angle bracket opens the closing tag.
                // or:
                //     <a>123<123</a>
                //           ^   |
                //               ^ — There is indeed another open angle bracket before the closing one,
                //                   hence the open angle bracket we're at right now does *not* open the
                //                   closing tag.
                if (this.getCurrentToken() === '<' && !this.doesTokenOccurBeforeNextOccurenceOfOtherToken('<', '>', this.getCurrentTokenIndex() + 1)) {
                    // we're at the start of the closing tag, so don't collect any further text content
                    break;
                }
                textNode.content += this.getCurrentToken();
                this.advanceToNextToken();
            }
        }
        /**
         * Parses from the beginning of any kind of tag. The cursor is expected to point at the open angle bracket of the tag, such as:
         *     <xsl:stylesheet ...
         *     ^
         * Comments and CDATA sections are also supported by this method. Depending on the kind of tag (MDO, PI, normal, etc), this method will delegate parsing the tag to other more specific methods.
         */

    }, {
        key: 'parseFromBeginningOfTag',
        value: function parseFromBeginningOfTag() {
            // Find out if we're dealing with a "normal" node here or with a MDO (markup declaration opener), PI (processing instruction) or comment.
            // We will not know whether the node is self closing, or if it has child nodes or text content, but
            // we know just enough to delegate the node to a more dedicated parsing method depending on what the
            // node actually is.
            switch (true) {
                default:
                    this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected exclamation mark, question mark or alphabetic tag name'));
                    break;
                // The node is a normal tag if it starts with an alphabetic token, such as:
                //     <foo ...
                //      ^
                // or:
                //     <a alpha="1" />
                //      ^
                case Parser.isTokenLegalInTagNameOrTagNameNamespacePrefix(this.getNextToken()):
                    this.parseFromBeginningOfNormalNode();
                    break;
                // The node is a close tag if it starts with an open angle bracket followed by a slash, such as:
                //     </foo>
                //     ^^
                // or:
                //     </ foo>
                //     ^^
                case this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 2) === '</':
                    this.parseFromBeginningOfCloseTag();
                    break;
                // If the node's tag name starts with an exclamation mark, the node is either a, CDATA section, MDO or a comment:
                //     <![CDATA[ ...
                //      ^
                // or:
                //     <!DOCTYPE ...
                //      ^
                // or:
                //     <!-- ...
                //      ^
                case this.getNextToken() === '!':
                    // Look ahead at the next character(s) to decide whether the node is a CDATA section, MDO or a comment.
                    switch (true) {
                        default:
                            this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected declaration opener or comment node'));
                            break;
                        // There's a CDATA opener coming up
                        //     <![CDATA[ ...
                        //       ^^^^^^^
                        case this.getTokenRangeStartingAt(this.getCurrentTokenIndex() + 2, 7) === '[CDATA[':
                            this.parseFromBeginningOfCDataSectionNode();
                            break;
                        // There's an alphabetic token following the exclamation mark, so it's an MDO node:
                        //     <!DOCTYPE ...
                        //       ^
                        case Parser.isAlphabeticToken(this.getTokenAtIndex(this.getCurrentTokenIndex() + 2)):
                            this.parseFromBeginningOfDeclarationOpenerNode();
                            break;
                        // If there's a double hyphen following the exclamation mark, it's always a comment:
                        //     <!-- ...
                        //       ^^
                        case this.getTokenRangeStartingAt(this.getCurrentTokenIndex() + 2, 2) === '--':
                            this.parseFromBeginningOfCommentNode();
                            break;
                    }
                    break;
                // If the node's tag name starts with a question mark, the node is a PI:
                //     <?svg ...
                //      ^
                case this.getNextToken() === '?':
                    this.parseFromBeginningOfProcessingInstructionNode();
                    break;
            }
        }
    }, {
        key: 'parseFromBeginningOfNormalNode',
        value: function parseFromBeginningOfNormalNode() {
            // Validate that we actually have a "normal" node:
            if (!Parser.isTokenLegalInTagNameOrTagNameNamespacePrefix(this.getNextToken())) {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected beginning of tag name, got \'' + this.getNextToken() + '\''));
            }
            // we assume all "normal" nodes to be self closing until proven they're not:
            var node = new SelfClosingNode_1.SelfClosingNode();
            this.getCurrentContainerNode().appendChild(node);
            // Skip over the node opener:
            //     <alpha ...
            //     ^      we're here
            this.advanceToNextToken();
            // check for illegal characters at the beginning of the tag name
            if (this.getCurrentToken() === '.') {
                this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.InvalidTagName, 'expected beginning of tag name, got \'' + this.getCurrentToken() + '\''));
            }
            //     <alpha
            //      ^      we're here
            this.parseCompleteOpeningTagInto(node, true, false);
            return;
        }
    }, {
        key: 'findUnclosedNodeMatchingTagName',
        value: function findUnclosedNodeMatchingTagName(tagNameInfo) {
            var containerNode = this.getCurrentContainerNode();
            do {
                if (containerNode.parserFlags & NodeFlags_1.NodeFlags.Closed || containerNode.namespacePrefix !== tagNameInfo.namespacePrefix || containerNode.tagName !== tagNameInfo.tagName) {
                    continue;
                }
                return containerNode;
            } while ((containerNode = containerNode.parentNode) && containerNode.parentNode instanceof Node_1.Node);
        }
    }, {
        key: 'parseFromBeginningOfCloseTag',
        value: function parseFromBeginningOfCloseTag() {
            // Validate that we actually have a close tag:
            if (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 2) !== '</') {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected beginning of close tag (</...), got \'' + this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 2) + '\''));
            }
            // Skip over the tag opener:
            //     </alpha ...
            //     ^      we're here
            this.advanceByNumberOfTokens(2);
            //     </alpha
            //       ^      we're here
            // we now parse the tag name and check if there are any unclosed container nodes with the exact same tag name
            var tagNameInfo = this.parseTagName(),
                closedNode = this.findUnclosedNodeMatchingTagName(tagNameInfo);
            if (!(closedNode instanceof ContainerNode_1.ContainerNode)) {
                this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.ExcessCloseTag, 'close tag \'' + tagNameInfo.tagName + '\' has no open tag'));
            }
            if (this.getCurrentToken() !== '>') {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected end of close tag, got \'' + this.getCurrentToken() + '\''));
            }
            this.advanceToNextToken();
            this.ascend();
            return;
        }
    }, {
        key: 'parseFromBeginningOfDeclarationOpenerNode',
        value: function parseFromBeginningOfDeclarationOpenerNode() {
            // Validate that we actually have an MDO node:
            if (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 2) !== '<!') {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected beginning of declaration opener (<!)'));
            }
            // We know this is actually an MDO node, so create the tree member and append it
            var mdoNode = new ast.DeclarationOpenerNode();
            this.getCurrentContainerNode().appendChild(mdoNode);
            // Skip over the MDO opener:
            //     <!DOCTYPE ...
            //     ^      we're here
            this.advanceByNumberOfTokens(2);
            //     <!DOCTYPE
            //       ^      we're here
            this.parseCompleteOpeningTagInto(mdoNode, false, true);
            return;
        }
    }, {
        key: 'parseFromBeginningOfProcessingInstructionNode',
        value: function parseFromBeginningOfProcessingInstructionNode() {
            // Validate that we actually have a PI node:
            if (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 2) !== '<?') {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected beginning of processing instruction (<?)'));
            }
            // We know this is actually a PI node, so create the tree member and append it
            var piNode = new ast.ProcessingInstructionNode();
            this.getCurrentContainerNode().appendChild(piNode);
            // Skip over the PI opener:
            //     <?svg ...
            //     ^      we're here
            this.advanceByNumberOfTokens(2);
            //     <?svg
            //       ^      we're here
            this.parseCompleteOpeningTagInto(piNode, false, false);
            return;
        }
        /**
         * Parses a CDATA section.
         * @see https://www.w3.org/TR/xml/#sec-cdata-sect
         */

    }, {
        key: 'parseFromBeginningOfCDataSectionNode',
        value: function parseFromBeginningOfCDataSectionNode() {
            // Validate that we actually have a CDATA section node:
            if (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 9) !== '<![CDATA[') {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected beginning of CDATA section (<![CDATA[)'));
            }
            // We know this is actually a CDATA section node, so create the tree member and append to its content as long as it isn't closed by ']]>'.
            var cdataNode = new ast.CDataSectionNode();
            this.getCurrentContainerNode().appendChild(cdataNode);
            // Skip over the CDATA opener:
            //     <![CDATA[
            //     ^      we're here
            this.advanceByNumberOfTokens(9);
            //     <![CDATA[
            //             ^      we're here
            // Start appending to the content:
            cdataNode.content = '';
            while (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 3) !== ']]>') {
                cdataNode.content += this.getCurrentToken();
                this.advanceToNextToken();
            }
            // Skip to after the end of the comment node:
            //     <![CDATA[...]]>
            //                ^      we're here
            this.advanceByNumberOfTokens(3);
            //     <![CDATA[...]]>
            //                    ^      we're now here
            return;
        }
    }, {
        key: 'parseFromBeginningOfCommentNode',
        value: function parseFromBeginningOfCommentNode() {
            // Validate that we actually have a comment node:
            if (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 4) !== '<!--') {
                this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected beginning of comment (<!--)'));
            }
            // We know this is actually a comment node, so create the tree member and append to its content as long as the comment
            // node is not closed by `-->`.
            var commentNode = new ast.CommentNode();
            this.getCurrentContainerNode().appendChild(commentNode);
            // Skip over the comment opener:
            //     <!--
            //     ^      we're here
            this.advanceByNumberOfTokens(4);
            //     <!--
            //         ^      we're here
            // Start appending to the comment's content:
            commentNode.content = '';
            while (this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 3) !== '-->') {
                commentNode.content += this.getCurrentToken();
                this.advanceToNextToken();
            }
            // Skip to after the end of the comment node:
            //     <!-- some comment text, maybe with line breaks -->
            //                                                   ^      we're here
            this.advanceByNumberOfTokens(3);
            //     <!-- some comment text, maybe with line breaks -->
            //                                                       ^      we're now here
            return;
        }
    }, {
        key: 'parseCompleteOpeningTagInto',

        /**
         * Parses a complete opening tag with namespace prefix, tag name and attributes into a given node. This method will decide whether the node it is parsing is a container node or a void node and upgrade the node passed into it in param `node` to the respective ast node type.
         * The cursor is expected to be pointing at the first token after the tag opener:
         * for "normal" nodes:
         *     <alpha ...
         *      ^
         * for MDOs:
         *     <!DOCTYPE ...
         *       ^
         * for CDATA sections:
         *     <![CDATA[ ...
         *       ^
         * for PIs:
         *     <?svg ...
         *       ^
         * @param node The node to parse namespace prefix, tag name and attributes into.
         * @param allowDescendingIntoNewContainerNode Whether the parser should be allowed to descend if this method discovers that the node it is parsing is a container node.
         * @param allowSystemLiterals Whether system literals should be allowed in the parsed tag.
         */
        value: function parseCompleteOpeningTagInto(node, allowDescendingIntoNewContainerNode, allowSystemLiterals) {
            // we could now be in any of the following constructs:
            //     <alpha ...
            //      ^
            // or:
            //     <!DOCTYPE ...
            //       ^
            // or:
            //     <![CDATA[ ...
            //       ^
            // or:
            //     <?svg ...
            //       ^
            this.parseTagNameInto(node);
            if (this.getCurrentToken() !== '?' && this.getCurrentToken() !== '>') {
                this.parseAttributeListInto(node, allowSystemLiterals);
            }
            // skip all whitespace
            while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                this.advanceToNextToken();
            }
            switch (true) {
                default:
                    this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected end of opening tag'));
                    break;
                // self closing node
                case this.getTokenRangeStartingAt(this.getCurrentTokenIndex(), 2) === '/>':
                    // raise an error if the current node is not allowed to self close
                    if (!this.isCloseModeAllowedForTagName(node.tagName, TagCloseMode_1.TagCloseMode.SelfClose)) {
                        this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.IllegalSelfClose, 'tag \'' + node.tagName + '\' must not self-close'));
                    }
                    node.parserFlags |= NodeFlags_1.NodeFlags.SelfClosing;
                    this.advanceByNumberOfTokens(2);
                    return;
                // processing instruction
                case this.getCurrentToken() === '?':
                    this.advanceToNextToken();
                // ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓   FALL THROUGH   ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
                // container node
                case this.getCurrentToken() === '>':
                    this.parseEndOfNonSelfClosingOpeningTag(node, allowDescendingIntoNewContainerNode);
                    this.advanceToNextToken();
                    break;
            }
        }
        /**
         * Parses the end of opening tags that are not self closing. This method will decide whether the node it is parsing is a container node or a void node and upgrade the node passed into it in param `node` to the respective ast node type.
         * @param node The node to parse namespace prefix, tag name and attributes into.
         * @param allowDescendingIntoNewContainerNode Whether the parser should be allowed to descend if this method discovers that the node it is parsing is a container node.
         */

    }, {
        key: 'parseEndOfNonSelfClosingOpeningTag',
        value: function parseEndOfNonSelfClosingOpeningTag(node, allowDescendingIntoNewContainerNode) {
            if (!(node instanceof SelfClosingNode_1.SelfClosingNode)) {
                return;
            }
            if (this.isCloseModeAllowedForTagName(node.tagName, TagCloseMode_1.TagCloseMode.Void)) {
                var voidNode = Parser.createVoidNodeFromOtherNode(node);
                node.parentNode.replaceChild(node, voidNode);
                node = voidNode;
                node.parserFlags |= NodeFlags_1.NodeFlags.Void;
            } else {
                var containerNode = Parser.createContainerNodeFromOtherNode(node);
                node.parentNode.replaceChild(node, containerNode);
                node.parserFlags |= NodeFlags_1.NodeFlags.Opened;
                if (allowDescendingIntoNewContainerNode) {
                    this.descendInto(containerNode);
                }
            }
        }
    }, {
        key: 'parseTagName',
        value: function parseTagName() {
            // this will be set to `true` as soon as the first colon was seen
            var colonSeen = false,
                nameStash = '',
                tagNameInfo = {
                namespacePrefix: undefined,
                tagName: undefined
            };
            // we could now be in any of the following constructs:
            //     <alpha ...
            //      ^
            //     <alpha:beta ...
            //      ^
            // or:
            //     <!DOCTYPE ...
            //       ^
            // or:
            //     <?svg ...
            //       ^
            while (Parser.isTokenLegalInTagNameOrTagNameNamespacePrefix(this.getCurrentToken()) || this.getCurrentToken() === ':') {
                if (this.getCurrentToken() === ':') {
                    if (colonSeen) {
                        this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.IllegalNamespacePrefix, 'illegal multiple namespace prefix (multiple colons in tag name)'));
                    }
                    colonSeen = true;
                    tagNameInfo.namespacePrefix = nameStash;
                    nameStash = '';
                    this.advanceToNextToken();
                    if (!Parser.isAlphabeticToken(this.getCurrentToken())) {
                        this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.MissingTagNameAfterNamespacePrefix, 'namespace prefix must be followed by a tag name'));
                        return;
                    }
                }
                nameStash += this.getCurrentToken();
                this.advanceToNextToken();
            }
            tagNameInfo.tagName = nameStash;
            return tagNameInfo;
        }
        /**
         * Parses a tag name into an AST node. Supports namespace prefixes.
         * @param node The AST node to parse the tag name into.
         */

    }, {
        key: 'parseTagNameInto',
        value: function parseTagNameInto(node) {
            var tagNameInfo = this.parseTagName();
            node.namespacePrefix = tagNameInfo.namespacePrefix;
            node.tagName = tagNameInfo.tagName;
        }
    }, {
        key: 'parseAttributeListInto',
        value: function parseAttributeListInto(node, allowSystemLiterals) {
            // We are now at the first token after the opening tag name, which could be either whitespace, the end of the opening tag or
            // the start of a system literal:
            //     <alpha fibo="nacci"...
            //           ^
            // or:
            //     <alpha>
            //           ^
            // or:
            //     <alpha />
            //           ^
            // or:
            //     <alpha/>
            //           ^
            // or:
            //     <alpha"FOO"/>
            //           ^
            if (!Parser.isWhitespaceToken(this.getCurrentToken()) && this.getCurrentToken() !== '/' && this.getCurrentToken() !== '>') {
                if (!allowSystemLiterals && this.getCurrentToken() === '"') {
                    this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('expected whitespace or end of opening tag'));
                }
            }
            // skip all whitespace
            while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                this.advanceToNextToken();
            }
            // if there's no alphabetic token here, there are no attributes to be parsed
            if (!Parser.isAlphabeticToken(this.getCurrentToken()) && !allowSystemLiterals && this.getCurrentToken() !== '"') {
                return;
            }
            // advance until there are no attributes and literals to be parsed
            while (this.getCurrentToken() !== '>' && this.getCurrentToken() !== '/' && this.getCurrentToken() !== '?') {
                if (this.getCurrentToken() === '"') {
                    if (!allowSystemLiterals) {
                        this.raiseError(this.createUnexpectedTokenSyntaxErrorAtCurrentToken('system literal not allowed on this node'));
                    }
                    node.appendToSystemLiteralList(this.parseLiteral());
                } else {
                    var attrInfo = this.parseAttribute();
                    /// TODO:
                    /// Empty attribute names should never happen (see issue #7). Find out why this happens, fix it, then remove the
                    /// `continue` workaround below.
                    if (attrInfo.name === '') {
                        continue;
                    }
                    node.setAttribute(attrInfo.name, attrInfo.value);
                    // skip all whitespace
                    while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                        this.advanceToNextToken();
                    }
                }
            }
        }
    }, {
        key: 'parseLiteral',
        value: function parseLiteral() {
            var value = '';
            // skip all whitespace
            while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                this.advanceToNextToken();
            }
            var valueQuoteCharacter = this.getCurrentToken();
            while (!this.isAtEndOfInput()) {
                this.advanceToNextToken();
                if (this.getCurrentToken() === valueQuoteCharacter) {
                    break;
                }
                value += this.getCurrentToken();
            }
            this.advanceToNextToken();
            return value;
        }
    }, {
        key: 'parseAttribute',
        value: function parseAttribute() {
            var name = '',
                value,
                valueQuoteCharacter,
                colonSeen = false,
                getAttrInfo = function getAttrInfo() {
                return { name: name, value: value };
            };
            // skip all whitespace
            while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                this.advanceToNextToken();
            }
            // advance as long as we're in the attribute's name
            while (Parser.isTokenLegalInAttributeNameOrAttributeNameNameNamespacePrefix(this.getCurrentToken()) || this.getCurrentToken() === ':') {
                if (this.getCurrentToken() === ':') {
                    if (colonSeen) {
                        this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.IllegalNamespacePrefix, 'illegal multiple namespace prefix (multiple colons in tag name)'));
                    }
                    colonSeen = true;
                    if (!Parser.isAlphabeticToken(this.getNextToken())) {
                        this.raiseError(this.createSyntaxErrorAtCurrentToken(SyntaxErrorCode_1.SyntaxErrorCode.MissingTagNameAfterNamespacePrefix, 'namespace prefix must be followed by a tag name'));
                        return;
                    }
                }
                name += this.getCurrentToken();
                this.advanceToNextToken();
            }
            // skip all whitespace after the attribute name
            while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                this.advanceToNextToken();
            }
            // if there's no equal sign here, the attribute is empty:
            if (this.getCurrentToken() !== '=') {
                return getAttrInfo();
            }
            this.advanceToNextToken();
            if (Parser.isWhitespaceToken(this.getCurrentToken()) || this.getCurrentToken() === '"' || this.getCurrentToken() === '\'') {
                // skip all whitespace after the equal sign
                while (Parser.isWhitespaceToken(this.getCurrentToken())) {
                    this.advanceToNextToken();
                }
                if (this.getCurrentToken() === '"' || this.getCurrentToken() === '\'') {
                    valueQuoteCharacter = this.getCurrentToken();
                } else {
                    return getAttrInfo();
                }
            }
            value = '';
            while (!this.isAtEndOfInput()) {
                this.advanceToNextToken();
                if (this.getCurrentToken() === valueQuoteCharacter) {
                    this.advanceToNextToken();
                    break;
                }
                value += this.getCurrentToken();
            }
            return getAttrInfo();
        }
        ///
        /// MISC METHODS & PROPERTIES:
        ///

    }, {
        key: 'getTokenMatrix',
        value: function getTokenMatrix() {
            if ((0, _typeof3.default)(this.tokenMatrix) !== 'object' || this.tokenMatrix === null) {
                this.createTokenMatrix();
            }
            return this.tokenMatrix;
        }
    }, {
        key: 'createTokenMatrix',
        value: function createTokenMatrix() {
            var line = 1,
                column = 0;
            this.tokenMatrix = new Array(this.stringToParse.length);
            for (var i = 0; i < this.stringToParse.length; i++) {
                column += 1;
                var currentToken = this.stringToParse[i];
                this.tokenMatrix[i] = { line: line, column: column };
                if (currentToken === '\n') {
                    line += 1;
                    column = 0;
                }
            }
        }
    }], [{
        key: 'createForXmlString',
        value: function createForXmlString(stringToParse) {
            return new Parser(stringToParse);
        }
        /**
         * Parses an XML string and returns the parser object that parsed the string.
         * @see Parser.parseStringToAst(...)
         * @param stringToParse The XML string to be parsed.
         * @param ruleSet The sytnax rule set to apply to the parser. Optional. The parser falls back to default XML parsing rules when no other rules are provided.
         */

    }, {
        key: 'parseString',
        value: function parseString(stringToParse, ruleSet) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var parser;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                parser = Parser.createForXmlString(stringToParse);

                                if (ruleSet instanceof SyntaxRuleSet_1.SyntaxRuleSet || SyntaxRuleSet_1.SyntaxRuleSet.isSyntaxRuleSetClass(ruleSet)) {
                                    parser.applySyntaxRuleSet(ruleSet);
                                }
                                parser.parseComplete();
                                return _context.abrupt('return', parser);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * Parses an XML string and returns a syntax tree.
         * @see Parser.parseString(...)
         * @param stringToParse The XML string to be parsed.
         * @param ruleSet The sytnax rule set to apply to the parser. Optional. The parser falls back to default XML parsing rules when no other rules are provided.
         */

    }, {
        key: 'parseStringToAst',
        value: function parseStringToAst(stringToParse, ruleSet) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return Parser.parseString(stringToParse, ruleSet);

                            case 2:
                                return _context2.abrupt('return', _context2.sent.getAst());

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: 'isSingularCloseMode',
        value: function isSingularCloseMode(closeMode) {
            return closeMode in TagCloseMode_1.TagCloseMode;
        }
    }, {
        key: 'createDefaultTagSyntaxRule',
        value: function createDefaultTagSyntaxRule() {
            var rule = TagSyntaxRule_1.TagSyntaxRule.createForTagName(undefined);
            rule.setCloseMode(TagCloseMode_1.TagCloseMode.Tag | TagCloseMode_1.TagCloseMode.SelfClose);
            return rule;
        }
    }, {
        key: 'isAlphabeticToken',
        value: function isAlphabeticToken(token) {
            return (/[a-z]/i.test(token[0])
            );
        }
    }, {
        key: 'isNumericToken',
        value: function isNumericToken(token) {
            return (/[0-9]/i.test(token[0])
            );
        }
    }, {
        key: 'isWhitespaceToken',
        value: function isWhitespaceToken(token) {
            token = token[0];
            return token === ' ' || token === '\t' || token === '\r' || token === '\n';
        }
    }, {
        key: 'isTokenLegalInTagNameOrTagNameNamespacePrefix',
        value: function isTokenLegalInTagNameOrTagNameNamespacePrefix(token) {
            return Parser.isAlphabeticToken(token) || Parser.isNumericToken(token) || token[0] === '-' || token[0] === '_' || token[0] === '.';
        }
    }, {
        key: 'isTokenLegalInAttributeNameOrAttributeNameNameNamespacePrefix',
        value: function isTokenLegalInAttributeNameOrAttributeNameNameNamespacePrefix(token) {
            return Parser.isAlphabeticToken(token) || Parser.isNumericToken(token) || token[0] === '-' || token[0] === '_';
        }
    }, {
        key: 'createContainerNodeFromOtherNode',
        value: function createContainerNodeFromOtherNode(node) {
            var containerNode = new ContainerNode_1.ContainerNode();
            containerNode.namespacePrefix = node.namespacePrefix;
            containerNode.tagName = node.tagName;
            node.getAllAttributeNames().forEach(function (attrName) {
                return containerNode.setAttribute(attrName, node.getAttribute(attrName));
            });
            return containerNode;
        }
    }, {
        key: 'createVoidNodeFromOtherNode',
        value: function createVoidNodeFromOtherNode(node) {
            var voidNode = new VoidNode_1.VoidNode();
            voidNode.namespacePrefix = node.namespacePrefix;
            voidNode.tagName = node.tagName;
            node.getAllAttributeNames().forEach(function (attrName) {
                return voidNode.setAttribute(attrName, node.getAttribute(attrName));
            });
            return voidNode;
        }
    }]);
    return Parser;
}();

exports.Parser = Parser;
},{"../ast":2,"../ast/ContainerNode":6,"../ast/DocumentNode":8,"../ast/Node":9,"../ast/SelfClosingNode":11,"../ast/VoidNode":13,"./NodeFlags":16,"./SyntaxError":18,"./SyntaxErrorCode":19,"./SyntaxRuleSet":20,"./TagCloseMode":21,"./TagSyntaxRule":22,"babel-runtime/core-js/promise":32,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/toConsumableArray":40,"babel-runtime/helpers/typeof":41,"babel-runtime/regenerator":42}],18:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SyntaxErrorCode_1 = _dereq_('./SyntaxErrorCode');

var SyntaxError = function (_Error) {
    (0, _inherits3.default)(SyntaxError, _Error);

    function SyntaxError(errorCode, line, column, source, message) {
        (0, _classCallCheck3.default)(this, SyntaxError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SyntaxError).call(this, message));

        _this.errorCode = errorCode;
        _this.line = line;
        _this.column = column;
        _this.source = source;
        _this.source = _this.source || '';
        return _this;
    }

    (0, _createClass3.default)(SyntaxError, [{
        key: 'getMessage',
        value: function getMessage() {
            return this.message;
        }
    }, {
        key: 'getErrorCode',
        value: function getErrorCode() {
            return this.errorCode;
        }
    }, {
        key: 'getErrorName',
        value: function getErrorName() {
            return SyntaxError.getSyntaxErrorCodeName(this.getErrorCode());
        }
    }, {
        key: 'getLine',
        value: function getLine() {
            return this.line;
        }
    }, {
        key: 'getColumn',
        value: function getColumn() {
            return this.column;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'syntax error [' + this.getErrorCode() + ' ' + this.getErrorName() + '] at token \'' + this.getTokenAt(this.line, this.column) + '\' ' + this.getLine() + ', ' + this.getColumn() + ': ' + this.getMessage();
        }
    }, {
        key: 'getTokenAt',
        value: function getTokenAt(line, column) {
            var sourceLine = this.source.split(/\n/)[line - 1];
            if (typeof sourceLine !== 'string') {
                return '';
            }
            return sourceLine.split('')[column - 1];
        }
    }], [{
        key: 'getSyntaxErrorCodeName',
        value: function getSyntaxErrorCodeName(errorCode) {
            return SyntaxErrorCode_1.SyntaxErrorCode[errorCode];
        }
    }]);
    return SyntaxError;
}(Error);

exports.SyntaxError = SyntaxError;
},{"./SyntaxErrorCode":19,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],19:[function(_dereq_,module,exports){
"use strict";

(function (SyntaxErrorCode) {
    SyntaxErrorCode[SyntaxErrorCode["Unknown"] = 0] = "Unknown";
    SyntaxErrorCode[SyntaxErrorCode["UnexpectedToken"] = 1] = "UnexpectedToken";
    SyntaxErrorCode[SyntaxErrorCode["MissingTagNameAfterNamespacePrefix"] = 2] = "MissingTagNameAfterNamespacePrefix";
    SyntaxErrorCode[SyntaxErrorCode["MissingAttrNameAfterAttrPrefix"] = 3] = "MissingAttrNameAfterAttrPrefix";
    SyntaxErrorCode[SyntaxErrorCode["IllegalNamespacePrefix"] = 4] = "IllegalNamespacePrefix";
    SyntaxErrorCode[SyntaxErrorCode["IllegalSelfClose"] = 5] = "IllegalSelfClose";
    SyntaxErrorCode[SyntaxErrorCode["ExcessCloseTag"] = 6] = "ExcessCloseTag";
    SyntaxErrorCode[SyntaxErrorCode["InvalidTagName"] = 7] = "InvalidTagName";
})(exports.SyntaxErrorCode || (exports.SyntaxErrorCode = {}));
var SyntaxErrorCode = exports.SyntaxErrorCode;
},{}],20:[function(_dereq_,module,exports){
"use strict";

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SyntaxRuleSet = function () {
    function SyntaxRuleSet() {
        (0, _classCallCheck3.default)(this, SyntaxRuleSet);

        this.tagSyntaxRules = [];
    }
    /**
     * Creates an instance of the syntax rule set class this static method is called on.
     */


    (0, _createClass3.default)(SyntaxRuleSet, [{
        key: "hasTagSyntaxRule",
        value: function hasTagSyntaxRule(rule) {
            return this.tagSyntaxRules.indexOf(rule) !== -1;
        }
    }, {
        key: "getAllTagSyntaxRules",
        value: function getAllTagSyntaxRules() {
            return [].concat(this.tagSyntaxRules);
        }
        /**
         * @chainable
         */

    }, {
        key: "addTagSyntaxRule",
        value: function addTagSyntaxRule(rule) {
            if (!this.hasTagSyntaxRule(rule)) {
                this.tagSyntaxRules.push(rule);
            }
            return this;
        }
        /**
         * @chainable
         */

    }, {
        key: "addTagSyntaxRules",
        value: function addTagSyntaxRules() {
            var _this = this;

            for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
                rules[_key] = arguments[_key];
            }

            rules.forEach(function (rule) {
                return _this.addTagSyntaxRule(rule);
            });
            return this;
        }
    }], [{
        key: "createInstance",
        value: function createInstance() {
            return new this();
        }
    }, {
        key: "isSyntaxRuleSetClass",
        value: function isSyntaxRuleSetClass(candidate) {
            return typeof candidate === 'function' && candidate._syntaxRuleSetBrand_ === SyntaxRuleSet._syntaxRuleSetBrand_;
        }
    }]);
    return SyntaxRuleSet;
}();

SyntaxRuleSet._syntaxRuleSetBrand_ = Math.random();
exports.SyntaxRuleSet = SyntaxRuleSet;
},{"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36}],21:[function(_dereq_,module,exports){
"use strict";
/**
 * Enumerates all tag closing modes. Bitmap.
 */

(function (TagCloseMode) {
  /**
   * Indicates that a tag can be closed by a close tag, such as `<div></div>`.
   */
  TagCloseMode[TagCloseMode["Tag"] = 1] = "Tag";
  /**
   * Indicates that a tag can self-close, such as `<br />`.
   */
  TagCloseMode[TagCloseMode["SelfClose"] = 2] = "SelfClose";
  /**
   * Indicates that a tag does not need to close, such as `<meta>`.
   */
  TagCloseMode[TagCloseMode["Void"] = 4] = "Void";
})(exports.TagCloseMode || (exports.TagCloseMode = {}));
var TagCloseMode = exports.TagCloseMode;
},{}],22:[function(_dereq_,module,exports){
"use strict";
/**
 * Defines all possible permissions and restrictions for one or more tags.
 */

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagSyntaxRule = function () {
  /**
   * Creates a new tag syntax rule object. **Use static method `createForTagName` instead.**
   */

  function TagSyntaxRule(tagNames) {
    (0, _classCallCheck3.default)(this, TagSyntaxRule);

    this.tagNames = tagNames;
  }
  /**
   * Creates a new syntax rule for a certain tag name.
   * @param tagName The tag name to create the syntax rule for.
   */


  (0, _createClass3.default)(TagSyntaxRule, [{
    key: "getTagNames",

    /**
     * Returns all tag names a rule applies to.
     */
    value: function getTagNames() {
      return [].concat(this.tagNames);
    }
    /**
     * Checks whether a rule applies to a certain tag name. This method is case sensitive.
     * @param tagName The tag name to check.
     */

  }, {
    key: "appliesToTagName",
    value: function appliesToTagName(tagName) {
      return this.tagNames.indexOf(tagName) !== -1;
    }
    /**
     * Returns a rule's current close mode or close modes.
     */

  }, {
    key: "getCloseMode",
    value: function getCloseMode() {
      return this.closeMode;
    }
    /**
     * Sets the rule's allowed tag close modes. This can be a single mode or a combination of modes.
     * @example
     *     rule.setCloseMode(TagCloseMode.SelfClose);
     *     rule.setCloseMode(TagCloseMode.SelfClose | TagCloseMode.Void);
     * @chainable
     * @param mode The close mode to set.
     */

  }, {
    key: "setCloseMode",
    value: function setCloseMode(mode) {
      this.closeMode = mode;
      return this;
    }
  }], [{
    key: "createForTagName",
    value: function createForTagName(tagName) {
      return new TagSyntaxRule([tagName]);
    }
    /**
     * Creates a new syntax rule for one or more tag names.
     * @param tagName The tag name to create the syntax rule for.
     */

  }, {
    key: "createForTagNames",
    value: function createForTagNames() {
      for (var _len = arguments.length, tagNames = Array(_len), _key = 0; _key < _len; _key++) {
        tagNames[_key] = arguments[_key];
      }

      return new TagSyntaxRule(
      // make sure there are no duplicate tag names
      /// TODO: Check whether this is fast enough on large tag name lists.
      tagNames.filter(function (tagName, index, array) {
        return array.indexOf(tagName) === index;
      }));
    }
  }]);
  return TagSyntaxRule;
}();

exports.TagSyntaxRule = TagSyntaxRule;
},{"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36}],23:[function(_dereq_,module,exports){
"use strict";

var Html5_1 = _dereq_('./ruleSet/Html5');
exports.Html5 = Html5_1.Html5;
},{"./ruleSet/Html5":24}],24:[function(_dereq_,module,exports){
"use strict";

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagCloseMode_1 = _dereq_('../TagCloseMode');
var TagSyntaxRule_1 = _dereq_('../TagSyntaxRule');
var SyntaxRuleSet_1 = _dereq_('../SyntaxRuleSet');

var Html5 = function (_SyntaxRuleSet_1$Synt) {
    (0, _inherits3.default)(Html5, _SyntaxRuleSet_1$Synt);

    function Html5(allowVoidElementsToSelfClose) {
        (0, _classCallCheck3.default)(this, Html5);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Html5).call(this));

        if (typeof allowVoidElementsToSelfClose === 'undefined') {
            allowVoidElementsToSelfClose = true;
        }
        // see https://www.w3.org/TR/html-markup/syntax.html#syntax-elements
        var voidTagSyntaxRule = TagSyntaxRule_1.TagSyntaxRule.createForTagNames('area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr');
        if (allowVoidElementsToSelfClose) {
            voidTagSyntaxRule.setCloseMode(TagCloseMode_1.TagCloseMode.Void | TagCloseMode_1.TagCloseMode.SelfClose);
        } else {
            voidTagSyntaxRule.setCloseMode(TagCloseMode_1.TagCloseMode.Void);
        }
        _this.addTagSyntaxRule(voidTagSyntaxRule);
        return _this;
    }

    (0, _createClass3.default)(Html5, null, [{
        key: 'Loose',
        get: function get() {
            return function (_Html) {
                (0, _inherits3.default)(Html5Loose, _Html);

                function Html5Loose() {
                    (0, _classCallCheck3.default)(this, Html5Loose);
                    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Html5Loose).call(this, true));
                }

                return Html5Loose;
            }(Html5);
        }
    }, {
        key: 'Strict',
        get: function get() {
            return function (_Html2) {
                (0, _inherits3.default)(Html5Strict, _Html2);

                function Html5Strict() {
                    (0, _classCallCheck3.default)(this, Html5Strict);
                    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Html5Strict).call(this, false));
                }

                return Html5Strict;
            }(Html5);
        }
    }]);
    return Html5;
}(SyntaxRuleSet_1.SyntaxRuleSet);

exports.Html5 = Html5;
},{"../SyntaxRuleSet":20,"../TagCloseMode":21,"../TagSyntaxRule":22,"babel-runtime/core-js/object/get-prototype-of":29,"babel-runtime/helpers/classCallCheck":35,"babel-runtime/helpers/createClass":36,"babel-runtime/helpers/inherits":38,"babel-runtime/helpers/possibleConstructorReturn":39}],25:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":44}],26:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":45}],27:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":46}],28:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":47}],29:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":48}],30:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":49}],31:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":50}],32:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":51}],33:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":52}],34:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":53}],35:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],36:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = _dereq_("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"babel-runtime/core-js/object/define-property":27}],37:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = _dereq_("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = _dereq_("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"babel-runtime/core-js/object/get-own-property-descriptor":28,"babel-runtime/core-js/object/get-prototype-of":29}],38:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = _dereq_("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = _dereq_("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = _dereq_("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"babel-runtime/core-js/object/create":26,"babel-runtime/core-js/object/set-prototype-of":31,"babel-runtime/helpers/typeof":41}],39:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = _dereq_("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"babel-runtime/helpers/typeof":41}],40:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _from = _dereq_("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"babel-runtime/core-js/array/from":25}],41:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = _dereq_("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = _dereq_("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"babel-runtime/core-js/symbol":33,"babel-runtime/core-js/symbol/iterator":34}],42:[function(_dereq_,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = _dereq_("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":43}],43:[function(_dereq_,module,exports){
(function (process,global){
"use strict";

var _promise = _dereq_("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _setPrototypeOf = _dereq_("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = _dereq_("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = _dereq_("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _iterator = _dereq_("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = _dereq_("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";

  var inModule = (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = (0, _create2.default)((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (_setPrototypeOf2.default) {
      (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = (0, _create2.default)(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration. If the Promise is rejected, however, the
        // result for this iteration will be rejected with the same
        // reason. Note that rejections of yielded Promises are not
        // thrown back into the generator function, as is the case
        // when an awaited Promise is rejected. This difference in
        // behavior between yield and await is important, because it
        // allows the consumer to decide what to do with the yielded
        // rejection (swallow it and continue, manually .throw it back
        // into the generator, abandon iteration, whatever). With
        // await, by contrast, there is no opportunity to examine the
        // rejection reason outside the generator function, so the
        // only option is to throw it from the await expression, and
        // let the generator function handle the exception.
        result.value = unwrapped;
        return result;
      });
    }

    if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
        resolve(callInvokeWithMethodAndArg());
      });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
}).call(this,_dereq_("pBGvAp"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/core-js/object/create":26,"babel-runtime/core-js/object/set-prototype-of":31,"babel-runtime/core-js/promise":32,"babel-runtime/core-js/symbol":33,"babel-runtime/core-js/symbol/iterator":34,"babel-runtime/helpers/typeof":41,"pBGvAp":141}],44:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.string.iterator');
_dereq_('../../modules/es6.array.from');
module.exports = _dereq_('../../modules/_core').Array.from;
},{"../../modules/_core":61,"../../modules/es6.array.from":126,"../../modules/es6.string.iterator":136}],45:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.create');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":61,"../../modules/es6.object.create":128}],46:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.define-property');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":61,"../../modules/es6.object.define-property":129}],47:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.get-own-property-descriptor');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":61,"../../modules/es6.object.get-own-property-descriptor":130}],48:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.get-prototype-of');
module.exports = _dereq_('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":61,"../../modules/es6.object.get-prototype-of":131}],49:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.keys');
module.exports = _dereq_('../../modules/_core').Object.keys;
},{"../../modules/_core":61,"../../modules/es6.object.keys":132}],50:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.set-prototype-of');
module.exports = _dereq_('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":61,"../../modules/es6.object.set-prototype-of":133}],51:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.promise');
module.exports = _dereq_('../modules/_core').Promise;
},{"../modules/_core":61,"../modules/es6.object.to-string":134,"../modules/es6.promise":135,"../modules/es6.string.iterator":136,"../modules/web.dom.iterable":140}],52:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.symbol');
_dereq_('../../modules/es6.object.to-string');
_dereq_('../../modules/es7.symbol.async-iterator');
_dereq_('../../modules/es7.symbol.observable');
module.exports = _dereq_('../../modules/_core').Symbol;
},{"../../modules/_core":61,"../../modules/es6.object.to-string":134,"../../modules/es6.symbol":137,"../../modules/es7.symbol.async-iterator":138,"../../modules/es7.symbol.observable":139}],53:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.string.iterator');
_dereq_('../../modules/web.dom.iterable');
module.exports = _dereq_('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":123,"../../modules/es6.string.iterator":136,"../../modules/web.dom.iterable":140}],54:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],55:[function(_dereq_,module,exports){
module.exports = function(){ /* empty */ };
},{}],56:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],57:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":81}],58:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_('./_to-iobject')
  , toLength  = _dereq_('./_to-length')
  , toIndex   = _dereq_('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":115,"./_to-iobject":117,"./_to-length":118}],59:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_('./_cof')
  , TAG = _dereq_('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":60,"./_wks":124}],60:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],61:[function(_dereq_,module,exports){
var core = module.exports = {version: '2.3.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],62:[function(_dereq_,module,exports){
'use strict';
var $defineProperty = _dereq_('./_object-dp')
  , createDesc      = _dereq_('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":93,"./_property-desc":104}],63:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":54}],64:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],65:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":70}],66:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object')
  , document = _dereq_('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":72,"./_is-object":81}],67:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],68:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var getKeys = _dereq_('./_object-keys')
  , gOPS    = _dereq_('./_object-gops')
  , pIE     = _dereq_('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":98,"./_object-keys":101,"./_object-pie":102}],69:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , core      = _dereq_('./_core')
  , ctx       = _dereq_('./_ctx')
  , hide      = _dereq_('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":61,"./_ctx":63,"./_global":72,"./_hide":74}],70:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],71:[function(_dereq_,module,exports){
var ctx         = _dereq_('./_ctx')
  , call        = _dereq_('./_iter-call')
  , isArrayIter = _dereq_('./_is-array-iter')
  , anObject    = _dereq_('./_an-object')
  , toLength    = _dereq_('./_to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./_an-object":57,"./_ctx":63,"./_is-array-iter":79,"./_iter-call":82,"./_to-length":118,"./core.get-iterator-method":125}],72:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],73:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],74:[function(_dereq_,module,exports){
var dP         = _dereq_('./_object-dp')
  , createDesc = _dereq_('./_property-desc');
module.exports = _dereq_('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":65,"./_object-dp":93,"./_property-desc":104}],75:[function(_dereq_,module,exports){
module.exports = _dereq_('./_global').document && document.documentElement;
},{"./_global":72}],76:[function(_dereq_,module,exports){
module.exports = !_dereq_('./_descriptors') && !_dereq_('./_fails')(function(){
  return Object.defineProperty(_dereq_('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":65,"./_dom-create":66,"./_fails":70}],77:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],78:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":60}],79:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_('./_iterators')
  , ITERATOR   = _dereq_('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":87,"./_wks":124}],80:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":60}],81:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],82:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":57}],83:[function(_dereq_,module,exports){
'use strict';
var create         = _dereq_('./_object-create')
  , descriptor     = _dereq_('./_property-desc')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_('./_hide')(IteratorPrototype, _dereq_('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":74,"./_object-create":92,"./_property-desc":104,"./_set-to-string-tag":109,"./_wks":124}],84:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_('./_library')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , hide           = _dereq_('./_hide')
  , has            = _dereq_('./_has')
  , Iterators      = _dereq_('./_iterators')
  , $iterCreate    = _dereq_('./_iter-create')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , getPrototypeOf = _dereq_('./_object-gpo')
  , ITERATOR       = _dereq_('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":69,"./_has":73,"./_hide":74,"./_iter-create":83,"./_iterators":87,"./_library":89,"./_object-gpo":99,"./_redefine":106,"./_set-to-string-tag":109,"./_wks":124}],85:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":124}],86:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],87:[function(_dereq_,module,exports){
module.exports = {};
},{}],88:[function(_dereq_,module,exports){
var getKeys   = _dereq_('./_object-keys')
  , toIObject = _dereq_('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":101,"./_to-iobject":117}],89:[function(_dereq_,module,exports){
module.exports = true;
},{}],90:[function(_dereq_,module,exports){
var META     = _dereq_('./_uid')('meta')
  , isObject = _dereq_('./_is-object')
  , has      = _dereq_('./_has')
  , setDesc  = _dereq_('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_dereq_('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":70,"./_has":73,"./_is-object":81,"./_object-dp":93,"./_uid":121}],91:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , macrotask = _dereq_('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":60,"./_global":72,"./_task":114}],92:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = _dereq_('./_an-object')
  , dPs         = _dereq_('./_object-dps')
  , enumBugKeys = _dereq_('./_enum-bug-keys')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _dereq_('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":57,"./_dom-create":66,"./_enum-bug-keys":67,"./_html":75,"./_object-dps":94,"./_shared-key":110}],93:[function(_dereq_,module,exports){
var anObject       = _dereq_('./_an-object')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , toPrimitive    = _dereq_('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = _dereq_('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":57,"./_descriptors":65,"./_ie8-dom-define":76,"./_to-primitive":120}],94:[function(_dereq_,module,exports){
var dP       = _dereq_('./_object-dp')
  , anObject = _dereq_('./_an-object')
  , getKeys  = _dereq_('./_object-keys');

module.exports = _dereq_('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":57,"./_descriptors":65,"./_object-dp":93,"./_object-keys":101}],95:[function(_dereq_,module,exports){
var pIE            = _dereq_('./_object-pie')
  , createDesc     = _dereq_('./_property-desc')
  , toIObject      = _dereq_('./_to-iobject')
  , toPrimitive    = _dereq_('./_to-primitive')
  , has            = _dereq_('./_has')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = _dereq_('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":65,"./_has":73,"./_ie8-dom-define":76,"./_object-pie":102,"./_property-desc":104,"./_to-iobject":117,"./_to-primitive":120}],96:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_('./_to-iobject')
  , gOPN      = _dereq_('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":97,"./_to-iobject":117}],97:[function(_dereq_,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = _dereq_('./_object-keys-internal')
  , hiddenKeys = _dereq_('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":67,"./_object-keys-internal":100}],98:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],99:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = _dereq_('./_has')
  , toObject    = _dereq_('./_to-object')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":73,"./_shared-key":110,"./_to-object":119}],100:[function(_dereq_,module,exports){
var has          = _dereq_('./_has')
  , toIObject    = _dereq_('./_to-iobject')
  , arrayIndexOf = _dereq_('./_array-includes')(false)
  , IE_PROTO     = _dereq_('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":58,"./_has":73,"./_shared-key":110,"./_to-iobject":117}],101:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _dereq_('./_object-keys-internal')
  , enumBugKeys = _dereq_('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":67,"./_object-keys-internal":100}],102:[function(_dereq_,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],103:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_('./_export')
  , core    = _dereq_('./_core')
  , fails   = _dereq_('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":61,"./_export":69,"./_fails":70}],104:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],105:[function(_dereq_,module,exports){
var hide = _dereq_('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":74}],106:[function(_dereq_,module,exports){
module.exports = _dereq_('./_hide');
},{"./_hide":74}],107:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = _dereq_('./_is-object')
  , anObject = _dereq_('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_('./_ctx')(Function.call, _dereq_('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":57,"./_ctx":63,"./_is-object":81,"./_object-gopd":95}],108:[function(_dereq_,module,exports){
'use strict';
var global      = _dereq_('./_global')
  , core        = _dereq_('./_core')
  , dP          = _dereq_('./_object-dp')
  , DESCRIPTORS = _dereq_('./_descriptors')
  , SPECIES     = _dereq_('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":61,"./_descriptors":65,"./_global":72,"./_object-dp":93,"./_wks":124}],109:[function(_dereq_,module,exports){
var def = _dereq_('./_object-dp').f
  , has = _dereq_('./_has')
  , TAG = _dereq_('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":73,"./_object-dp":93,"./_wks":124}],110:[function(_dereq_,module,exports){
var shared = _dereq_('./_shared')('keys')
  , uid    = _dereq_('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":111,"./_uid":121}],111:[function(_dereq_,module,exports){
var global = _dereq_('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":72}],112:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_('./_an-object')
  , aFunction = _dereq_('./_a-function')
  , SPECIES   = _dereq_('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":54,"./_an-object":57,"./_wks":124}],113:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , defined   = _dereq_('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":64,"./_to-integer":116}],114:[function(_dereq_,module,exports){
var ctx                = _dereq_('./_ctx')
  , invoke             = _dereq_('./_invoke')
  , html               = _dereq_('./_html')
  , cel                = _dereq_('./_dom-create')
  , global             = _dereq_('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":60,"./_ctx":63,"./_dom-create":66,"./_global":72,"./_html":75,"./_invoke":77}],115:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":116}],116:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],117:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./_iobject')
  , defined = _dereq_('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":64,"./_iobject":78}],118:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":116}],119:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":64}],120:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":81}],121:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],122:[function(_dereq_,module,exports){
var global         = _dereq_('./_global')
  , core           = _dereq_('./_core')
  , LIBRARY        = _dereq_('./_library')
  , wksExt         = _dereq_('./_wks-ext')
  , defineProperty = _dereq_('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":61,"./_global":72,"./_library":89,"./_object-dp":93,"./_wks-ext":123}],123:[function(_dereq_,module,exports){
exports.f = _dereq_('./_wks');
},{"./_wks":124}],124:[function(_dereq_,module,exports){
var store      = _dereq_('./_shared')('wks')
  , uid        = _dereq_('./_uid')
  , Symbol     = _dereq_('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":72,"./_shared":111,"./_uid":121}],125:[function(_dereq_,module,exports){
var classof   = _dereq_('./_classof')
  , ITERATOR  = _dereq_('./_wks')('iterator')
  , Iterators = _dereq_('./_iterators');
module.exports = _dereq_('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":59,"./_core":61,"./_iterators":87,"./_wks":124}],126:[function(_dereq_,module,exports){
'use strict';
var ctx            = _dereq_('./_ctx')
  , $export        = _dereq_('./_export')
  , toObject       = _dereq_('./_to-object')
  , call           = _dereq_('./_iter-call')
  , isArrayIter    = _dereq_('./_is-array-iter')
  , toLength       = _dereq_('./_to-length')
  , createProperty = _dereq_('./_create-property')
  , getIterFn      = _dereq_('./core.get-iterator-method');

$export($export.S + $export.F * !_dereq_('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":62,"./_ctx":63,"./_export":69,"./_is-array-iter":79,"./_iter-call":82,"./_iter-detect":85,"./_to-length":118,"./_to-object":119,"./core.get-iterator-method":125}],127:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_('./_add-to-unscopables')
  , step             = _dereq_('./_iter-step')
  , Iterators        = _dereq_('./_iterators')
  , toIObject        = _dereq_('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":55,"./_iter-define":84,"./_iter-step":86,"./_iterators":87,"./_to-iobject":117}],128:[function(_dereq_,module,exports){
var $export = _dereq_('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: _dereq_('./_object-create')});
},{"./_export":69,"./_object-create":92}],129:[function(_dereq_,module,exports){
var $export = _dereq_('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_dereq_('./_descriptors'), 'Object', {defineProperty: _dereq_('./_object-dp').f});
},{"./_descriptors":65,"./_export":69,"./_object-dp":93}],130:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = _dereq_('./_to-iobject')
  , $getOwnPropertyDescriptor = _dereq_('./_object-gopd').f;

_dereq_('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":95,"./_object-sap":103,"./_to-iobject":117}],131:[function(_dereq_,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = _dereq_('./_to-object')
  , $getPrototypeOf = _dereq_('./_object-gpo');

_dereq_('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":99,"./_object-sap":103,"./_to-object":119}],132:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_('./_to-object')
  , $keys    = _dereq_('./_object-keys');

_dereq_('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":101,"./_object-sap":103,"./_to-object":119}],133:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_('./_export');
$export($export.S, 'Object', {setPrototypeOf: _dereq_('./_set-proto').set});
},{"./_export":69,"./_set-proto":107}],134:[function(_dereq_,module,exports){

},{}],135:[function(_dereq_,module,exports){
'use strict';
var LIBRARY            = _dereq_('./_library')
  , global             = _dereq_('./_global')
  , ctx                = _dereq_('./_ctx')
  , classof            = _dereq_('./_classof')
  , $export            = _dereq_('./_export')
  , isObject           = _dereq_('./_is-object')
  , anObject           = _dereq_('./_an-object')
  , aFunction          = _dereq_('./_a-function')
  , anInstance         = _dereq_('./_an-instance')
  , forOf              = _dereq_('./_for-of')
  , setProto           = _dereq_('./_set-proto').set
  , speciesConstructor = _dereq_('./_species-constructor')
  , task               = _dereq_('./_task').set
  , microtask          = _dereq_('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_dereq_('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _dereq_('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
_dereq_('./_set-to-string-tag')($Promise, PROMISE);
_dereq_('./_set-species')(PROMISE);
Wrapper = _dereq_('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":54,"./_an-instance":56,"./_an-object":57,"./_classof":59,"./_core":61,"./_ctx":63,"./_export":69,"./_for-of":71,"./_global":72,"./_is-object":81,"./_iter-detect":85,"./_library":89,"./_microtask":91,"./_redefine-all":105,"./_set-proto":107,"./_set-species":108,"./_set-to-string-tag":109,"./_species-constructor":112,"./_task":114,"./_wks":124}],136:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":84,"./_string-at":113}],137:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = _dereq_('./_global')
  , has            = _dereq_('./_has')
  , DESCRIPTORS    = _dereq_('./_descriptors')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , META           = _dereq_('./_meta').KEY
  , $fails         = _dereq_('./_fails')
  , shared         = _dereq_('./_shared')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , uid            = _dereq_('./_uid')
  , wks            = _dereq_('./_wks')
  , wksExt         = _dereq_('./_wks-ext')
  , wksDefine      = _dereq_('./_wks-define')
  , keyOf          = _dereq_('./_keyof')
  , enumKeys       = _dereq_('./_enum-keys')
  , isArray        = _dereq_('./_is-array')
  , anObject       = _dereq_('./_an-object')
  , toIObject      = _dereq_('./_to-iobject')
  , toPrimitive    = _dereq_('./_to-primitive')
  , createDesc     = _dereq_('./_property-desc')
  , _create        = _dereq_('./_object-create')
  , gOPNExt        = _dereq_('./_object-gopn-ext')
  , $GOPD          = _dereq_('./_object-gopd')
  , $DP            = _dereq_('./_object-dp')
  , $keys          = _dereq_('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value){
        if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      }
    });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _dereq_('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  _dereq_('./_object-pie').f  = $propertyIsEnumerable;
  _dereq_('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_dereq_('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":57,"./_descriptors":65,"./_enum-keys":68,"./_export":69,"./_fails":70,"./_global":72,"./_has":73,"./_hide":74,"./_is-array":80,"./_keyof":88,"./_library":89,"./_meta":90,"./_object-create":92,"./_object-dp":93,"./_object-gopd":95,"./_object-gopn":97,"./_object-gopn-ext":96,"./_object-gops":98,"./_object-keys":101,"./_object-pie":102,"./_property-desc":104,"./_redefine":106,"./_set-to-string-tag":109,"./_shared":111,"./_to-iobject":117,"./_to-primitive":120,"./_uid":121,"./_wks":124,"./_wks-define":122,"./_wks-ext":123}],138:[function(_dereq_,module,exports){
_dereq_('./_wks-define')('asyncIterator');
},{"./_wks-define":122}],139:[function(_dereq_,module,exports){
_dereq_('./_wks-define')('observable');
},{"./_wks-define":122}],140:[function(_dereq_,module,exports){
_dereq_('./es6.array.iterator');
var global        = _dereq_('./_global')
  , hide          = _dereq_('./_hide')
  , Iterators     = _dereq_('./_iterators')
  , TO_STRING_TAG = _dereq_('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":72,"./_hide":74,"./_iterators":87,"./_wks":124,"./es6.array.iterator":127}],141:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[14])
(14)
});
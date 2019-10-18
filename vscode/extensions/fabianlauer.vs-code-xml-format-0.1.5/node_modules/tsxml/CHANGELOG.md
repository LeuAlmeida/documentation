## v0.1.2:

### New Features:
- Attribute-property binding
- Parser: Excess close tags now produce a syntax error

### Fixes:
- Namespace prefixes in closing tags produce a syntax error [(issue #9)](https://github.com/FabianLauer/tsxml/issues/9)
- PI serialisation: Don't emit a space before end question mark
- Fix some test cases that failed due to JSX usage in test files
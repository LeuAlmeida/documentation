import * as test from '../src/test';
import * as ast from './ast/TestRunner';
import * as parser from './parser/TestRunner';
import * as real from './real/TestRunner';
import * as serialisation from './serialisation/TestRunner';


// all test runners that should be run:
const testRunners: Array<typeof test.TestRunner> = [
	ast.TestRunner,
	parser.TestRunner,
	serialisation.TestRunner,
	real.TestRunner
];


/**
 * Runs a single test runner.
 */
async function run(testRunner: test.TestRunner): Promise<void> {
	new test.CliRenderer(testRunner);
	await testRunner.run();
}


// init
(async () => {
	for (let i = 0; i < testRunners.length; i++) {
		await run(new testRunners[i]);
	}
	process.exit();
})();	
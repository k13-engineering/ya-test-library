import { create as createNodeTestRunner } from "../lib/runners/node-test.ts";

const runner = createNodeTestRunner();

runner.run({
    group: {
        tests: {
            "should work": () => {

            },

            "should do xy": () => {
                throw Error("not working");
            },
        },

        groups: {
            "subgroup1": {
                tests: {
                    "should do xy subgroup1": () => {
                        throw Error("not working");
                    },
                }
            },
        }
    },

    bail: false
});

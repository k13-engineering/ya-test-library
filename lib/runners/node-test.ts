import type { ITestGroup, ITestRunner } from "../types.ts";
import nodeTestModule from "node:test";

import type { TestContext } from "node:test";

const create = (): ITestRunner => {

    const run = async ({ group, bail = false }: { group: ITestGroup, bail?: boolean }) => {

        const createTestsForGroupRecursively = async ({
            testContext,
            group
        }: {
            testContext: TestContext,
            group: ITestGroup
        }) => {
            let failed = false;

            for (const testName in group.tests) {
                if (failed && bail) {
                    break;
                }

                const test = group.tests[testName];

                await testContext.test(testName, async () => {
                    try {
                        await test();
                    } catch (ex) {
                        failed = true;
                        throw ex;
                    }
                });
            }

            for (const groupName in group.groups) {
                if (failed && bail) {
                    break;
                }

                const testGroup = group.groups[groupName];

                await testContext.test(groupName, async (innerTestContext) => {
                    const { failed: groupFailed } = await createTestsForGroupRecursively({
                        testContext: innerTestContext,
                        group: testGroup
                    });

                    if (groupFailed) {
                        failed = true;
                    }
                });
            }

            return {
                failed
            };
        };

        const { failed } = await createTestsForGroupRecursively({
            testContext: {
                test: nodeTestModule
            } as TestContext,
            group
        });

        return {
            failed
        };
    };

    return {
        run
    };
};

export {
    create
};

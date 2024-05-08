type TTestFunction = () => void | globalThis.Promise<void>;

interface ITestGroup {
    tests?: {
        [name: string]: TTestFunction;
    },
    groups?: {
        [name: string]: ITestGroup;
    }
};

interface ITestResult {
    failed: boolean;
};

interface ITestRunner {
    run: (args: { group: ITestGroup, bail?: boolean }) => Promise<ITestResult>;
};

export type {
    TTestFunction,
    ITestGroup,
    ITestResult,
    ITestRunner,
};

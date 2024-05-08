type TTestFunction = () => void | globalThis.Promise<void>;

interface ITestGroup {
    tests?: {
        [name: string]: TTestFunction;
    },
    groups?: {
        [name: string]: ITestGroup;
    }
};

interface ITestRunner {
    run: (args: { group: ITestGroup, bail?: boolean }) => void;
};

export type {
    ITestRunner,
    ITestGroup,
    TTestFunction
};

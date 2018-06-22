eval(pm.variables.get("pm_common"));

class Tester extends TestTemplate {
    setUp() {
        super.setUp();
        // doSomething();
    }

    expect_ok_200() {
        // main test
    }

    unexpected() {
        super.unexpected();
        // moreExceptionHandle();
    }

    tearDown() {
        // totally overwrite
    }
}

new Tester(new TestContext()).run();
const UnitTestGenerator = {
    $: {
        Color: "green",
    },

    init() {
        UnitTestGenerator.generateUnitTests()
    },

    /*
    UnitTestGenerator
    \n
    generateUnitTests success
    \n
    Color = " + UnitTestGenerator.$.Color
    */

    generateUnitTests() {
        console.log("Namespace: UnitTestGenerator\nMethod: generateUnitTests\nExpected Results: "+ UnitTestGenerator.$.Color + "\nColor = "+ UnitTestGenerator.$.Color);
    }
}
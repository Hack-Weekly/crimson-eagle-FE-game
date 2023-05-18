const FEN_Display = {
    $: {
        GivenFEN: "qrknbbnr/pppppppp/8/8/8/8/PPPPPPPP/QRKNBBNR w - - 0 1",
        displayedFEN: "",
    },

    init() {
        FEN_Display.displayedFEN_Equals_GivenFEN()
    },

    /*
    Namespace: FEN_Display\n \ndisplayedFEN_Equals_GivenFEN success \n \n GivenFEN = " + FEN_Display.$.GivenFEN + " \n \n displayedFEN = " + FEN_Display.$.displayedFEN
    */

    displayedFEN_Equals_GivenFEN() {
        if (UnitTestGenerator.$.Color === "red") {

            console.log("Namespace: FEN_Display\n \nMethod: displayedFEN_Equals_GivenFEN failed \n \n data-GivenFEN = " + FEN_Display.$.GivenFEN + " \n \n data-displayedFEN = " + FEN_Display.$.displayedFEN);

        } else if (UnitTestGenerator.$.Color === "green") {

            console.log("Namespace: FEN_Display\n \ndisplayedFEN_Equals_GivenFEN success \n \n GivenFEN = " + FEN_Display.$.GivenFEN + " \n \n displayedFEN = " + FEN_Display.$.displayedFEN)

        }    
    }
};
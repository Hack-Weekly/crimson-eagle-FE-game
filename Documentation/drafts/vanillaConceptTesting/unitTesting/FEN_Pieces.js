const FEN_Pieces = {
    $: {
        GivenFEN: "qrknbbnr/pppppppp/8/8/8/8/PPPPPPPP/QRKNBBNR w - - 0 1",
        FormattedFEN: "",
        Board: [
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
        ],
        CreateFENfromBoard: "",
    },

    init() {
        FEN_Pieces.FENformattedAndBoardPopulatedFromNewFEN()
    },

    /*
    console.log("Namespace: FEN_Pieces\n \FENformattedAndBoardPopulatedFromNewFEN failed \n \n GivenFEN = " + FEN_Pieces.$.GivenFEN + " \n \n FormattedFEN = " + FEN_Pieces.$.FormattedFEN\n \n Board = " + FEN_Pieces.$.GivenFEN)
    */

    FENformattedAndBoardPopulatedFromNewFEN() {
        
        if (UnitTestGenerator.$.Color === "red") {

            FEN_Pieces.$.FormattedFEN = FEN_Pieces.$.GivenFEN.replaceAll(" ","");


            console.log("Namespace: FEN_Pieces\n \FENformattedAndBoardPopulatedFromNewFEN failed \n \n GivenFEN = " + FEN_Pieces.$.GivenFEN + " \n \n FormattedFEN = " + FEN_Pieces.$.FormattedFEN + "\n \n CreateFENfromBoard = " + FEN_Pieces.$.CreateFENfromBoard)
        } else if (UnitTestGenerator.$.Color === "green") {


        }    
    }
};
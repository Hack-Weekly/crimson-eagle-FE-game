

export default function draft_Navbar() {
    return (
        <body>
            <NavBar>
                <div id="navbarHeader" className="collapse text-bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4>About</h4>
                                <p className="text-body-light">
                                    This website was created by Crimson-Eagle, a team from Hack
                                    Weekly, where developers of all skill levels come together to
                                    exercise and learn new skills! This week's project was a game.
                                    Each team is given fourteen days and then a winner is chosen.
                                </p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4>Contact</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="https://discord.gg/ZxfcH4Ku2q" className="text-white">
                                            Join Hack Weekly!
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/Hack-Weekly/crimson-eagle-FE-game/blob/main/Chesslayout_20230516_0001-1.pdf"
                                            className="text-white"
                                        >
                                            WireFrames
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/Hack-Weekly/crimson-eagle-FE-game"
                                            className="text-white"
                                        >
                                            GitHub Repository
                                        </a>
                                    </li>
                                    <li><a href="#" className="text-white"> Project Plan </a></li>
                                    <li><a href="#" className="text-white"> Documentation </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm mb-4">
                    <div className="container">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            <strong>Checkmate in five</strong>
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarHeader"
                            aria-controls="navbarHeader"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </NavBar>
    )
}
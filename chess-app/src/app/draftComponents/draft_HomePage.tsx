

export default function HomePage() {
    return (
        <main id="main">
			<div className="container">
				<h1 className="text-body-emphasis">Compete against other players!</h1>

				<div className="container">
					<div className="row">
						<p className="lead">(No Login Required To Play)</p>

						<div className="col">
							<a href="#login" className="btn btn-primary btn-lg">Login To Play</a>
							<a href="" className="btn btn-outline-primary btn-lg ms-3"
								>Play without account</a
							>
						</div>
					</div>
				</div>
			</div>

			<div className="row g-5 mt-3">
				<div className="col-md-1"></div>
				<div className="col-md-3">
					<h2 className="text-body-emphasis">Account Management</h2>
					<p></p>
					<div className="container">
						<div className="row">
							<div className="col">
								<div className="d-grid">
									<a href="#" className="btn btn-primary btn-lg mt-3"
										>Link Account to Facebook</a
									>
									<br />
									<a href="#" className="btn btn-success btn-lg mt-3"
										>Link Account to Google Account</a
									>
									<br />
									<a href="#" className="btn btn-dark btn-lg mt-3"
										>Link Account to Apple ID</a
									>
									<br />
									<a href="#" className="btn btn-outline-success btn-lg mt-3"
										>Create Account without linking</a
									><br />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<h2 className="text-body-emphasis">News & Events</h2>
					<p className="lead">Read news from the developers or join an event!</p>
					<ul className="list-unstyled ps-0">
						<li>
							<a className="icon-link mb-1" href="#"> Summer Event reveal soon! </a>
						</li>
						<li>
							<a className="icon-link mb-1" href="#">
								Latest Developer Blog Post
							</a>
						</li>
						<li>
							<a className="icon-link mb-1" href="#"> Ladder Standings </a>
						</li>
					</ul>
				</div>

				<div className="col-md-4">
					<h2 className="text-body-emphasis">Tournaments & Standings</h2>
					<p className="lead">Latest competitive standings</p>
					<ul className="list-unstyled ps-0">
						<li>
							<a className="icon-link mb-1" href="#">
								Current Ladder (May 01, 2023 to September 31, 2023)
							</a>
						</li>
						<li>
							<a className="icon-link mb-1" href="#">
								Daily Ladder (Ends in hh:mm:ss)
							</a>
						</li>
						<li>
							<a className="icon-link mb-1" href="#">
								Current Champion: (username here)
							</a>
						</li>
					</ul>
				</div>
			</div>
		</main>
    )
}
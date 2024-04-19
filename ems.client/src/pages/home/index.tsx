import './assets/css/main.css';

const Home: React.FC = () => {
  return (
    <div>
      {/* <!-- Banner --> */}
			<section id="banner">
				<div className="inner">
					<header>
						<h1>Event Management System</h1>
						<p>We make your gatherings remarkable</p>
					</header>
					<a href="#main" className="button big scrolly">Explore Packages</a>
				</div>
			</section>
			{/* <!-- Main --> */}
			<div id="main">
				{/* <!-- Section --> */}
					<section className="wrapper style1"><div className="inner">
							{/* <!-- 2 Columns --> */}
								<div className="flex flex-2">
									<div className="col col1">
										<div className="image round fit">
											<a href="generic.html" className="link"><img src="images/evelina-friman-hw_sKmjb0ns-unsplash.jpg" alt="" width="320" height="320"/></a>
										</div>
									</div>
									<div className="col col2">
										<h3>Welcome to Event Management System.</h3>
										<p>At Event Management System, we're dedicated to simplifying the process of planning and organizing your events. Whether it's a wedding, corporate function, or special celebration, our platform offers everything you need to bring your vision to life.</p>
										<a href="#" className="button">Learn More</a>
									</div>
								</div>
						</div>
					</section>
          {/* <!-- Section --> */}
          <section className="wrapper style2"><div className="inner">
							<div className="flex flex-2">
								<div className="col col2">
									<h3>Discover Our Features</h3>
									<ul>
										<li><p><b>Personalized Event Packages:</b> Customize packages to suit your preferences with ease. Choose from a variety of vendors and services for your perfect event.</p></li>
										<li><p><b>Effortless Booking and Management:</b> Streamline booking, manage your selections seamlessly—all on one platform. </p></li>
										<li><p><b>Vendors:</b> Explore diverse vendor packages for your event needs—from venues to photographers, find your ideal combination.</p></li>
										<li><p><b>Real-Time Updates:</b> Stay informed with instant notifications about bookings and changes, ensuring you're always in control.</p></li>
										<li><p><b>Secure Payment Processing:</b> Complete transactions securely with multiple payment options available.</p></li>
										<li><p><b>Customizable Packages:</b> Tailor event packages to your needs, adjusting vendors and details effortlessly.</p></li>
										<li><p><b>Effortless Booking:</b> Secure your event with just 10% upfront. Manage bookings seamlessly.</p></li>
									</ul>

									<a href="#" className="button">Learn More</a>
								</div>
								<div className="col col1 first">
									<div className="image round fit">
										<a href="generic.html" className="link"><img src="images/vishnu-r-nair-m1WZS5ye404-unsplash.jpg" alt="" width="320" height="320"/></a>
									</div>
								</div>
							</div>
						</div>
					</section>
          {/* <!-- Section --> */}
          <section className="wrapper style1"><div className="inner">
							<header className="align-center"><h2>Aliquam ipsum purus dolor</h2>
								<p>Cras sagittis turpis sit amet est tempus, sit amet consectetur purus tincidunt.</p>
							</header><div className="flex flex-3">
								<div className="col align-center">
									<div className="image round fit">
										<img src="images/pic03.jpg" alt="" width="320" height="320"/></div>
									<p>Sed congue elit malesuada nibh, a varius odio vehicula aliquet. Aliquam consequat, nunc quis sollicitudin aliquet. </p>
									<a href="#" className="button">Learn More</a>
								</div>
								<div className="col align-center">
									<div className="image round fit">
										<img src="images/pic05.jpg" alt="" width="320" height="320"/></div>
									<p>Sed congue elit malesuada nibh, a varius odio vehicula aliquet. Aliquam consequat, nunc quis sollicitudin aliquet. </p>
									<a href="#" className="button">Learn More</a>
								</div>
								<div className="col align-center">
									<div className="image round fit">
										<img src="images/pic04.jpg" alt="" width="320" height="320"/></div>
									<p>Sed congue elit malesuada nibh, a varius odio vehicula aliquet. Aliquam consequat, nunc quis sollicitudin aliquet. </p>
									<a href="#" className="button">Learn More</a>
								</div>
							</div>
						</div>
					</section></div>

		{/* <!-- Footer --> */}
			<footer id="footer"><div className="copyright">
					<ul className="icons"><li><a href="https://x.com/Aman782004?t=LrjidYko2daFlGvTgNEScQ&s=08 " className="icon fa-twitter"><span className="label">Twitter</span></a></li>
						<li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
						<li><a href="https://www.instagram.com/amanbhateriya_7804/" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
						<li><a href="https://www.snapchat.com/add/amanbhateriya7?share_id=iqOSzUGwR2g&locale=en-US " className="icon fa-snapchat"><span className="label">Snapchat</span></a></li>
					</ul></div>
			</footer><div className="copyright">
			Site made with: <a href="https://templated.co/">TEMPLATED.CO</a>
		</div>
		{/* <!-- Scripts --> */}
			<script src="assets/js/jquery.min.js"></script><script src="assets/js/jquery.scrolly.min.js"></script><script src="assets/js/jquery.scrollex.min.js"></script><script src="assets/js/skel.min.js"></script><script src="assets/js/util.js"></script><script src="assets/js/main.js"></script>
      {/* <Box className="content-header">
        <Typography variant="h2" className="heading">
          Dashboard
        </Typography>
      </Box> */}
    </div>
  );
};

export default Home;
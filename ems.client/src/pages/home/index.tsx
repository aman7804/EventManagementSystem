import './assets/css/main.css';
import {
	home_p01,
	home_p02,
	home_p03,
	home_p04,
	home_p05
} from "../../assets/images"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkIsAuthenticated } from 'store/auth/selector';

const Home: React.FC = () => {
	const isAuthenticated = useSelector(checkIsAuthenticated);
	
  return (
		<>
			<title>Event Management System</title>
			<meta charSet="utf-8" />
			<meta
				name="robots"
				content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="stylesheet" href="assets/css/main.css" />
			{/* Header */}
			<header id="header" className="alt">
				<div className="logo">
				<Link to="#">
					EMS <span>by Aman</span>
				</Link>
				</div>
				{!isAuthenticated && (
						<>
							<Link to="/login">Login</Link>
							<Link to="/signup">SignUp</Link>
						</>
					)}
			</header>
			
			{/* Banner */}
			<section id="banner">
				<div className="inner">
				<header>
					<h1>Event Management System</h1>
					<p>
					We make your gatherings remarkable
					<br />
						Our system is a user-friendly platform designed to simplify the organization and coordination of events. 
						Offering a range of features tailored to event planners, it provides tools for every aspect of event management.
						Users can easily book venue, photographers, catering and decoration service for their event to make it memorable. 
						
					</p>
				</header>
				<Link to="#" className="button big scrolly">
					Explore Packages
				</Link>
				</div>
			</section>
			{/* Main */}
			<div id="main">
				{/* Section */}
				<section className="wrapper-home style1">
				<div className="inner">
					{/* 2 Columns */}
					<div className="flex flex-2">
					<div className="col col1">
						<div className="image round fit">
						<Link to="#" className="link">
							<img src={home_p01} alt="" width={320} height={320} />
						</Link>
						</div>
					</div>
					<div className="col col2">
						<h3>Welcome to Event Management System.</h3>
						<p>
							At Event Management System, we're dedicated to simplifying the process of planning and organizing your events. Whether it's a wedding, corporate function, or special celebration, our platform offers everything you need to bring your vision to life.
						</p>
						<Link to="#" className="button">
							Learn More
						</Link>
					</div>
					</div>
				</div>
				</section>
				{/* Section */}
				<section className="wrapper-home style2">
				<div className="inner">
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
						<Link to="#" className="button">
							Learn More
						</Link>
					</div>
					<div className="col col1 first">
						<div className="image round fit">
						<Link to="#" className="link">
							<img src={home_p02} alt="" width={320} height={320} />
						</Link>
						</div>
					</div>
					</div>
				</div>
				</section>
				{/* Section */}
				<section className="wrapper-home style1">
				<div className="inner">
					<header className="align-center">
					<h2>Aliquam ipsum purus dolor</h2>
					<p>
						Cras sagittis turpis sit amet est tempus, sit amet consectetur purus
						tincidunt.
					</p>
					</header>
					<div className="flex flex-3">
					<div className="col align-center">
						<div className="image round fit">
						<img src={home_p03} alt="" width={320} height={320} />
						</div>
						<p>
						Sed congue elit malesuada nibh, a varius odio vehicula aliquet.
						Aliquam consequat, nunc quis sollicitudin aliquet.{" "}
						</p>
						<Link to="#" className="button">
						Learn More
						</Link>
					</div>
					<div className="col align-center">
						<div className="image round fit">
						<img src={home_p05} alt="" width={320} height={320} />
						</div>
						<p>
						Sed congue elit malesuada nibh, a varius odio vehicula aliquet.
						Aliquam consequat, nunc quis sollicitudin aliquet.{" "}
						</p>
						<Link to="#" className="button">
						Learn More
						</Link>
					</div>
					<div className="col align-center">
						<div className="image round fit">
						<img src={home_p04} alt="" width={320} height={320} />
						</div>
						<p>
						Sed congue elit malesuada nibh, a varius odio vehicula aliquet.
						Aliquam consequat, nunc quis sollicitudin aliquet.{" "}
						</p>
						<Link to="#" className="button">
						Learn More
						</Link>
					</div>
					</div>
				</div>
				</section>
			</div>
			{/* Footer */}
			<footer id="footer">
				<div className="copyright">
				<ul className="icons">
					<li>
					<Link to="https://x.com/Aman782004?t=LrjidYko2daFlGvTgNEScQ&s=08" className="icon fa-twitter">
						<span className="label">Twitter</span>
					</Link>
					</li>
					<li>
					<Link to="#" className="icon fa-facebook">
						<span className="label">Facebook</span>
					</Link>
					</li>
					<li>
					<Link to="https://www.instagram.com/amanbhateriya_7804/" className="icon fa-instagram">
						<span className="label">Instagram</span>
					</Link>
					</li>
					<li>
					<Link to="https://www.snapchat.com/add/amanbhateriya7?share_id=iqOSzUGwR2g&locale=en-US" className="icon fa-snapchat">
						<span className="label">Snapchat</span>
					</Link>
					</li>
				</ul>
				</div>
			</footer>
			<div className="copyright">
				Site made with: <Link to="https://templated.co/">TEMPLATED.CO</Link>
			</div>
			{/* Scripts */}
			</>
  );
};

export default Home;
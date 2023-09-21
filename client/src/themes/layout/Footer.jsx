import { useState } from 'react'
import { Link } from "react-router-dom";

import { useTheme } from '../../hooks/UseTheme';

function Footer() {
	const { theme } = useTheme();
	const [selectedTheme] = useState(theme);

	return (
		<footer className="footer mt-auto footer-bg pt-3 pb-0" id="site-footer">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-12 col-sm-6 col-12 col-xl-6"><span>&copy; All rights reserved</span></div>
					<div className="col-12 col-md-12 col-sm-6 col-12 col-xl-6">
						<ul className="list-inline footer-menu-item text-md-start text-xl-end">
							<li className="list-inline-item">
								<Link to={`/support`} className="nav-link text-decoration-underline" title="Contact Us">Contact Us</Link>
							</li>
							{/* {
								selectedTheme?.contactUsLink && <li className="list-inline-item">
									<a href={selectedTheme.contactUsLink} target="_blank" rel="noreferrer">Contact Us</a>
								</li>
							} */}
							{
								selectedTheme?.policyLink && <li className="list-inline-item">
									<a href={selectedTheme.policyLink} target="_blank" rel="noreferrer">Privacy Policy</a>
								</li>
							}
							{
								selectedTheme?.termsLink && <li className="list-inline-item">
									<a href={selectedTheme.termsLink} target="_blank" rel="noreferrer">Terms of Use</a>
								</li>
							}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
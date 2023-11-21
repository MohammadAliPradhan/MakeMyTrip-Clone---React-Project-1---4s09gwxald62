import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <section className='footer-wrapper'>
            <div className="footer">
                <div className="left">
                    <div className="socials">
                        <Link to={"https://github.com/MohammadAliPradhan"}
                            target={'_blank'}>
                            <FontAwesomeIcon icon={faGithub} />

                        </Link>
                        <Link to={"https://www.linkedin.com/in/mohammad-ali-a07957178/"}
                            target={'_blank'}>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div>MakeMyTrip Clone © 2023</div>
                    <div>Created by Mohammad Ali</div>
                </div>
            </div>
            <div className="printWaterMark">MakeMyTrip Clone by Mohammad Ali</div>
        </section>
    )
}

export default Footer

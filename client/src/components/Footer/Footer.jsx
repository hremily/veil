import React from 'react';
import styles from './Footer.module.css';
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.icons}>
          <a href="https://www.linkedin.com/in/emilia-grab-525304321/" target='_blank' rel='noopener noreferrer'><CiLinkedin /></a>
          <a href="https://www.instagram.com/ab_emily_/" target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
          <a href="https://github.com/milunchik" target='_blank' rel='noopener noreferrer'><IoLogoGithub /></a>
        </div>
        <p>Copyright © All rights reserved - 2024</p>
        <p>Built by Grab Emilia</p>
      </div>
    </footer>
  );
};

export default Footer;

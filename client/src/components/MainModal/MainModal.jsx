import React from 'react';
import './MainModal.module.css';

function Modal({ toggleModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={toggleModal}>
                    &times;
                </span>
                <ul>
                    <li>
                        <a href="#logout">
                            <i className="fas fa-sign-out-alt"></i> Log out
                        </a>
                    </li>
                    <li>
                        <a href="#change">
                            <i className="fas fa-user-edit"></i> Change
                        </a>
                    </li>
                    <li>
                        <a href="#darkmode">
                            <i className="fas fa-moon"></i> Dark mode
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Modal;

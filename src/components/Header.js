import { Fragment, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LocaleContext from '../LocaleContext';
import { useTranslation } from "react-i18next";
import i18n from '../i18n';


const Header = () => {
    const { t } = useTranslation();
    const { locale } = useContext(LocaleContext);

    function changeLocale(l) {
        if (locale !== l) {
            i18n.changeLanguage(l);
        }
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                            </li>

                            <NavDropdown title={t('language')} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#" onClick={()=> changeLocale('en')}>English</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={()=> changeLocale('ar')}>العربية</NavDropdown.Item>
                            </NavDropdown>

                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment >

    );
}
export default Header;
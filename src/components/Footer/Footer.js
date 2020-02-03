/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import './Footer.css'

class Header extends React.Component {

  render() {
    return (
      <div>
      {/* Footer Start */}
      <footer className="bg-white">
        <div className="container custom-container">
     
          <div className="row py-3">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="copyright-left">
                <p className="mb-0">@2020 All right reserved.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}
      </div>
    );
  }
}

export default Header;

import PropTypes from "prop-types";

function Header({ children }) {
  return <header>{children}</header>;
}

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;

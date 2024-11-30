import PropTypes from 'prop-types';
const Wrapper = ({children} ) => {
    return(
        <div className = "wrapper">
        {children}
        </div>
    )
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired, // Define 'children' as required and of type 'node'
  };
export default Wrapper;
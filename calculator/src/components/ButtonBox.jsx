import PropTypes from 'prop-types';


const ButtonBox = ( { children}) => {
  return (
    <div className= "button-box">
      {children}
    </div>
  )
}

ButtonBox.propTypes = {
    children: PropTypes.node.isRequired, // Define 'children' as required and of type 'node'
  };

export default ButtonBox

import { createContext, useState} from 'react'
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const calcContext = createContext()

const Calc = ( {children}) => {
    const [calc, setCalc ] = useState({
        sign: "",
        num: 0,
        res: 0,
        operation: '' // New field to track the operation as a string
    });

    const providerValue = {
        calc, setCalc
    }


  return (
    <div>
      <calcContext.Provider value={providerValue}>
      {children}
      </calcContext.Provider>
    </div>
  )
}

Calc.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Calc

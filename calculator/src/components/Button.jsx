import PropTypes from 'prop-types';
import { useContext } from 'react';
import { calcContext } from '../context/calContext';

const getStyle = (btn) => {
  const className = {
    '=': 'equal',
    '+': 'operation',
    '-': 'operation',
    '/': 'operation',
    'x': 'operation',
  };

  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(calcContext);

  const pointClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
      operation: calc.operation + value,
    });
  };

  const resetClick = () => {
    setCalc({ sign: '', num: 0, res: 0, operation: '' });
  };

  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
      operation: calc.operation + ' ' + value + ' ',
    });
  };

  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: '',
      operation: calc.operation + '%',
    });
  };

  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: '',
      operation: calc.operation + '+-',
    });
  };

  const equalClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          'x': (a, b) => a * b,
          '/': (a, b) => a / b,
        };
        return result[sign](a, b);
      };

      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0,
        operation: `${calc.res} ${calc.sign} ${calc.num} =`, // Updated to reflect the full operation
      });
    }
  };

  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;

    if (numberString === '0' && calc.num === 0) {
      numberValue = '0';
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
      operation: calc.operation + numberString, // Update the operation display
    });
  };

  const handleClick = () => {
    const results = {
      '.': pointClick,
      C: resetClick,
      '/': signClick,
      '-': signClick,
      '+': signClick,
     'x': signClick,
      '=': equalClick,
      '%': percentClick,
      '+-': invertClick,
    };

    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <button className={`${getStyle(value)} button`} onClick={handleClick}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Button;

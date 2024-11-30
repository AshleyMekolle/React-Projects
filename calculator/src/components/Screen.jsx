import { useContext } from 'react';
import { calcContext } from '../context/calContext';
import { Textfit } from 'react-textfit';

const Screen = () => {
  const { calc } = useContext(calcContext);

  return (
    <div className="screen-container">
  
      <Textfit className="screen-operation" max={70} mode="single">
        {calc.operation || '0'}
      </Textfit>
      
      <Textfit className="screen-result" max={40} mode="single">
      {calc.num ? calc.num : calc.res}
      </Textfit>
    </div>
  );
};

export default Screen;

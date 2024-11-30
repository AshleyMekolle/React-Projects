
import './App.css'
import Screen from './components/Screen.jsx'
import ButtonBox from './components/ButtonBox.jsx'
import Button from './components/Button.jsx'
import Wrapper from './components/Wrapper.jsx'
import Calc from './context/calContext.jsx'
import Footer from './components/footer.jsx'

function App() {

  const buttonValues = [ 
    [ "C", "+-", "%", "/"],
    [ 7, 8, 9, "x"],
    [ 4, 5, 6, "-"],
    [ 1, 2, 3, "+"],
    [ 0, ".", "="]
  ]

  return (
    <>
    <Calc>
      <Wrapper>
      <Screen/>
      <ButtonBox>
      {buttonValues.flat().map(( btn, i) =>
      <Button 
      value={btn}
      key={i}/>
      )}
      </ButtonBox>
    </Wrapper>
    </Calc>
    <Footer/>
    </>
  )
}

export default App

import { useState, useRef} from 'react'
import circle from '../src/assets/circle.png'
import cross from '../src/assets/cross.png'
import './Tic-tac.css'

let data = ["","","","","","","","",""]
const TicTac = () => {

    let [count, setCount] = useState (0)
    let [ gameOver, setGameOver] = useState(false)
    let title = useRef(null)

   

    let box1 = useRef(null)
    let box2 = useRef(null)
    let box3 = useRef(null)
    let box4 = useRef(null)
    let box5 = useRef(null)
    let box6 = useRef(null)
    let box7 = useRef(null)
    let box8 = useRef(null)
    let box9 = useRef(null)

    let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9]
    const toggle = (e, num) => {
        if(gameOver){
            return 0;
        }
        if(count%2 === 0){
            e.target.innerHTML = `<img src ='${cross}'>`
            data[num] = "x"
            setCount(++count)
        }else{
            e.target.innerHTML = `<img src ='${circle}'>`
            data[num] = "o"
            setCount(++count)
        }
        checkWin()
    }

    const checkWin = () =>{
        if(data[0]=== data[1] && data[1]===data[2] && data[2]!==""){
            win(data[2])
        }else if(data[3]=== data[4] && data[4]===data[5] && data[5]!==""){
            win(data[5])
        }else if(data[6]=== data[7] && data[7]===data[8] && data[8]!==""){ 
            win(data[8])
        }else if(data[0]=== data[3] && data[3]===data[6] && data[6]!==""){
            win(data[6])
        }else if(data[1]=== data[4] && data[4]===data[7] && data[7]!==""){
            win(data[7])
        }else if(data[2]=== data[5] && data[5]===data[8] && data[8]!==""){
            win(data[8])
        }else if(data[0]=== data[4] && data[4]===data[8] && data[8]!==""){
            win(data[8])
        }else if(data[2]=== data[4] && data[4]===data[6] && data[6]!==""){
            win(data[6])
        }
         
        } 

    const win =(winner) =>{
        setGameOver(true)
        if(winner==='x'){
            title.current.innerHTML = `Congratulations <img src="${cross}">`
        }else {
            title.current.innerHTML = `Congratulations <img src="${circle}">`
        }
    }

    const Reset = () =>{
        setGameOver(false)
         data = ["","","","","","","","",""]
        title.current.innerHTML = `Tic Tac <span> Toe </span>`
        box_array.map((e) =>{
            e.current.innerHTML = ""
        })
    }
  return (
    <div className = 'container'>
        <div className="title" ref={title}>Tic Tac  <span> Toe </span> </div>
        <div className='board'>
            <div className="row1">
                <div className="boxes" ref={box1} onClick ={(e) => {toggle(e,0)}}> </div>
                <div className="boxes" ref={box2} onClick ={(e) => {toggle(e,1)}}></div>
                <div className="boxes" ref={box3} onClick ={(e) => {toggle(e,2)}}></div>
            </div>
            <div className="row2">
                <div className="boxes" ref={box4} onClick ={(e) => {toggle(e,3)}}> </div>
                <div className="boxes" ref={box5} onClick ={(e) => {toggle(e,4)}}></div>
                <div className="boxes" ref={box6} onClick ={(e) => {toggle(e,5)}}></div>
            </div>
            <div className="row3">
                <div className="boxes" ref={box7} onClick ={(e) => {toggle(e,6)}}> </div>
                <div className="boxes" ref={box8} onClick ={(e) => {toggle(e,7)}}></div>
                <div className="boxes" ref={box9} onClick ={(e) => {toggle(e,8)}}></div>
            </div>

        </div>
      
      <button className="reset" onClick={() =>{Reset()}}>Reset</button>
      
    </div>
  )
}

export default TicTac
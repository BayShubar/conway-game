import React from 'react'
import Holder from './Holder'
import Controller from './Controller'

class App extends React.Component{
    constructor(props){
        super(props)
        this.speed = 250;
        this.rows = 50;
        this.cols = 70;
        this.pencilActive = false;
        this.state = {
            generation: 0,
            holderArray: Array(this.rows).fill().map(()=>Array(this.cols).fill(false))
        }
    }
//##########################PREPROSESSORS################################

playBtn = () =>{
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this._engine, this.speed);
}
stopBtn = () =>{
    clearInterval(this.intervalId);
}

clearBtn = () =>{
    this.stopBtn();
    let emptyHolder = Array(this.rows).fill().map(()=>Array(this.cols).fill(false))
    this.setState({
        holderArray: emptyHolder,
        generation: 0,
    })
}
toPencilActivate = ()=>{
    this.pencilActive = !this.pencilActive;
    console.log('activated', this.pencilActive)
    this.clearBtn()
}

//##########################PLAY################################
    selectCell = (row, col)=>{
        let temArray = arrayClone(this.state.holderArray) 
        temArray[row][col] = !temArray[row][col];
        this.setState({holderArray: temArray})
    }

    _engine = ()=>{
        let original = this.state.holderArray;
        let copy = arrayClone(this.state.holderArray);
        for(let i = 0; i<this.rows; i++){
            for(let j = 0; j<this.cols; j++){
                let counter = 0;
                    
                //this will check top left diogonal cell
                if (i > 0 && j > 0) 
                    if (original[i - 1][j - 1]) counter++;

                //this will check top right diogonal cell
                if (i > 0 && j < this.cols - 1) 
                    if (original[i - 1][j + 1]) counter++;

                //this will check top cell
                if (i > 0) 
                    if (original[i - 1][j]) counter++;
                
                //this will check bottom cell
                if (i < this.rows - 1) 
                    if (original[i + 1][j]) counter++;

                //this will check right cell 
                if (j < this.cols - 1) 
                    if (original[i][j + 1]) counter++;

                //this will check left cell
                if (j > 0) 
                    if (original[i][j - 1]) counter++;
                
                // this will check bottom left cell
                if (i < this.rows - 1 && j > 0) 
                    if (original[i + 1][j - 1]) counter++;
                
                // this will check bottom right cell
                if (i < this.rows - 1 && this.cols - 1) 
                    if (original[i + 1][j + 1]) counter++;

                //if overpopulated or life not enough then it will die
                if (original[i][j] && (counter < 2 || counter > 3)) 
                    copy[i][j] = false;
                    
                //new life will be revive
                if (!original[i][j] && counter === 3) 
                    copy[i][j] = true;
                console.log('engine inside')
            }
        }
        this.setState({
            holderArray: copy,
            generation: this.state.generation+1
        })
    }
//##########################RENDERING################################
    render(){
        return(
            <div className = 'main'>
                <div className='left'>
                    <Holder
                    holderArray = {this.state.holderArray}
                    rows = {this.rows}
                    cols = {this.cols}
                    selectCell = {this.selectCell}
                    pencilActive = {this.pencilActive}
                    />
                </div>
                <div className='right'>
                    <Controller
                    playBtn = {this.playBtn}
                    stopBtn = {this.stopBtn}
                    clearBtn = {this.clearBtn}
                    generation = {this.state.generation}
                    toPencilActivate = {this.toPencilActivate}
                    />
                </div>
            </div>
        )
    }
}

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

export default App;
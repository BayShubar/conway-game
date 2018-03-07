import React from 'react'
import Cell from './Cell'

class Holder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        const width = this.props.cols*0.61+'em';
        let holderArray = []
        let cellClass = ''
        for(let i = 0; i< this.props.rows; i++){
            for(let j = 0; j< this.props.cols; j++){ 
                let cellKey = i+'-'+j;
                cellClass = (this.props.holderArray[i][j])? 'cell on':'cell off';
                holderArray.push(
                    <Cell
                        cellClass = {cellClass}
                        key = {cellKey}
                        cellId = {cellKey}
                        row = {i}
                        col = {j}
                        selectCell = {this.props.selectCell}
                        pencilActive = {this.props.pencilActive}
                    />
                )
             }
        }

        return(
            <div className = 'holder' style = {{width: width}}>
                {
                    holderArray
                }
            </div>
        )
    }
}

export default Holder;
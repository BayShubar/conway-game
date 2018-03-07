import React from 'react'

class Controller extends React.Component{
    render(){
        return(
            <div>
                <h3>Generation: {this.props.generation}</h3><hr/>
                <button className='btn' onClick={()=>{this.props.playBtn()}}>PLAY</button>
                <button className='btn' onClick={()=>{this.props.stopBtn()}}>STOP</button>
                <button className='btn' onClick={()=>{this.props.clearBtn()}}>CLEAR</button>
                <h3>Pencil to activate</h3><hr/>
                <input type="checkbox" className = 'checkbox' onChange = {this.props.toPencilActivate}/>
            </div>
        )
    }
}
export default Controller;
import React,{Component} from 'react';
export default class CSVSelector extends Component{
    constructor(props){
        super(props)
        this.state= {
            csvPath : '',
            data : '',
        }
        this.onChangeState.bind(this);
    }
    onChangeState(event){
        if (event.target.name == 'csvPath'){
            var fileext= event.target.value.slice(event.target.value.indexOf(".")+1).toLowerCase();
            if(fileext == "csv"){
                this.setState({ 
                    csvPath : event.target.value
                });
            }
            else{
                alert('File is Not CSV');
            }
        }
           
        
    }
    

    render(){
        return(
            <div>
                <input id="CSVLoader" type='file' name='csvPath' onChange={this.onChangeState.bind(this)} ></input>
                
                <button id="loadButton" onClick ={this.handleloadCSV} value="Load CSV"></button>
            </div>
        )

    }
    
}
import React,{Component} from 'react';
import Papa from 'papaparse';
import '../css/loadCSV.css'
export default class CSVSelector extends Component{
    constructor(props){
        super(props)
        this.state= {
            csvPath : '',
            data : '',
        }
        this.onChangeState.bind(this);
        this.handleloadCSV.bind(this);
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
    handleloadCSV(event){
        if(this.state.csvPath.length > 1){
            let path = this.state.csvPath
            Papa.parse(path, {
                complete: function(results) {
                    console.log("Finished:", results.data);
                    this.setState({
                        data : results.data
                    })
                }
            });   
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
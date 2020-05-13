import React,{Component} from 'react';
import Papa from 'papaparse';
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
    handleloadCSV(event){
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

    render(){
        return(
            <div>
                <input type='file' name='csvPath' onChange={this.onChangeState.bind(this)} ></input>
                {this.state.csvPath}<br/>
                <button onClick ={this.handleloadCSV} value="Load CSV"></button>
            </div>
        )

    }
    
}
import React ,{Component} from 'react';
import * as d3 from "d3";

export default class lossChart extends Component{
    constructor(props){
        super(props);
        this.drawChart = this.drawChart.bind(this);
    }
    componentDidMount(){
        this.drawChart();
    }
    drawChart(){
        const data = this.props.data;
        const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
  
        svg.append("g")
            .call(xAxis);
    
        svg.append("g")
            .call(yAxis);
    
        svg.append("g")
            .call(grid);
    
        const colorId = DOM.uid("color");
    
        svg.append("linearGradient")
            .attr("id", colorId.id)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("x2", width)
        .selectAll("stop")
        .data(data)
        .join("stop")
            .attr("offset", d => x(d.date) / width)
            .attr("stop-color", d => color(d.condition));
    
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colorId)
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);
    
        return svg.node();   
     }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}
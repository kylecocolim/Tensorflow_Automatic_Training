import React, { useState } from 'react';


function DataSelector(props){

    const [checked , setChecked] = useState(true)
    function Selected(event){
        event.preventDefault();
        props.dataChanger(event.currentTarget.getAttribute('name'))
        console.log(event.currentTarget.getAttribute('name'))
        if(event.currentTarget.getAttribute('name') === 'loss'){
            if(checked===false){
                setChecked(true)
            }
        }
        else if(event.currentTarget.getAttribute('name') =='accuracy'){
            if(checked===true){
                setChecked(false)
            }
        }
    }
    let check_Box_Style={
        backgroundColor : props.selectedStroke
    }
    let uncheck_Box_Style={
        backgroundColor : "transparent"
    }
    return (
        <div className="DataSelector">
            <div className="DataSelectorBox" style = { checked ? check_Box_Style : uncheck_Box_Style } onClick={Selected} name="loss">Loss</div>
            <div className="DataSelectorBox" style = { checked ? uncheck_Box_Style : check_Box_Style } onClick={Selected} name="accuracy">Accuracy</div>
        </div>
    )
}
export default DataSelector;
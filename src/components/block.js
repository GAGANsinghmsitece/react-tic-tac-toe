import React from 'react';

class Block extends React.Component{
	
	render(){
		var value=this.props.value;
		return(
			<button className={value==="x"? "blocks":"blocks counter-color"} value={this.props.value} onClick={this.props.onClick}>
				{this.props.value}
			</button>
			);
	}
}

export default Block;
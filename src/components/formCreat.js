import React from 'react';

export const formCreate = WrappedComponent => class extends React.Component {
    
    constructor(){
		super();
		this.state={fields:{}}
	}
 
	onChange = key => e =>{
		const { fields } = this.state;
		fields[key] = e.target.value;
		this.setState({
			fields,
		});
	}
 
	handleSubmit=()=>this.state.fields
 
	getField = fieldName =>{
		return {
			onChange:this.onChange(fieldName)
		}
	}
 
	render(){
		const props = {
			...this.props,
			getVal:this.handleSubmit,
			setval:this.getField,
		}
 
		return(<WrappedComponent {...props}/>)
	}

};
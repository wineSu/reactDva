import React from 'react';

export const formCreate = WrappedComponent => class extends React.Component {
    state = { 
        fields: {} 
    };

    onChange = key => e =>{
        this.setFieldValue(key, e.target.value)
	}
    
    setFieldValue = (fieldName, value) => this.setState(state => {
        state.fields[fieldName] = value;
        return state;
    })

    getFieldValue = () => this.state.fields;
    
    getField = fieldName =>{
		return {
            onChange:this.onChange(fieldName),
            value: this.state.fields[fieldName] ||''
		}
	}
    
    setInitialValue = (fieldName, value) => this.setFieldValue(fieldName, value);
    
    render() {
        const props = {
            ...this.props,
            getField: this.getField,
            getFieldValue: this.getFieldValue,
            setFieldValue: this.setFieldValue,
            setInitialValue: this.setInitialValue,
        };
        return <WrappedComponent {...props} ref={ref => this.instanceComponent = ref} />;
    }
};
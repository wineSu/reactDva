import React from 'react';
 
export default class Item extends React.Component {
    form = this.props.children._owner.stateNode.props;
    
    componentDidMount() {
        this.updateInitialValue();
    }
    
    componentDidUpdate() {
        this.updateInitialValue();
    }
    
    updateInitialValue() {
        let { fieldName, initialValue } = this.props;
        (this.initialValue !== initialValue) &&
        (this.initialValue = initialValue) &&
        this.form.setInitialValue(fieldName, initialValue);
    }
    
    render() {
        let { title, fieldName } = this.props;
        return(
            <div>
                <div>{title}</div>
                {/* 通过 React.cloneElement 向子组件传递 state 及 function */}
                {React.cloneElement(this.props.children, { ...this.form.getField(fieldName) })}
            </div>
        )
    }
}
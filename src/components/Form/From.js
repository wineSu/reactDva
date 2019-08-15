import React from 'react';
import Item from './fileitem';
import { formCreate } from './creat';

class Form extends React.Component {
    static formCreate = formCreate
    static Item = Item
    render() {
        return(
            <form>
                {this.props.children}
            </form>
        )
    }
}
export default Form;
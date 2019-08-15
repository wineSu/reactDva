import { connect } from 'dva'
import { Breadcrumb } from 'antd'

function Bar(props) {
    const {bar} = props;
    console.log('面包组件渲染....')
    return (
            <div>
                {
                    bar ? <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>{bar.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{bar.nextname}</Breadcrumb.Item>
                        </Breadcrumb> : ""
                }
            </div>
    );
}
export default connect(({nav} ) => ({
    bar: nav.bar
}))(Bar)


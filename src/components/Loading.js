import ReactDOM from "react-dom"
import { Spin } from 'antd'

const Loading = {
    loadingCount: 0,
    /**
     * 显示loading框
     * @return {[type]}
     */
    show() {
        if (this.loadingCount <= 0) {
            ReactDOM.render(
                <Spin size="large"></Spin>,
                document.getElementById("loading")
            );
        }
        this.loadingCount++;
    },
    /**
     * 隐藏loading框
     * @return {[type]}
     */
    hide() {
        if (this.loadingCount === 0) return;
        this.loadingCount--;
        if (this.loadingCount === 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
        }
    },
}

export default Loading
import React from 'react';
import { connect } from 'dva';
import { List, Avatar, Icon } from 'antd';

function IndexPage(props) {
    const listData = [
      {
        title: `电话拨打失败`,
        index: 1,
        description: "部分情况拨打失败"
      },
      {
        title: `导入数据失败`,
        index: 2,
        description: "导入数据失败，格式或模板文件下载失败"
      },
      {
        title: `场景关键词无法匹配`,
        index: 3,
        description: "场景配置的关键词，没有完全匹配，导致通话主题不正确"
      }
    ];
    
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    
    return (
      <List
        itemLayout="vertical"
        size="large"
        className="contentWrap"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
            ]}
          >
            <List.Item.Meta
              avatar={ <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{item.index}</Avatar>}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
}
export default connect()(IndexPage);
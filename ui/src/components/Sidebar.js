import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, QqOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';
import { click } from '@testing-library/user-event/dist/click';

const { SubMenu } = Menu;

class Sidebar extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    
    
    handleClick = e => {
        console.log('click', e);
        
    
    };

    clickHandler = e =>{
        // console.log(e);
        this.props.onDashboardSelect(e);
        
    }

    render() {
        const data = [{
            "project": "Debit",
            "workbooks": [{
                    "wbid": "5ce69cc3-da3d-4293-84ce-56d4c7b2f4cd",
                    "wbname": "Test Javascript",
                    "wburl": "Daily-TestJavascript",
                    "views": [{
                            "id": "8c1cc261-5140-4af1-901b-c09ce319be03",
                            "name": "Bar Charts",
                            "daily_url": "https://dbi-app03.databrains.com/t/Fiserv/views/Daily-TestJavascript/BarCharts",
                            "monthly_url": "https://dbi-app03.databrains.com/t/Fiserv/views/Monthly-TestJavascript/BarCharts",
                            "url": ""
                        }, {
                            "id": "52272f75-ce2a-4a9b-b6c2-bfe39cac479e",
                            "name": "Line Charts",
                            "url": "https://dbi-app03.databrains.com/t/Fiserv/views/Daily-TestJavascript/LineCharts",
                            "daily_url": "",
                            "monthly_url": "",
                        }
                    ]
                }
            ]
        }
    ]

    return (
      <Menu
        // onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >

        {data.map((project)=>
            <SubMenu icon={ <QqOutlined /> } title={project.project}>
                {project.workbooks.map((workbooks)=>
                <SubMenu title={workbooks.wbname}>
                    {workbooks.views.map((view)=>
                    <Menu.Item key={view.id} onClick={ () =>this.clickHandler({daily_url: view.daily_url, url: view.url, monthly_url:view.monthly_url}) } >
                        {view.name}
                    </Menu.Item>
                    )}
                </SubMenu>
                
                )}
            </SubMenu>
            

        )
        };
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title={data[0].project}>
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title={data[1].project}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu> */}
        {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    );
  }
}

export default Sidebar;
// ReactDOM.render(<Sidebar />, mountNode);
import { PageHeader } from 'antd';
import reactDom from 'react-dom';
import react from 'react';
import './TopNav.css'
import React, { useState } from 'react';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { Button, Radio } from 'antd';


const { RangePicker } = DatePicker;
const { Option } = Select;
function onSearch(val) {
console.log('search:', val);
}

function TopNav(props) {

    const [dateType, setDateType] = useState('Monthly');
    const [displayMonthly, setMonthly] = useState()
    const [displayDaily, setDaily] = useState('date-picker')
    const [date, setDate] = useState()
    const [timeFrame, setTimeFrame] = useState("Monthly")

    function dateOnChange(value) {
      setDate(value);
    }
    
    const radioOnChange = e => {
        console.log('radio checked', e.target.value);
        setDateType(e.target.value);
        let date_radio = e.target.value;
        if (date_radio === 'Monthly')  {
            setDaily('date-picker')
            setMonthly()
            setTimeFrame('Monthly')
        } else {
            setDaily()
            setMonthly('date-picker')
            setTimeFrame('Daily')
        }
      };

    const submitClick = () =>{
        let user_date = `${date}`;
        if (user_date.includes(',')){
            let start_date = new Date(`${date[0]}`);
            console.log(start_date)
            let start_date_str = `${start_date.getMonth() + 1}/${start_date.getDate()}/${start_date.getFullYear()}`;
            let end_date = new Date(`${date[1]}`)
            console.log(end_date);
            let end_date_str = `${end_date.getMonth() + 1}/${end_date.getDate()}/${end_date.getFullYear()}`;
            props.onDateSubmit({ timeSpan :timeFrame,"date":[start_date, end_date]})
        } else {
            let d = new Date(user_date)
            let d_form = `${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`
            props.onDateSubmit({ timeSpan :timeFrame,"date":d_form});  
        }

        // console.log(d_form)
        
        // onDateSubmit is a function from App.js
       
    };
return (

        <PageHeader
        //   className="site-page-header"
        //   onBack={() => null}
          title="Main"
          subTitle="For Demo Purposes Only"
          extra={[
                <Radio.Group id="radio-grp" value={ dateType } onChange={radioOnChange}>
                    <Radio value={ 'Monthly' }>Monthly</Radio>
                    <Radio value={ 'Daily' }>Daily</Radio>
                </Radio.Group>,
                <Space direction="horizontal" size={12}>
                    <RangePicker id="Daily" className={displayDaily} onChange={dateOnChange} />
                    <DatePicker id="Monthly" className={displayMonthly} onChange={dateOnChange} picker="month" />
                    <Button type="primary" onClick={ submitClick }>Submit</Button>
                </Space>
          ]}
        >
        </PageHeader>
        )
};

export default TopNav;

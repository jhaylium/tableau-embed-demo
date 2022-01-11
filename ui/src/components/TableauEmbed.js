import React, { PureComponent, useRef, useEffect, Component} from 'react'
import PropTypes from 'prop-types'
import { Layout, Content, Row, Col } from 'antd';
import { render } from '@testing-library/react';
import { tab } from '@testing-library/user-event/dist/tab';

const { tableau } = window;
let viz;
const options = {
    hideTabs: true,
    hideToolbar: true,
    device: 'desktop'
};

class TableauEmbed extends Component {
    constructor(props){
        super(props)
        console.log(props)
    }

    componentDidMount() {
        if (viz) {
            viz.dispose()
        }
        this.initViz(options)
    };

    componentDidUpdate(prevProps) {
        if (prevProps.url !== this.props.url){
            console.log('url_change');
            console.log(`Previous Url: ${prevProps.url}`)
            console.log(`New Url: ${this.props.url}`)
            if (viz) {
                console.log(viz)
                console.log(this.props.timeFrame)
                viz.dispose()
            }
            if (this.props.timeFrame.includes('Monthly')) {
                options['Chosen Month'] = this.props.date;
            } else if (this.props.timeFrame.includes('Daily')){
                options['Start Date'] = this.props.date[0];
                options['End Date'] = this.props.date[1];
            }
            this.initViz(options)
        } else if (prevProps.date !== this.props.date){
            console.log('dates changed')
            this.filterViz()
        }


    };

    initViz (opt) {
        const {date, url, timeFrame} = this.props;
        const vizContainer = this.vizContainer;
        console.log(opt)
        console.log(`Init Url ${url}`)
        viz = new tableau.Viz(vizContainer, url, opt)
    }

    filterViz() {
        const {date, url, timeframe} = this.props;
        if (viz && viz.getWorkbook()) {
            const wb = viz.getWorkbook();
            // console.log(wb)
            if (Array.isArray(date)){
                console.log('Daily Selected')
                wb.changeParameterValueAsync("Start Date", date[0])
                wb.changeParameterValueAsync("End Date", date[1])
            } else {
                // sheet.applyFilterAsync("Filter Monthly", "False", tableau.FilterUpdateType.REPLACE)
                wb.changeParameterValueAsync("Chosen Month", date)
                console.log('month selected')
            }
        }
        
    }

    render () {
        return (
                <div ref={ (div)=> {this.vizContainer = div }}/>
        )
    }
}

export default TableauEmbed;



import React, { Component } from 'react';
import { Row, Col, Layout, message } from 'antd';
import FlipMove from 'react-flip-move';
import SunLayout from '../Layout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { OverviewSocket, clientDisconnect } from '../Sockets';
import AnimationCount from 'react-count-animation';
import 'react-count-animation/dist/count.min.css';
import moment from 'moment';

const { Content } = Layout;

let datas = [];

class Overview extends Component {
  constructor(props) {
    super(props);
    clientDisconnect();
    this.state = { data: null, noUpdates: false, hasData: false };
    this.updateData = this.updateData.bind(this);
    this.onFilterUpdate = this.onFilterUpdate.bind(this);
    this.filters = {
      timeRange: 15,
      product: 'All',
      Country: 'All',
    };
    this.setState({
      tableHeaderMessage: this.findTableHeaderMessage(this.filters.timeRange),
    });
    this.overviewSocketObj = OverviewSocket(this.updateData);
    setInterval(function() {
      datas.sort(function() {
        return 0.5 - Math.random();
      });
    }, 5000);
  }

  componentDidMount() {
    this.setState({
      loading: true,
      data: null,
    });
    this.overviewSocketObj.initialize(this.filters);
    this.overviewSocketObj.listen();
  }

  updateData(dataw) {
    // console.log(dataw);
    if (!dataw) {
      this.setState({
        noUpdates: true,
        loading: false,
      });
      return;
    }
    const updatedData = JSON.parse(dataw);
    if (updatedData.error) {
      this.setState({
        noUpdates: true,
        loading: false,
      });
      return;
    }
    this.setState({
      loading: false,
      data: updatedData,
      tableHeaderMessage: this.findTableHeaderMessage(this.filters.timeRange),
      pageViewsPerVisitorTodaySettings: {
        start: this.state.data
          ? parseFloat(this.state.data.kpiInfo[1].pageViewsPerVisitorToday)
          : 0,
        count: updatedData
          ? updatedData.kpiInfo[1].pageViewsPerVisitorToday
          : 0,
        duration: 3000,
        decimals: 2,
        useGroup: true,
        animation: 'up',
      },
      pageViewsTodaySettings: {
        start: this.state.data ? this.state.data.kpiInfo[0].pageViewsToday : 0,
        count: updatedData ? updatedData.kpiInfo[0].pageViewsToday : 0,
        duration: 3000,
        useGroup: true,
        animation: 'up',
      },
      hasData: true,
    });
  }

  findTableHeaderMessage(timeRange) {
    timeRange = parseInt(timeRange);
    if (timeRange === 1440) {
      return ' in the Past 24 Hours';
    } else if (timeRange === 60) {
      return ' in the Past 1 Hour';
    } else if (timeRange === 'today') {
      return ' of Today';
    } else {
      return ' in the Past ' + timeRange + ' Minutes';
    }
  }

  onFilterUpdate(filterValue) {
    // console.log(filterValue);
    this.setState({
      loading: true,
    });
    this.filters = filterValue;
    if (this.filters.timeRange === 'today') {
      delete this.filters.timeRange;
    }
    this.overviewSocketObj.reload(this.filters);
  }

  addSectionClass(articles) {
    var sectionClass = {
      Sport: 'sport',
      'TV & Showbiz': 'showbiz',
      News: 'news',
      Living: 'living',
      Motors: 'motors',
      Travel: 'travel',
      Money: 'money',
      Tech: 'tech',
      Fabulous: 'fabulous',
    };
    return articles.map(function(ele) {
      ele.sectionGroup = ele.sectionGroup.replace(/&amp;/g, '&');
      ele.sectionClass = sectionClass[ele.sectionGroup]
        ? sectionClass[ele.sectionGroup]
        : 'other';
      return ele;
    });
  }

  tickFormatter(tick) {
    return moment(tick).format('HH:mm');
  }

  render() {
    if (!this.state.data) {
      return (
        <div>
          <SunLayout
            onFilterUpdate={this.onFilterUpdate}
            page={this.props}
            filters={this.filters}
          />
          <Content className="loader" />
        </div>
      );
    }

    if (this.state.noUpdates) {
      message.error('Somethings wrong, INCA unable to fetch updates', 5);
    }

    if (this.state.loading) {
      message.loading('INCA fetching data..', 0);
    }
    if (!this.state.loading) {
      message.destroy();
    }

    this.state.data.articlesInfo = this.addSectionClass(
      this.state.data.articlesInfo
    );
    return (
      <div>
        <SunLayout
          onFilterUpdate={this.onFilterUpdate}
          page={this.props}
          filters={this.filters}
        />
        <Content>
          <Row type="flex">
            <Col className="sd-overview-kpi">
              <Row className="flex">
                <Col className="sd-kpi-box">
                  <div className="sd-kpi-metric-value sd-numerics">
                    <AnimationCount {...this.state.pageViewsTodaySettings} />
                  </div>
                  <div className="sd-kpi-metric-name">Total Page Views</div>
                </Col>
                <Col className="sd-kpi-box">
                  <div className="sd-kpi-metric-value sd-numerics">
                    <AnimationCount
                      {...this.state.pageViewsPerVisitorTodaySettings}
                    />
                  </div>
                  <div className="sd-kpi-metric-name">Page Views Per Visit</div>
                </Col>
              </Row>
              <Row className="sd-overview-chart">
                <Col>
                  <h2 className="sd-main-title">Traffic Today</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      width={500}
                      height={400}
                      data={this.state.data.trendInfo}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="time.value"
                        axisLine={false}
                        tickMargin={10}
                        tickCount={6}
                        tickSize={6}
                        tickLine={false}
                        tickFormatter={this.tickFormatter}
                      />
                      <YAxis
                        axisLine={false}
                        mirror
                        tickLine={false}
                        tick={{ position: 'relative', top: '-10px' }}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="today"
                        dot={false}
                        stroke="#519fed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
            </Col>
            <Col className="sd-overview-table">
              <Row>
                <div className="flex sd-table-head">
                  <div className="sd-table-article">
                    Top Articles {this.state.tableHeaderMessage}
                  </div>
                  <div className="sd-table-views text-right">Views</div>
                </div>
              </Row>
              <Row>
                <FlipMove
                  enterAnimation="accordionVertical"
                  leaveAnimation="accordionVertical"
                  duration={750}
                  easing="ease-out"
                >
                  {this.state.data.articlesInfo.map((article, index) => (
                    // datas.map(article => (
                    <div className="sd-row" key={parseInt(article.articleid)}>
                      <div className="flex sd-table-row">
                        <div className="sd-table-article">
                          <div className="flex">
                            <div
                              className="sd-article-thumb"
                              style={{
                                backgroundImage: 'url(' + article.image + ')',
                              }}
                            />
                            <div className="sd-article-cont">
                              <div className="sd-article-title">
                                <div className="sd-ellipsed">
                                  {article.articleName}
                                </div>
                              </div>
                              <div className="flex">
                                <div className="article-id sd-ellipsed numerics sd-article-id">
                                  {article.articleid}
                                </div>
                                <div
                                  className={`sd-table-section sd-ellipsed ${article.sectionClass.replace(
                                    /&amp;/g,
                                    '&'
                                  )}`}
                                >
                                  {article.sectionGroup.replace(/&amp;/g, '&')}
                                </div>
                                <div className="sd-published-date sd-ellipsed">
                                  {article.article_age_hour} Hours
                                </div>
                                <div className="sd-author-name sd-ellipsed">
                                  {article.author}
                                </div>
                                <a
                                  href={article.url}
                                  target="_blank "
                                  className="external-link "
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sd-table-views">
                          <div className="sd-numerics">
                            {parseInt(
                              article.current_viewcount
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </FlipMove>
              </Row>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default Overview;

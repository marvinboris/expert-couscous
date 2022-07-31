import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Components
import Error from '../../../../components/Messages/Error';
import Feedback from '../../../../components/Messages/Feedback';

import PageTitle from '../../../../components/Backend/UI/Title/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Title/Breadcrumb';

import OwlCarousel from '../../../../components/UI/OwlCarousel';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import Card from './Card';
import GeneralReportTracker from './GeneralReportTracker';

import { getDashboard, resetDashboard } from '../../../../store/actions/backend/dashboard';

import './Dashboard.scss';

class Dashboard extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            auth: { role },
            content: {
                cms: {
                    pages: { backend: { pages: { dashboard: { [role]: { icon, title, subtitle, blocks, general_report } } } } }
                }
            },
            backend: { dashboard: { loading, error, message, blocksData, generalReport, generalReportTrackerData } },
        } = this.props;

        let content = null;
        const errors = <Error err={error} />;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        if (loading || !blocksData) content = <Col xs={12}>
            <Preloader />
        </Col>;
        else {
            const cardsContent = [
                {
                    title: blocks.services,
                    color: 'primary',
                    value: <span className='text-700 text-22'>{blocksData.services}</span>,
                    addon: <i className='fas fa-concierge-bell text-31 text-primary' />,
                },
                {
                    title: blocks.publications,
                    color: 'red',
                    value: <span className='text-700 text-22'>{blocksData.publications}</span>,
                    addon: <i className='fas fa-newspaper text-31 text-red' />,
                },
                {
                    title: blocks.subscribers,
                    color: 'green',
                    value: <span className='text-700 text-22'>{blocksData.subscribers}</span>,
                    addon: <i className='fas fa-user text-31 text-green' />,
                },
            ].map((card, index) => <Card key={index} {...card} />);

            content = <div className='content'>
                {errors}
                {flash}
                {feedback}

                <div className='blocks'>
                    <Row className='d-none d-md-flex mb-5'>
                        {cardsContent}
                    </Row>

                    <div className='d-md-none'>
                        <OwlCarousel options={{
                            items: 1,
                            center: false,
                            loop: true,
                            dots: true,
                        }}>
                            {cardsContent}
                        </OwlCarousel>
                    </div>
                </div>

                <section className='general-report shadow'>
                    <div className='icon'><i className='far fa-chart-bar' /></div>

                    <div className='flex-fill'>
                        <div className='header'>
                            <div>
                                <div className='title'>{general_report.title}<i className='fas fa-info-circle' /></div>

                                <div className='subtitle'>{general_report.subtitle}</div>

                                <div className='blue-line' />
                            </div>
                        </div>

                        <div className='body'>
                            <div className='row align-items-center'>
                                <div className='col-lg-4'>
                                    <div className='total-sessions'>
                                        <div className='text'>{general_report.total_sessions}</div>

                                        <div className='value'>{generalReport.sessions}</div>
                                    </div>

                                    <div className='total-publications'>
                                        <div className='text'>{general_report.total_publications}</div>

                                        <div className='value'>{generalReport.publications}</div>
                                    </div>
                                </div>

                                <div className='general-report-tracker col-lg-8'>
                                    <GeneralReportTracker data={generalReportTrackerData} cms={general_report} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>;
        }

        return <div className='Dashboard'>
            <PageTitle title={title} subtitle={subtitle} icon={icon}>
                <Breadcrumb main={title} />
            </PageTitle>

            {content}
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getDashboard()),
    reset: () => dispatch(resetDashboard()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
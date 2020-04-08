import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import Navigation from '../../components/navigation';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        const { items } = this.props.news;

        return (
            <div className="page news-page">
                <Navigation
                    backbutton
                    />
                <div className="news-page__content">
                    <h1 className="title yellow">
                        NewsPage
                    </h1>
                    {
                        JSON.stringify(items)
                    }
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

export default connect(
    state => {
        return {
            news: state.news,
        };
    }, mapDispatchToProps
)(NewsPage);
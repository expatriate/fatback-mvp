import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import Navigation from '../../components/navigation';
import NewsItem from '../../components/news-item';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: []
        };
    }

    render() {

        const { items } = this.props.news;

        return (
            <div className="page news-page">
                <div className="news-page__content">
                    <h1 className="title">
                        Лента
                    </h1>
                    {
                        items && items.data && items.data.map(news => {
                            return(<NewsItem key={`ni_${news.id}`} item={news} />);
                        })
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
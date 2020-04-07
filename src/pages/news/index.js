import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from '../../components/navigation';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="page test-page">
                <Navigation
                    backbutton
                    />
                <div className="test-page__content">
                    <h1 className="title yellow">
                        NewsPage
                    </h1>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
};

const connectedTestPage = connect(mapState, actionCreators)(NewsPage);
export { connectedTestPage as NewsPage };
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from '../../components/navigation';

class CoachesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="page coaches-page">
                <Navigation
                    backbutton
                    title="Меню"
                />
                <div className="test-page__content">
                    <h1 className="title yellow">
                        CoachesPage
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

const connectedTestPage = connect(mapState, actionCreators)(CoachesPage);
export { connectedTestPage as CoachesPage };
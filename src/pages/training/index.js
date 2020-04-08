import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Swiper from 'react-id-swiper';

import Navigation from '../../components/navigation';

class TrainingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount() {
        console.log(this.props.match.params)
    }

    render() {

        const { items, groups } = this.props.trainings;

        return (
            <div className="page training-page">
             DETAIL PAGE
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
            trainings: state.trainings,
        };
    }, mapDispatchToProps
)(TrainingPage);

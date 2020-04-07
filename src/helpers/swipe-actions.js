class SwipeActions {
    constructor() {

        this.xDown = null;
        this.yDonn = null;
        this.actions = {
            up: [],
            down: [],
            left: [],
            right: []
        }

        this.init();
    }

    init() {
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), false);
    }

    getTouches(e) {
        return e.touches
    }

    handleTouchStart(e) {
        const firstTouch = this.getTouches(e)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    }

    handleTouchMove(e) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = this.xDown - xUp;
        var yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                this.actions.left.map(f => f());
            } else {
                this.actions.right.map(f => f());
            }                       
        } else {
            if ( yDiff > 0 ) {
                this.actions.up.map(f => f());
            } else { 
                this.actions.down.map(f => f());
            }
        }

        this.xDown = null;
        this.yDown = null;
    }

    addAction(action) {

        const actions = this.actions[action.type];

        if (actions && action.f) {
            actions.push(action.f)
        }
    }

    clearAction(type) {
        this.actions[type] = [];
    }
}

const swipeActions = new SwipeActions();

export default swipeActions;
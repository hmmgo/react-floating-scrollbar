import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

class ReactFlScrollbar extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    this.scrollBlockRef = React.createRef();
    this.state = {
      contentRefEl: props.contentRef.current,
      scrollRefEl: this.scrollRef.current,
      visible: true,
      preventSyncCont: false,
      preventSyncSbar: false,
    };
  }

  componentDidMount() {
    const contentRefEl = this.props.contentRef.current;
    const elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
    const scrollWidth = contentRefEl && elToScroll ? elToScroll.scrollWidth : 0;
    const scrollRefEl = this.scrollRef.current;
    const scrollBlockRefEl = this.scrollBlockRef.current;
    const lots = this;

    if (contentRefEl && elToScroll) {
      elToScroll.onscroll = (e) => {
        lots.syncSbar(e.target, true);
      };
      elToScroll.onfocus = () => {
        setTimeout(lots.syncSbar.bind(lots, contentRefEl), 0);
      };
    }

    if (scrollRefEl) {
      const elToScrolls = document.getElementsByClassName('react-fl-scrollbar')[0];
      elToScrolls.onscroll = (e) => {
        lots.syncCont(e.target, true);
      };
    }

    if (scrollWidth > 0) {
      scrollBlockRefEl.style.width = `${scrollWidth}px`;
    }

    lots.setState({ contentRefEl, scrollRefEl, scrollBlockRefEl });
  }

  componentDidUpdate() {
    const contentRefEl = this.props.contentRef.current;
    const scrollBlockRefEl = this.scrollBlockRef.current;
    const elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
    const scrollWidth = contentRefEl && elToScroll ? elToScroll.scrollWidth : 0;
    scrollBlockRefEl.style.width = `${scrollWidth}px`;
  }

  componentWillUnmount() {
    const contentRefEl = this.props.contentRef.current;
    const elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
    const scrollRefEl = this.scrollRef.current;

    if (contentRefEl && elToScroll) {
      elToScroll.onscroll = null;
      elToScroll.onfocus = null;
    }

    if (scrollRefEl) {
      scrollRefEl.onscroll = null;
    }
  }

  syncSbar(sender, preventSyncCont) {
    if (this.state.preventSyncSbar) {
      this.setState({ preventSyncSbar: false });
      return;
    }
    this.setState({ preventSyncCont: !!preventSyncCont });
    this.scrollRef.current.scrollLeft = sender.scrollLeft;
  }

  syncCont(sender, preventSyncSbar) {
    const contentRefEl = this.props.contentRef.current;
    const elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
    if (this.state.preventSyncCont) {
      this.setState({ preventSyncCont: false });
      return;
    }
    this.setState({ preventSyncSbar: !!preventSyncSbar });
    if (contentRefEl && elToScroll) {
      elToScroll.scrollLeft = sender.scrollLeft;
    }
  }

  render() {
    const { contentRefEl } = this.state;

    return (
      <Fragment>
        {this.props.children}
        <div
          className={'react-fl-scrollbar'}
          style={{ width: `${contentRefEl ? contentRefEl.offsetWidth : 0}px`,
            left: `${contentRefEl ? contentRefEl.getBoundingClientRect().left : 0}px` }}
          ref={this.scrollRef}
        >
          <div ref={this.scrollBlockRef} />
        </div>
      </Fragment>);
  }
}

ReactFlScrollbar.propTypes = {
  contentRef: PropTypes.object.isRequired,
  innerScrollableClass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReactFlScrollbar;

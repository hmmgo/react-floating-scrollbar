'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactFlScrollbar = function (_Component) {
  _inherits(ReactFlScrollbar, _Component);

  function ReactFlScrollbar(props) {
    _classCallCheck(this, ReactFlScrollbar);

    var _this = _possibleConstructorReturn(this, (ReactFlScrollbar.__proto__ || Object.getPrototypeOf(ReactFlScrollbar)).call(this, props));

    _this.scrollRef = _react2.default.createRef();
    _this.scrollBlockRef = _react2.default.createRef();
    _this.state = {
      contentRefEl: props.contentRef.current,
      scrollRefEl: _this.scrollRef.current,
      visible: true,
      preventSyncCont: false,
      preventSyncSbar: false
    };
    return _this;
  }

  _createClass(ReactFlScrollbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var contentRefEl = this.props.contentRef.current;
      var elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
      var scrollWidth = contentRefEl && elToScroll ? elToScroll.scrollWidth : 0;
      var scrollRefEl = this.scrollRef.current;
      var scrollBlockRefEl = this.scrollBlockRef.current;
      var lots = this;

      if (contentRefEl && elToScroll) {
        elToScroll.onscroll = function (e) {
          lots.syncSbar(e.target, true);
        };
        elToScroll.onfocus = function () {
          setTimeout(lots.syncSbar.bind(lots, contentRefEl), 0);
        };
      }

      if (scrollRefEl) {
        var elToScrolls = document.getElementsByClassName('react-fl-scrollbar')[0];
        elToScrolls.onscroll = function (e) {
          lots.syncCont(e.target, true);
        };
      }

      if (scrollWidth > 0) {
        scrollBlockRefEl.style.width = scrollWidth + 'px';
      }

      lots.setState({ contentRefEl: contentRefEl, scrollRefEl: scrollRefEl, scrollBlockRefEl: scrollBlockRefEl });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var contentRefEl = this.props.contentRef.current;
      var scrollBlockRefEl = this.scrollBlockRef.current;
      var elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
      var scrollWidth = contentRefEl && elToScroll ? elToScroll.scrollWidth : 0;
      scrollBlockRefEl.style.width = scrollWidth + 'px';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var contentRefEl = this.props.contentRef.current;
      var elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
      var scrollRefEl = this.scrollRef.current;

      if (contentRefEl && elToScroll) {
        elToScroll.onscroll = null;
        elToScroll.onfocus = null;
      }

      if (scrollRefEl) {
        scrollRefEl.onscroll = null;
      }
    }
  }, {
    key: 'syncSbar',
    value: function syncSbar(sender, preventSyncCont) {
      if (this.state.preventSyncSbar) {
        this.setState({ preventSyncSbar: false });
        return;
      }
      this.setState({ preventSyncCont: !!preventSyncCont });
      this.scrollRef.current.scrollLeft = sender.scrollLeft;
    }
  }, {
    key: 'syncCont',
    value: function syncCont(sender, preventSyncSbar) {
      var contentRefEl = this.props.contentRef.current;
      var elToScroll = document.getElementsByClassName(this.props.innerScrollableClass)[0];
      if (this.state.preventSyncCont) {
        this.setState({ preventSyncCont: false });
        return;
      }
      this.setState({ preventSyncSbar: !!preventSyncSbar });
      if (contentRefEl && elToScroll) {
        elToScroll.scrollLeft = sender.scrollLeft;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var contentRefEl = this.state.contentRefEl;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        this.props.children,
        _react2.default.createElement(
          'div',
          {
            className: 'react-fl-scrollbar',
            style: { width: (contentRefEl ? contentRefEl.offsetWidth : 0) + 'px',
              left: (contentRefEl ? contentRefEl.getBoundingClientRect().left : 0) + 'px' },
            ref: this.scrollRef
          },
          _react2.default.createElement('div', { ref: this.scrollBlockRef })
        )
      );
    }
  }]);

  return ReactFlScrollbar;
}(_react.Component);

ReactFlScrollbar.propTypes = {
  contentRef: _propTypes2.default.object.isRequired,
  innerScrollableClass: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired
};

exports.default = ReactFlScrollbar;

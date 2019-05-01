# react-floating-scrollbar
Floating Scrollbar React Component
Inspired by  (https://github.com/dmarkin/react-floating-scroll).


## Install

```npm
npm install react-floating-scrollbar
```

### Usage at the parent component:

```js
import ReactFlScrollbar from 'react-floating-scrollbar';

class ParentComponent extends Component {

constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    ...
    }

...

render() {
    return (
        <ReactFlScrollbar contentRef={this.contentRef}
                      innerScrollableClass={`${innerScrollableClassName}`}>
            <div {...props}
                ref={this.contentRef}>
                ....
                </div>
        </ReactFlScrollbar>);
    }
}
```

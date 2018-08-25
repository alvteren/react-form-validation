import React from 'react';

export default function Validatable() {
  return function(WrapedComponent) {
    return class extends React.PureComponent {
      static displayName = 'Validatable()';

      render() {
        return <WrapedComponent />;
      }
    };
  };
}

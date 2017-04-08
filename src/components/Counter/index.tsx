import * as React from 'react';

interface CounterProps {
  inititalValue?: number;
}

interface CounterState {
  value: number;
}

export class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      value: props.inititalValue || 0,
    };
  }

  increment = () => this.setState({ value: this.state.value + 1 });
  decrement = () => this.setState({ value: this.state.value - 1 });

  render() {
    return (
      <div className="counter">
        <h1>{this.state.value}</h1>
        <button className="btn" onClick={this.increment}>Increment</button>
        <button className="btn" onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

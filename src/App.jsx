class Hello extends React.Component {
  render() {
    return (
      <header>
        <h1>Hello! Let's start IT5007 Group Project</h1>
      </header>
    );
  }
}

const element = <Hello />;

ReactDOM.render(element, document.getElementById('root'));
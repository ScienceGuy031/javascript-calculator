import "./App.css";
import React from "react";

const operators = ['/', 'x', '-', '+'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      prevInput: "",
      formula: "",
    };

    this.clear = this.clear.bind(this);
    this.inputChar = this.inputChar.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  calculate() {
    let result = 0;
    let expression = this.state.formula;
    if (operators.includes(expression.slice(-1))) {
      expression = expression.slice(0, -1);
    }
    expression = expression.replace(/[+\-x/]+(\+)/g, '+');

    expression = expression.replace(/x/g, '*');
    console.log(expression);
    // eslint-disable-next-line no-eval
    result = Math.round(1e8 * eval(expression)) / 1e8;

    this.setState({
      input: String(result),
      prevInput: '=',
      formula: ''
    });
  }

  clear() {
    this.setState({
      input: "0",
      formula: "",
      prevInput: '',
    });
  }

  inputChar(e) {
    const char = e.target.innerText;
    const curInput = this.state.input;
    let curFormula = this.state.formula;
    // Number input
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(char)) {
      if (['0', '/', 'x', '+', '-'].includes(curInput)) {
        this.setState({
          input: char,
          formula: curFormula + char,
          prevInput: curFormula.slice(-1)
        });
      } else if (curInput.includes('.') && char === '.') {
        return;
      } else {
        this.setState({
          input: curInput + char,
          formula: curFormula + char,
          prevInput: curFormula.slice(-1)
        });
      }
    }
    // Operators
    const lastInput = curFormula.slice(-1);
    // No double Operators
    if (['/', '+', 'x'].includes(lastInput) && ['/', '+', 'x'].includes(char) ) {
      this.setState({
        input: char,
        formula: curFormula.slice(0, -1) + char
      });
      return;
    }
    if (operators.includes(char)) {
      this.setState({
        input: char,
        formula: curFormula + char,
        prevInput: curFormula.slice(-1)
      });
    }

    if(this.state.prevInput === '=') {
      if(operators.includes(char)) {
        this.setState({
          input: char,
          formula: curInput + char,
          prevInput: curFormula.slice(-1)
        });
      } else {
        this.setState({
          input: char,
          formula: char,
          prevInput: curFormula.slice(-1)
        });
      }
    }

    // preventing multiple '-'
    if(lastInput === '-' && char === '-') {
      this.setState({
        input: '-',
        formula: curFormula,
        prevInput: '-'
      });
    }

    // updating operator when multiple are entered
    if(operators.includes(lastInput) && ['/', 'x', '+'].includes(char)) {
      this.setState({
        input: char,
        formula: curFormula.slice(0,-1) + char,
        prevInput: lastInput
      });
    }
  }

  render() {
    return (
      <div className="App container text-bg-secondary">
        <div className="container text-bg-secondary text-center p-5">
          <h1>Diotyrsos' JavaScript Calculator</h1>

          <div id="frame" className="bg-dark col-6">
            {/* Calculator Display */}
            <div className="row">
              <div
                id="displayContainer"
                className="text-end col-12 d-flex flex-column justify-content-end font-monospace"
              >
                <span id="formula" className="align-self-end col-12">
                  {this.state.formula}
                </span>
                <span id="display" className="align-self-end col-12">
                  {this.state.input}
                </span>
              </div>
            </div>

            {/* AC, / */}
            <div className="row">
              <button
                className="col-9 btn btn-danger btn-lg"
                id="clear"
                onClick={this.clear}
              >
                AC
              </button>
              <button
                className="col-3 btn btn-warning btn-lg"
                id="divide"
                onClick={this.inputChar}
              >
                /
              </button>
            </div>

            {/* 7, 8, 9, x */}
            <div className="row">
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="seven"
                onClick={this.inputChar}
              >
                7
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="eight"
                onClick={this.inputChar}
              >
                8
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="nine"
                onClick={this.inputChar}
              >
                9
              </button>
              <button
                className="col-3 btn btn-warning btn-lg"
                id="multiply"
                onClick={this.inputChar}
              >
                x
              </button>
            </div>

            {/* 4, 5, 6, - */}
            <div className="row">
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="four"
                onClick={this.inputChar}
              >
                4
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="five"
                onClick={this.inputChar}
              >
                5
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="six"
                onClick={this.inputChar}
              >
                6
              </button>
              <button
                className="col-3 btn btn-warning btn-lg"
                id="subtract"
                onClick={this.inputChar}
              >
                -
              </button>
            </div>

            {/* 1, 2, 3, + */}
            <div className="row">
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="one"
                onClick={this.inputChar}
              >
                1
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="two"
                onClick={this.inputChar}
              >
                2
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="three"
                onClick={this.inputChar}
              >
                3
              </button>
              <button
                className="col-3 btn btn-warning btn-lg"
                id="add"
                onClick={this.inputChar}
              >
                +
              </button>
            </div>

            {/* 0, ., = */}
            <div className="row">
              <button
                className="col-6 btn btn-secondary btn-lg"
                id="zero"
                onClick={this.inputChar}
              >
                0
              </button>
              <button
                className="col-3 btn btn-secondary btn-lg"
                id="decimal"
                onClick={this.inputChar}
              >
                .
              </button>
              <button
                className="col-3 btn btn-info btn-lg"
                id="equals"
                onClick={this.calculate}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

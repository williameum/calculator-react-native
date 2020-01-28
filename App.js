import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      resultText: ''
    }
    this.operations = ['DEL', 'CLR', '+', '-', '*', '/']
  }

  calculateResult() {
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  validate() {
    const text = this.state.resultText
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
      default:
        break;
    }
    return true
  }

  buttonPressed(text) {
    if (text == '=') {
      return this.validate() && this.calculateResult(this.resultText)
    } else {
      this.setState({ resultText: this.state.resultText + text })
    }
  }

  operate(operation) {
    switch (operation) {
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({ resultText: text.join('') })
        break;
      case 'CLR':
        this.setState({ resultText: '', calculationText: '' })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        if (this.operations.indexOf(lastChar) > 0) return
        if (this.state.text == "") return
        this.setState({
          resultText: this.state.resultText + operation
        })
      default:
        break;
    }
  }

  render() {
    let rows = []
    const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style={styles.btnText}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    let ops = []
    for (let i = 0; i < 6; i++) {
      ops.push(
        <TouchableOpacity onPress={() => this.operate(this.operations[i])} style={styles.btn}>
          <Text style={styles.white}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View styles={styles.container}>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.resultText}</Text>
        </View>

        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.calculationText}</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>

          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  white: {
    color: 'white'
  },
  btnText: {
    color: 'white'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  calculationText: {
    fontSize: 30,
    color: 'black'
  },
  resultText: {
    fontSize: 20,
    color: 'black'
  },
  calculation: {
    // flex: 2,
    backgroundColor: 'white',
    height: 150,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  result: {
    // flex: 1,
    backgroundColor: 'white',
    height: 75,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363'
  },
  numbers: {
    flex: 5,
    backgroundColor: '#434343'
  },
  buttons: {
    flexGrow: 1,
    flexDirection: 'row'
  }, row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
});

console.disableYellowBox = true
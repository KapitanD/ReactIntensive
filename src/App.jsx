import React, { Component } from 'react';
import Total from './components/total/Total.jsx';
import History from './components/history/History.jsx'
import Operation from './components/operation/Operation.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            description: '',
            amount: '',
        };
    }

    addAmount = e => {
        this.setState({amount: e.target.value});
    }

    addDescription = e => {
        this.setState({description: e.target.value});
    }

    calculateIncome = () => {
        return (
        this.state.transactions.reduce((a, item) => {
            if(item.add){
                a += parseInt(item.amount, 10);
            }
            return a;
        }, 0)
        )
    }

    calculateExpences = () => {
        return (
        this.state.transactions.reduce((a, item) => {
            if(!item.add){
                a += parseInt(item.amount, 10);
            }
            return a;
        }, 0)
        );
    }

    calculateBalance = () => {
        return this.calculateIncome() - this.calculateExpences();
    }

    addTransaction = add => {

        const transactions = [...this.state.transactions];

        transactions.push({
            id: `cmr${(+new Date()).toString(16)}`,
            description: this.state.description,
            amount: this.state.amount,
            add
        });

        this.setState({ 
            transactions, 
            description: '',
            amount: '',
        });
    }

    render() {
        return (
            <>
                <header>
                    <h1>Кошелек</h1>
                    <h2> Калькулятор расходов </h2>
                </header>

                <main>
                    <div className="container">
                        <Total 
                        calculateIncome={this.calculateIncome}
                        calculateExpences={this.calculateExpences}
                        calculateBalance={this.calculateBalance}
                        />
                        <History 
                        transactions={this.state.transactions}
                        />
                        <Operation 
                        addTransaction={this.addTransaction}
                        addAmount={this.addAmount}
                        addDescription={this.addDescription}
                        description={this.state.description}
                        amount={this.state.amount}
                        />
                    </div>
                </main>
            </>
        );
    }
}

export default App;
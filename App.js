const Currency = (props) => {
  return <p>{props.title}
    <span className="currencySpan">{props.cash ? ((props.cash / props.ratio) * props.price).toFixed(2) + props.acronym : ""}</span>
  </p>
}

class Exchange extends React.Component {
  state = {
    amount: "",
    product: "tomato",
  }


  static defaultProps = {
    currencies: [
      {
        id: 0,
        ratio: 1,
        name: "zloty",
        title: "Wartość w złotówkach:",
        acronym: " PLN"
      },
      {
        id: 1,
        ratio: 4.26,
        name: "dollar",
        title: "Wartość w dolarach:",
        acronym: " $"
      },
      {
        id: 2,
        ratio: 4.64,
        name: "euro",
        title: "Wartość w euro:",
        acronym: " €"

      },
      {
        id: 3,
        ratio: 5.59,
        name: "pound",
        title: "Wartość w funtach:",
        acronym: " £",
      },
    ],
    prices: {
      tomato: 15,
      gas: 7.20,
      electricity: 0.91,
    }
  }

  handleChange = e => {
    this.setState({
      amount: e.target.value,

    })
  }
  handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: "",
    })
  }

  addSuffix = e => {
    if (this.state.product === "tomato") return "kg"
    else if (this.state.product === "gas") return "l"
    else if (this.state.product === "electricity") return "kWh"
    else return null
  }

  selectPrice(select) {

    return this.props.prices[select]
  }

  render() {
    const price = this.selectPrice(this.state.product);
    const calculators = this.props.currencies.map(currency => (
      <Currency key={currency.id} ratio={currency.ratio} name={currency.name} title={currency.title} cash={this.state.amount} acronym={currency.acronym} price={price} />
    ))

    return (
      <div className="container">
        <form >
          <label >
            <select value={this.state.product} onChange={this.handleSelect}>
              <option value="tomato">Pomidory</option>
              <option value="gas">Olej napędowy</option>
              <option value="electricity">Prąd</option>
            </select>
          </label>
          <label >
            <input className="mainInput" type="number" value={this.state.amount} onChange={this.handleChange} /><em>{this.addSuffix()}</em>
          </label>
          {calculators}
        </form>
      </div>
    );
  }
}


ReactDOM.render(<Exchange />, document.getElementById('root'))
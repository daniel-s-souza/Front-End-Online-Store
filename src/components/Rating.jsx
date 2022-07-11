import React from 'react';
import Review from './Review';

class Rating extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: '',
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    const previousReviews = JSON.parse(localStorage.getItem('rating'));
    if (previousReviews !== null) {
      localStorage.setItem('rating', JSON.stringify([...previousReviews, this.state]));
    } else {
      localStorage.setItem('rating', JSON.stringify([this.state]));
    }
    this.setState({
      email: '',
      message: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // https://dev.to/duomly/how-to-use-loop-in-react-js-ael
  createList = () => {
    const list = [];
    const MAGIC_NUMBER = 5;
    for (let index = 1; index <= MAGIC_NUMBER; index += 1) {
      list.push(
        <label key={ index } htmlFor={ index }>
          <input
            data-testid={ `${index}-rating` }
            type="radio"
            name="rate"
            id={ index }
            rate={ index }
            value={ index }
            onChange={ this.handleChange }
            required
          />
        </label>,
      );
    }
    return list;
  };

  render() {
    const reviews = JSON.parse(localStorage.getItem('rating'));
    const { email, message } = this.state;
    return (
      <div>
        <form action="">
          <div>
            <input
              data-testid="product-detail-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              required
              id="email-input"
              placeholder="Email"
              type="text"
            />
          </div>
          { this.createList() }
          <div>
            <textarea
              data-testid="product-detail-evaluation"
              name="message"
              value={ message }
              onChange={ this.handleChange }
              id="message"
              placeholder="Mensagem (opcional)"
              type="text"
            />
          </div>
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ this.handleClick }
          >
            Avaliar
          </button>
        </form>
        <div />
        { reviews !== null
          ? reviews.map((review, index) => <Review key={ index } info={ review } />)
          : <p>Sem avaliações no momento</p> }
      </div>
    );
  }
}

export default Rating;

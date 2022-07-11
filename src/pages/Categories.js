import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.updateState();
  }

  updateState = async () => {
    this.setState({
      categories: await getCategories(),
    });
  };

  handleClick = ({ target }) => {
    const { onClick } = this.props;
    const id = target.getAttribute('category');
    onClick('', id);
  };

  render() {
    const { categories } = this.state;
    return (
      <section>
        { categories.map((category, index) => (
          <div
            tabIndex="0"
            role="button"
            onClick={ this.handleClick }
            onKeyDown={ this.handleClick }
            key={ index }
            data-testid="category"
          >
            <Link
              category={ category.id }
              to={ `/${category.id}` }
            >
              { category.name }
            </Link>
          </div>)) }
      </section>
    );
  }
}

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import '../styles/TransactionEditForm.css';

class TransactionEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.transaction.price,
      name: this.props.transaction.name,
      category: this.props.transaction.category,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onEdit(this.state);
  };

  render() {
    return (
      <Form className="transaction-edit-form" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    );
  }
}

TransactionEditForm.propTypes = {
  transaction: PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TransactionEditForm;
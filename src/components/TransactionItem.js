import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import '../styles/TransactionItem.css';

const TransactionItem = ({ transaction, handleSelectTransaction }) => {
  return (
    <Card className="transaction-item" onClick={() => handleSelectTransaction(transaction)}>
      <Card.Body>
        <Card.Title>{transaction.name}</Card.Title>
        <Card.Text>
          Price: {transaction.price} <br />
          Category: {transaction.category}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  handleSelectTransaction: PropTypes.func.isRequired,
};

export default TransactionItem;
import React from 'react';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';
import '../styles/TransactionList.css';
import { ListGroup } from 'react-bootstrap';

const TransactionList = ({ transactions, handleSelectTransaction }) => {
  return (
    <div className="transaction-list">
      <ListGroup>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            handleSelectTransaction={handleSelectTransaction}
          />
        ))}
      </ListGroup>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  handleSelectTransaction: PropTypes.func.isRequired,
};

export default TransactionList;
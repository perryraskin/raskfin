import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import TransactionEditForm from './TransactionEditForm';
import '../styles/TransactionDetailModal.css';

class TransactionDetailModal extends React.Component {
  render() {
    const { transaction, show, handleClose, handleEditDetails } = this.props;

    return (
      <Modal show={show} onHide={handleClose} className="transaction-detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionEditForm
            transaction={transaction}
            handleEditDetails={handleEditDetails}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

TransactionDetailModal.propTypes = {
  transaction: PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEditDetails: PropTypes.func.isRequired,
};

export default TransactionDetailModal;
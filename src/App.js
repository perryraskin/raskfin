import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionList from './components/TransactionList';
import TransactionDetailModal from './components/TransactionDetailModal';
import './styles/App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleEditDetails = (updatedTransaction) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
  };

  return (
    <div className="App">
      <TransactionList 
        transactions={transactions} 
        onSelectTransaction={handleSelectTransaction} 
      />
      {selectedTransaction && 
        <TransactionDetailModal 
          transaction={selectedTransaction} 
          onViewDetails={handleViewDetails} 
          onEditDetails={handleEditDetails} 
        />
      }
    </div>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import Payment from './components/Payment';
import './PricingPayment.css'

export default function PricingPayment() {
  function goBack() {
    window.history.back();
  }

  return (
    <div>
      <Link to="#" class="back" onClick={goBack} >
  <div></div>
  <span className='back-span'>Back to home</span>
</Link>
      <Payment />
    </div>
  );
}

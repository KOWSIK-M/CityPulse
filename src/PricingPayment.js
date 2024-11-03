import React from 'react';
import Payment from './components/Payment';
import './PricingPayment.css'

export default function PricingPayment() {
  function goBack() {
    window.history.back();
  }

  return (
    <div>
      <a href="#" class="back" onClick={goBack} >
  <div></div>
  <span className='back-span'>Back to home</span>
</a>
      <Payment />
    </div>
  );
}

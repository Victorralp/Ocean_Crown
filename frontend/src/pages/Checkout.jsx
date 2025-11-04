import React, { useState } from 'react';
import axios from 'axios';

export default function Checkout(){
  const [email,setEmail]=useState('');
  const [loading,setLoading]=useState(false);
  async function startPayment(e){
    e.preventDefault();
    setLoading(true);
    try{
      const payload={ customer:{email}, items:[{productId:1,quantity:1}] };
      const res = await axios.post('/api/checkout/init', payload);
      window.location.href = res.data.authorization_url;
    }catch(err){
      alert('Payment failed to start');
    }finally{setLoading(false);}
  }
  return (
    <form onSubmit={startPayment} className="card">
      <h2>Checkout</h2>
      <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div style={{marginTop:12}}>
        <button className="btn" type="submit" disabled={loading}>{loading? 'Processing...':'Pay with Paystack'}</button>
      </div>
    </form>
  );
}

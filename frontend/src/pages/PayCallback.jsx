import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function PayCallback(){
  const [searchParams]=useSearchParams();
  const [status,setStatus]=useState('Verifying...');
  useEffect(()=>{
    const reference = searchParams.get('reference');
    if(!reference){setStatus('No reference provided.');return;}
    axios.get(`/api/checkout/verify/${encodeURIComponent(reference)}`)
      .then(r=>setStatus(`Payment status: ${r.data.status}`))
      .catch(()=>setStatus('Verification failed.'))
  },[searchParams]);
  return <div className="card">{status}</div>
}

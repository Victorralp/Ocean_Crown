import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get('/api/products').then(r=>setProducts(r.data)).catch(()=>setProducts([]));
  },[]);
  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(p=> (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>{(p.price/100).toFixed(2)}</strong></p>
            <Link to="/checkout"><button className="btn">Buy</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

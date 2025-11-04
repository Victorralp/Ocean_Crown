const { initDb, Product } = require('./src/models');
(async ()=>{
  await initDb();
  await Product.bulkCreate([
    { name: 'Sea Shell Necklace', description:'Handmade', price: 250000 },
    { name: 'Oceanic Lamp', description:'Ambient lamp', price: 150000 }
  ], { ignoreDuplicates: true });
  console.log('Seeded products');
  process.exit();
})();

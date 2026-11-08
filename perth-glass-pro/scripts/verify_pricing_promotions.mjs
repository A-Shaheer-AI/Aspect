async function checkPricing() {
  const res = await fetch('http://localhost:3000/pricing');
  console.log('PRICING STATUS:', res.status);
  const html = await res.text();
  
  const offersFound = [
    'The Summer Biannual Agreement',
    'The Roof-to-Glass Gutter Combo',
    'The Luxury Interior Detailing Bonus',
    'The VIP Testimonial Solar Reward',
    'The Perth Summer Alfresco &amp; Pool Entertainer',
    'The Summer Solar &amp; Glass Power Combo',
    'Double-Storey Summer Refresh Guarantee'
  ].map(title => ({
    title,
    found: html.includes(title)
  }));
  console.log('OFFERS IN DOM:', offersFound);
  console.log('All 7 offers present:', offersFound.every(o => o.found));
}

checkPricing().catch(console.error);

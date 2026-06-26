import React from 'react';

interface CheckoutSummaryProps {
  items: { name: string; price: number }[];
  total: number;
}

// Order summary panel shown at checkout
export function CheckoutSummary({ items, total }: CheckoutSummaryProps) {
  return (
    <div style={{ padding: 16, backgroundColor: '#F5F5F5', borderRadius: 8 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Order summary</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => (
          <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#555555' }}>{item.name}</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid #DDDDDD',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1652F0' }}>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

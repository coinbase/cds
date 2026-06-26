import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CheckoutItemProps {
  name: string;
  quantity: number;
  price: number;
}

// Individual line item in the checkout list (mobile)
export function CheckoutItem({ name, quantity, price }: CheckoutItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.qty}>Qty: {quantity}</Text>
      </View>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  info: {
    flexDirection: 'column',
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111111',
  },
  qty: {
    fontSize: 12,
    color: '#888888',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1652F0',
  },
});

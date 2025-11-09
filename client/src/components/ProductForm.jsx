// src/components/ProductForm.jsx
'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductForm({ product, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
    } else {
      setName(''); setPrice(''); setStock(''); setCategory('');
    }
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { name, price: Number(price), stock: Number(stock), category };
    try {
      if (product) {
        await api.patch(`/products/${product._id}`, payload);
        toast.success('Updated');
      } else {
        await api.post('/products', payload);
        toast.success('Created');
      }
      setOpen(false);
      onSuccess?.();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={product ? 'outline' : 'default'}>
          {product ? 'Edit' : 'Add'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{product ? 'Edit' : 'Create'} Product</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {['electronics', 'clothing', 'food', 'books', 'other'].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">{product ? 'Update' : 'Create'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
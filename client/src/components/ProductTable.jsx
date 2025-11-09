// src/components/ProductTable.jsx
'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ProductForm from './ProductForm';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data || []);
    } catch {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed');
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">My Products</h2>
        <ProductForm onSuccess={load} />
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell className="flex gap-1">
                  <ProductForm product={p} onSuccess={load} />
                  <Button size="sm" variant="destructive" onClick={() => del(p._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
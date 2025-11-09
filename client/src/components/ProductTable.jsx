// src/components/ProductTable.jsx
'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductForm from './ProductForm';
import { 
  Package, 
  Loader2, 
  Trash2, 
  Edit, 
  DollarSign, 
  Box,
  PackageOpen,
  AlertCircle
} from 'lucide-react';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const del = async (id) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    
    try {
      setDeleting(id);
      await api.delete(`/products/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      electronics: 'bg-blue-100 text-blue-700 border-blue-200',
      clothing: 'bg-pink-100 text-pink-700 border-pink-200',
      food: 'bg-green-100 text-green-700 border-green-200',
      books: 'bg-purple-100 text-purple-700 border-purple-200',
      other: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[category] || colors.other;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200' };
    if (stock < 10) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-700 border-green-200' };
  };

  if (loading) {
    return (
      <Card className="border-theme-border shadow-lg">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-theme-border"></div>
              <Loader2 className="w-16 h-16 text-theme-primary animate-spin absolute inset-0" />
            </div>
            <p className="text-theme-foreground/60 font-medium">Loading your products...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-theme-border shadow-xl bg-theme-background">
      <CardHeader className="border-b border-theme-border bg-gradient-to-r from-theme-muted to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-theme-foreground">
                My Products
              </CardTitle>
              <p className="text-sm text-theme-foreground/60 mt-1">
                Manage and track your product inventory
              </p>
            </div>
          </div>
          <ProductForm onSuccess={load} />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {products.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-theme-muted">
              <PackageOpen className="w-10 h-10 text-theme-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-theme-foreground">
                No products yet
              </h3>
              <p className="text-theme-foreground/60 max-w-md mx-auto">
                Get started by creating your first product. Click the "Add Product" button above to begin.
              </p>
            </div>
            <ProductForm onSuccess={load} triggerText="Create Your First Product" />
          </div>
        ) : (
          <div className="rounded-lg border border-theme-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-theme-muted hover:bg-theme-muted">
                  <TableHead className="font-semibold text-theme-foreground">
                    Product Name
                  </TableHead>
                  <TableHead className="font-semibold text-theme-foreground">
                    Category
                  </TableHead>
                  <TableHead className="font-semibold text-theme-foreground">
                    Price
                  </TableHead>
                  <TableHead className="font-semibold text-theme-foreground">
                    Stock
                  </TableHead>
                  <TableHead className="font-semibold text-theme-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-theme-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => {
                  const stockStatus = getStockStatus(p.stock);
                  return (
                    <TableRow 
                      key={p._id} 
                      className="hover:bg-theme-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium text-theme-foreground">
                        <div className="flex items-center gap-2">
                          <Box className="w-4 h-4 text-theme-primary" />
                          {p.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getCategoryColor(p.category)} capitalize font-medium`}
                        >
                          {p.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-theme-foreground">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-theme-success" />
                          {p.price.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-theme-foreground">
                        {p.stock} units
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${stockStatus.color} font-medium`}
                        >
                          {stockStatus.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <ProductForm product={p} onSuccess={load} />
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => del(p._id)}
                            disabled={deleting === p._id}
                            className="shadow-sm hover:shadow-md transition-all"
                          >
                            {deleting === p._id ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                Deleting
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-6 flex items-center justify-between px-2">
            <p className="text-sm text-theme-foreground/60">
              Showing <span className="font-semibold text-theme-foreground">{products.length}</span> product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2 text-xs text-theme-foreground/50">
              <AlertCircle className="w-3 h-3" />
              Products are updated in real-time
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
// src/app/dashboard/admin/products/page.jsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Package,
  Loader2,
  Trash2,
  Search,
  Box,
  DollarSign,
  User,
  PackageOpen,
  AlertCircle,
  Filter,
  Download,
  ShoppingBag,
} from 'lucide-react';

export default function AdminAllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Load ALL products (admin endpoint)
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/products');
      setProducts(res.data.data || []);
      setFilteredProducts(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.owner?.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products]);

  // Delete any product (admin endpoint)
  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    
    try {
      setDeleting(id);
      await api.delete(`/admin/products/${id}`);
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
      other: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[category] || colors.other;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200' };
    if (stock < 10) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-700 border-green-200' };
  };

  const getStats = () => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const uniqueOwners = new Set(products.map((p) => p.owner?._id)).size;
    const categories = [...new Set(products.map((p) => p.category))];
    return { totalProducts, totalValue, uniqueOwners, categories };
  };

  const stats = getStats();

  if (loading) {
    return (
      <ProtectedRoute adminOnly>
        <Card className="border-theme-border shadow-lg">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-theme-border"></div>
                <Loader2 className="w-16 h-16 text-theme-primary animate-spin absolute inset-0" />
              </div>
              <p className="text-theme-foreground/60 font-medium">Loading all products...</p>
            </div>
          </CardContent>
        </Card>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-theme-border shadow-lg bg-gradient-to-br from-theme-primary to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Total Products</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-theme-border shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Total Value</p>
                  <p className="text-3xl font-bold">${stats.totalValue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-theme-border shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Product Owners</p>
                  <p className="text-3xl font-bold">{stats.uniqueOwners}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Card */}
        <Card className="border-theme-border shadow-xl bg-theme-background">
          <CardHeader className="border-b border-theme-border bg-gradient-to-r from-theme-muted to-transparent">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center shadow-md">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-theme-foreground">
                    All Products
                  </CardTitle>
                  <p className="text-sm text-theme-foreground/60 mt-1">
                    Complete product catalog across all users
                  </p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-foreground/40" />
                  <Input
                    type="text"
                    placeholder="Search products or owners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-theme-border focus:border-theme-primary"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-10 px-4 rounded-lg border-2 border-theme-border bg-theme-background text-theme-foreground focus:border-theme-primary focus:outline-none transition-all"
                >
                  <option value="all">All Categories</option>
                  {stats.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-theme-muted">
                  <PackageOpen className="w-10 h-10 text-theme-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-theme-foreground">
                    {products.length === 0 ? 'No products in system' : 'No products found'}
                  </h3>
                  <p className="text-theme-foreground/60 max-w-md mx-auto">
                    {products.length === 0
                      ? 'There are no products created by any users yet.'
                      : 'Try adjusting your search or filter criteria.'}
                  </p>
                </div>
                {searchQuery || categoryFilter !== 'all' ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                    }}
                    className="border-theme-border hover:bg-theme-muted"
                  >
                    Clear Filters
                  </Button>
                ) : null}
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
                        Owner
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
                    {filteredProducts.map((p) => {
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
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                                {p.owner?.email?.charAt(0).toUpperCase() || '?'}
                              </div>
                              <span className="text-theme-foreground/80 text-sm">
                                {p.owner?.email || '—'}
                              </span>
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
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteProduct(p._id)}
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
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <p className="text-sm text-theme-foreground/60">
                  Showing{' '}
                  <span className="font-semibold text-theme-foreground">
                    {filteredProducts.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-theme-foreground">
                    {products.length}
                  </span>{' '}
                  product{products.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2 text-xs text-theme-foreground/50">
                  <AlertCircle className="w-3 h-3" />
                  Admin view - all products visible
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
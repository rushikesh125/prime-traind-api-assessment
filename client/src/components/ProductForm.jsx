// src/components/ProductForm.jsx
'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Loader2, 
  Package, 
  DollarSign, 
  Box, 
  Tag,
  Sparkles
} from 'lucide-react';

export default function ProductForm({ product, onSuccess, triggerText }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setStock(product.stock || '');
      setCategory(product.category || '');
    } else {
      setName('');
      setPrice('');
      setStock('');
      setCategory('');
    }
  }, [product, open]);

  const submit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error('Please enter a product name');
      return;
    }
    if (!price || Number(price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    if (!stock || Number(stock) < 0) {
      toast.error('Please enter a valid stock quantity');
      return;
    }
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    setLoading(true);
    const payload = { 
      name: name.trim(), 
      price: Number(price), 
      stock: Number(stock), 
      category 
    };

    try {
      if (product) {
        await api.patch(`/products/${product._id}`, payload);
        toast.success('Product updated successfully!');
      } else {
        await api.post('/products', payload);
        toast.success('Product created successfully!');
      }
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'clothing', label: 'Clothing', icon: '👕' },
    { value: 'food', label: 'Food & Beverages', icon: '🍔' },
    { value: 'books', label: 'Books & Media', icon: '📚' },
    { value: 'other', label: 'Other', icon: '📦' }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerText ? (
          <Button 
            className="bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-theme-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            {triggerText}
          </Button>
        ) : product ? (
          <Button 
            size="sm" 
            variant="outline"
            className="border-theme-border hover:bg-theme-muted hover:border-theme-primary transition-all shadow-sm hover:shadow-md"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        ) : (
          <Button 
            className="bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-theme-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] border-theme-border bg-theme-background">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center shadow-lg">
              {product ? (
                <Edit className="w-6 h-6 text-white" />
              ) : (
                <Package className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-theme-foreground">
                {product ? 'Edit Product' : 'Create New Product'}
              </DialogTitle>
              <DialogDescription className="text-theme-foreground/60">
                {product 
                  ? 'Update the details of your product below' 
                  : 'Fill in the information to add a new product'
                }
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-5 mt-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-theme-primary" />
              Product Name
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border-2 border-theme-border focus:border-theme-primary transition-all"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
              <Tag className="w-4 h-4 text-theme-primary" />
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 border-2 border-theme-border focus:border-theme-primary transition-all">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-theme-primary" />
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-11 border-2 border-theme-border focus:border-theme-primary transition-all"
                required
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <Box className="w-4 h-4 text-theme-primary" />
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="h-11 border-2 border-theme-border focus:border-theme-primary transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-11 border-2 border-theme-border hover:bg-theme-muted transition-all"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 h-11 bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-theme-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {product ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {product ? 'Update Product' : 'Create Product'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
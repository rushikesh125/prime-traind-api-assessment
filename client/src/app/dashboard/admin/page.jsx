// src/app/dashboard/admin/page.jsx
'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Loader2, 
  Trash2, 
  Mail, 
  UserCircle,
  Shield,
  ShieldCheck,
  AlertCircle,
  Crown
} from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const delUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone and will remove all their data.')) return;
    
    try {
      setDeleting(id);
      await api.delete(`/admin/users/${id}`);
      setUsers((u) => u.filter((x) => x._id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <Badge className="bg-gradient-to-r from-theme-primary to-purple-600 text-white border-0 shadow-sm">
          <Crown className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <UserCircle className="w-3 h-3 mr-1" />
        User
      </Badge>
    );
  };

  const getStats = () => {
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === 'admin').length;
    const userCount = users.filter(u => u.role === 'user').length;
    return { totalUsers, adminCount, userCount };
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
              <p className="text-theme-foreground/60 font-medium">Loading users...</p>
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
                  <p className="text-white/80 text-sm font-medium mb-1">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-theme-border shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Administrators</p>
                  <p className="text-3xl font-bold">{stats.adminCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-theme-border shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Regular Users</p>
                  <p className="text-3xl font-bold">{stats.userCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <UserCircle className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="border-theme-border shadow-xl bg-theme-background">
          <CardHeader className="border-b border-theme-border bg-gradient-to-r from-theme-muted to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-theme-foreground">
                  User Management
                </CardTitle>
                <p className="text-sm text-theme-foreground/60 mt-1">
                  Manage all users and their permissions
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {users.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-theme-muted">
                  <Users className="w-10 h-10 text-theme-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-theme-foreground">
                    No users found
                  </h3>
                  <p className="text-theme-foreground/60 max-w-md mx-auto">
                    There are no registered users in the system yet.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-theme-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-theme-muted hover:bg-theme-muted">
                      <TableHead className="font-semibold text-theme-foreground">
                        User Information
                      </TableHead>
                      <TableHead className="font-semibold text-theme-foreground">
                        Email Address
                      </TableHead>
                      <TableHead className="font-semibold text-theme-foreground">
                        Role
                      </TableHead>
                      <TableHead className="font-semibold text-theme-foreground text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow 
                        key={u._id} 
                        className="hover:bg-theme-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                              {(u.name || u.email).charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-theme-foreground">
                                {u.name || 'Anonymous User'}
                              </p>
                              <p className="text-xs text-theme-foreground/50">
                                ID: {u._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-theme-foreground/80">
                            <Mail className="w-4 h-4 text-theme-primary" />
                            {u.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(u.role)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => delUser(u._id)}
                            disabled={deleting === u._id}
                            className="shadow-sm hover:shadow-md transition-all"
                          >
                            {deleting === u._id ? (
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {users.length > 0 && (
              <div className="mt-6 flex items-center justify-between px-2">
                <p className="text-sm text-theme-foreground/60">
                  Showing <span className="font-semibold text-theme-foreground">{users.length}</span> user{users.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2 text-xs text-theme-foreground/50">
                  <AlertCircle className="w-3 h-3" />
                  Handle user data with care
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
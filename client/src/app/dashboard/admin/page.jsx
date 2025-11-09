// src/app/dashboard/admin/page.jsx
'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data || []);
    } catch {
      toast.error('Failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const delUser = async (id) => {
    if (!confirm('Delete user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((u) => u.filter((x) => x._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed');
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <ProtectedRoute adminOnly>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.name || '-'}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button size="sm" variant="destructive" onClick={() => delUser(u._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ProtectedRoute>
  );
}
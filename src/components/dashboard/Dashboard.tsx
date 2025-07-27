import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/userService';
import type { User } from '@/types/user';
import { UserForm } from './UserForm';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = (): void => {
    try {
      setIsLoading(true);
      const userList = userService.getUsers();
      setUsers(userList);
    } catch {
      // Handle error silently or show toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: {
    name: string;
    email: string;
  }): Promise<void> => {
    try {
      await userService.createUser(userData);
      loadUsers();
      setShowUserForm(false);
    } catch {
      // Handle error silently or show toast notification
    }
  };

  const handleUpdateUser = async (userData: {
    name: string;
    email: string;
  }): Promise<void> => {
    if (!editingUser) return;

    try {
      await userService.updateUser(editingUser.id, userData);
      loadUsers();
      setEditingUser(null);
      setShowUserForm(false);
    } catch {
      // Handle error silently or show toast notification
    }
  };

  const handleDeleteUser = async (userId: string): Promise<void> => {
    try {
      await userService.deleteUser(userId);
      loadUsers();
      setShowDeleteConfirm(null);
    } catch {
      // Handle error silently or show toast notification
    }
  };

  const handleEditUser = (user: User): void => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-xl font-bold'>User Management Dashboard</h1>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-muted-foreground'>
              Welcome, {user?.name}
            </span>
            <Button variant='outline' onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>
        <div className='space-y-6'>
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Manage all registered users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>{users.length}</div>
                  <div className='text-sm text-muted-foreground'>
                    Total Users
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>
                    {
                      users.filter(
                        user =>
                          new Date(user.createdAt) >
                          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                      ).length
                    }
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    New This Week
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>
                    {
                      users.filter(
                        user =>
                          new Date(user.updatedAt) >
                          new Date(Date.now() - 24 * 60 * 60 * 1000),
                      ).length
                    }
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Updated Today
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  A list of all registered users in the system
                </CardDescription>
              </div>
              <Button
                onClick={() => {
                  setShowUserForm(true);
                }}
              >
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className='font-medium'>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{formatDate(user.updatedAt)}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              handleEditUser(user);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => {
                              setShowDeleteConfirm(user.id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* User Form Modal */}
      {showUserForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          onCancel={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <Card className='w-full max-w-md'>
            <CardHeader>
              <CardTitle>Confirm Delete</CardTitle>
              <CardDescription>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex space-x-2 pt-4'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    handleDeleteUser(showDeleteConfirm).catch(() => {
                      // Error is handled in handleDeleteUser
                    });
                  }}
                  className='flex-1'
                >
                  Delete
                </Button>
                <Button
                  variant='outline'
                  onClick={() => {
                    setShowDeleteConfirm(null);
                  }}
                  className='flex-1'
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

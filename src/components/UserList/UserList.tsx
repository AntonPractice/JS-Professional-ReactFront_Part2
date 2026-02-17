import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './UserList.module.scss';
import type { User,  UserRole } from '../../types';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../store/api';

interface UserListProps {
  users: User[];
  isAdmin: boolean;
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, isAdmin, onSelectUser }) => {
  const [editingRole, setEditingRole] = useState<{ id: string; role: UserRole } | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleRoleChange = (userId: string, role: UserRole) => {
    setEditingRole({ id: userId, role });
  };

  const handleRoleBlur = async (userId: string) => {
    if (editingRole && editingRole.id === userId) {
      try {
        await updateUser({ id: userId, body: { role: editingRole.role } }).unwrap();
      } catch (err) {
        console.error('Ошибка обновления роли', err);
      } finally {
        setEditingRole(null);
      }
    }
  };

  const handleDelete = async (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Удалить пользователя?')) {
      try {
        await deleteUser(userId).unwrap();
      } catch (err) {
        console.error('Ошибка удаления пользователя', err);
      }
    }
  };

  return (
    <div className={styles.userList}>
      <Typography variant="h5" gutterBottom>
        Управление пользователями
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя пользователя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onSelectUser(user)}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {isAdmin ? (
                    <Select
                      value={editingRole?.id === user.id ? editingRole.role : user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      onBlur={() => handleRoleBlur(user.id)}
                      size="small"
                      sx={{ minWidth: 100 }}
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  ) : (
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === 'admin' ? 'secondary' : 'default'}
                    />
                  )}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {isAdmin && user.role !== 'admin' && (
                    <IconButton
                      color="error"
                      onClick={(e) => handleDelete(user.id, e)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
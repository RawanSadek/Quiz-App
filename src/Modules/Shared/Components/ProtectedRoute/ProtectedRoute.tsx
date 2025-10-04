import { Navigate } from 'react-router-dom';
import type { ProtectedRoutesProps } from '../../../../SERVICES/INTERFACES';

export default function ProtectedRoutes({children}:ProtectedRoutesProps) {

    const token=localStorage.getItem('token');
    const profile=localStorage.getItem('profile');

    if(token||profile) return children;
  else return <Navigate to='/login'/>
}
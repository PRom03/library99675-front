import {jwtDecode} from 'jwt-decode';

export function isAdmin()  {

        const token = localStorage.getItem('token');
        if (!token) return false;
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.role === 'admin';
}
export function isUser()  {

        const token = localStorage.getItem('token');
        if (!token) return false;
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.role === 'client';
}
export function isLibrarian()  {

        const token = localStorage.getItem('token');
        if (!token) return false;
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.role === 'librarian';
}

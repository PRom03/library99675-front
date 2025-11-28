import {jwtDecode} from 'jwt-decode';
export async function checkRole() {

        const token = localStorage.getItem('token');
        if (!token) return false;
        const decoded = jwtDecode(token);
        console.log(decoded);
        const res = await fetch(`http://localhost:8080/api/users/${decoded.sub}/role`);
        if(!res.ok) return await res.text();
        const role= await res.json();
        return role.role;

}
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

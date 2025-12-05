import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import BooksIndex from './pages/BooksIndex.jsx';
import BooksCreate from './pages/BooksCreate.jsx';
import BooksUpdate from './pages/BooksUpdate.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import UserPanel from "./pages/UserPanel.jsx";
import AuthorsIndex from "./pages/AuthorsIndex.jsx";
import PublishersIndex from "./pages/PublishersIndex.jsx";
import CategoriesIndex from "./pages/CategoriesIndex.jsx";
import AuthorsCreate from "./pages/AuthorsCreate.jsx";
import AuthorsUpdate from "./pages/AuthorsUpdate.jsx";
import PublishersUpdate from "./pages/PublishersUpdate.jsx";
import CategoriesUpdate from "./pages/CategoriesUpdate.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoansIndex from "./pages/LoansIndex.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import BookShow from "./pages/BookShow.jsx";
import AuthorShow from "./pages/AuthorShow.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import RecommendedBooks from "./pages/RecommendedBooks.jsx";
import PublishersCreate from "./pages/PublishersCreate.jsx";
import CategoriesCreate from "./pages/CategoriesCreate.jsx";

//import NotFound from './pages/NotFound';



function App() {
    return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Layout />} />

                    <Route path="publishers/create" element={<PublishersCreate />} />
                    <Route path="categories/create" element={<CategoriesCreate />} />

                     <Route path="books/create" element={<BooksCreate />} />
                    <Route path="books/:isbn/update" element={<BooksUpdate />} />


                    <Route path="panel" element={<UserPanel />} />
                    <Route path="loans" element={<LoansIndex />} />
                    <Route path="me/edit" element={<EditProfile />} />
                    <Route path="authors/create" element={<AuthorsCreate />} />
                    <Route path="authors/:id/update" element={<AuthorsUpdate />} />
                    <Route path="publishers/:id/update" element={<PublishersUpdate />} />
                    <Route path="categories/:id/update" element={<CategoriesUpdate />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="recommended" element={<RecommendedBooks />} />/
                    <Route path="books" element={<BooksIndex />} />
                    <Route path="authors" element={<AuthorsIndex />} />
                    <Route path="publishers" element={<PublishersIndex />} />
                    <Route path="books/:isbn" element={<BookShow />} />
                    <Route path="authors/:id" element={<AuthorShow />} />
                    <Route path="categories" element={<CategoriesIndex />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />


            </Routes>
    );
}

export default App;


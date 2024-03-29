import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'
import { paths } from '../../routes/admin/paths';
import { categoriesSelector, fetchCategories } from '../../store/slices/categoriesSlice';

export default function CategoriesLayout() {
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);

    useEffect(() => {
        if(!categories || categories.length < 1) {
            dispatch(fetchCategories);
        }

    }, []);

    return (
        <div className="px-2">
            
            <section>
                <h2>
                    <Link className="text-decoration-none text-body" to={paths.ADMIN_CATEGORIES}>Categories</Link>
                </h2>
            </section>

            <Outlet />

        </div>
    );
}

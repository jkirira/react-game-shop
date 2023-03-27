import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
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
                <h2>Categories</h2>
            </section>

            <Outlet />

        </div>
    );
}

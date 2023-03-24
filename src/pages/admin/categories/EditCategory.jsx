import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editCategoryApi, getCategoryApi } from "../../../apis/admin/categories";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import { toastNotifySuccess, toastNotifyError } from "../../../helpers";
import { categoriesSelectorById } from "../../../store/slices/categoriesSlice";

export default function EditCategory() {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);

    let { categoryId } = useParams();
    
    let categoryInState = useSelector(state => categoriesSelectorById(state, categoryId), shallowEqual);

    useEffect(() => {

        if(!!categoryInState) {
            setCategory(categoryInState);

        } else {
            getCategoryApi(categoryId)
                .then(response => {
                    setCategory(response.data.data.category);
                })
                .catch(error => {
                    toastNotifyError(error.response.data.message);
                })
        }

    }, [])

    const handleSubmit = (form_data) => {
        setLoading(true);

        editCategoryApi(categoryId, form_data)
            .then(response => {
                toastNotifySuccess(response.data.message);
            })
            .catch(error => {
                console.log(error);
                toastNotifyError(error.response.data.message);
            })
            .then(() => {
                setLoading(false);
            });

    }

    return (
        <div>
            <section>
                <h2>Edit Category</h2>
            </section>

            <section>
                <div className="ml-5 w-50 p-3">
                    <CategoryForm
                        category={category} 
                        handleFormSubmit={handleSubmit} 
                        disabled={loading} />
                </div>
            </section>

        </div>
    );
}

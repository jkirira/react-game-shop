import { useState } from "react";
import { addCategoryApi } from "../../../apis/admin/categories";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import { toastNotifySuccess, toastNotifyError } from "../../../helpers";

export default function AddCategory() {
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState(1);

    const handleSubmit = (form_data) => {
        setLoading(true);

        addCategoryApi(form_data)
            .then(response => {
                toastNotifySuccess(response.data.message);
                setFormKey(key => key += 1);
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
                <h2>Add Category</h2>
            </section>

            <section>
                <div className="ml-5 w-50 p-3">
                    <CategoryForm key={formKey} handleFormSubmit={handleSubmit} disabled={loading} />
                </div>
            </section>

        </div>
    );
}
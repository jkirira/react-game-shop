import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCategoryApi } from "../../../apis/admin/categories";
import EditCategoryModal from "../../../components/admin/categories/EditCategoryModal";
import { toastNotifyError } from "../../../helpers";
import { categoriesSelectorById } from "../../../store/slices/categoriesSlice";

export default function ViewCategory() {
    const [category, setCategory] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    let { categoryId } = useParams();
    
    let categoryInState = useSelector(state => categoriesSelectorById(state, categoryId));

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


    const openEditModal = useCallback(() => {
        setShowEditModal(true);
    }, []);

    const closeEditModal = useCallback(() => {
        setShowEditModal(false);
    }, []);


    return (
        <div>

            <section>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h3 className="display-5 fw-bold">{category?.name}</h3>
                        <div className="col-md-8 fs-4">
                            <p><strong>Name: </strong>{category?.name}</p>
                        </div>
                        <button className="btn btn-primary btn-lg" type="button" onClick={() => openEditModal()}>Edit</button>
                    </div>
                </div>
            </section>

            <EditCategoryModal showModal={showEditModal} closeModal={closeEditModal} categoryId={category?.id} />

        </div>
        
    );
}

import { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { fetchCategoriesApi } from "../../../apis/admin/categories.js";
import { categoriesSelector, setCategories } from "../../../store/slices/categoriesSlice.js";
import { toastNotifyError } from "../../../helpers.js";
import AddCategoryModal from "../../../components/admin/categories/AddCategoryModal.jsx";
import EditCategoryModal from "../../../components/admin/categories/EditCategoryModal.jsx";
import DeleteCategoryModal from "../../../components/admin/categories/DeleteCategoryModal.jsx";

export default function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);


    useEffect(() => {
        fetchCategoriesApi()
                .then(response => {
                    dispatch(setCategories(response.data.data));
                })
                .catch(error => {
                    console.log(error);
                    toastNotifyError('Something went wrong. Could not fetch categories.');
                })
    }, []);


    const closeAddModal = useCallback(() => {
        setShowAddModal(false);
    }, []);

    const openEditModal = useCallback((category_id) => {
        setSelectedCategoryId(category_id);
        setShowEditModal(true);
    }, []);

    const closeEditModal = useCallback(() => {
        setShowEditModal(false);
        setSelectedCategoryId(null);
    }, []);
    
    const openDeleteModal = useCallback((category_id) => {
        setSelectedCategoryId(category_id);
        setShowDeleteModal(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setShowDeleteModal(false);
        setSelectedCategoryId(null);
    }, []);


    return (
        <div className="px-2">
            
            <section>
                <h2>Categories</h2>
            </section>
            
            <section className="d-flex justify-content-end">
                <p className="text-primary cursor-pointer"><u onClick={() => setShowAddModal(true)}>Add Category</u></p>
            </section>

            <section>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (categories?.length > 0)
                            ?   categories.map(category => (
                                        <tr key={ category.id }>
                                            <td>{ category.id }</td>
                                            <td>{ category.name }</td>
                                            <td>{ format(parseISO(category.createdAt), 'yyyy-MM-dd') }</td>
                                            <td>
                                                <FontAwesomeIcon className="text-primary me-3 cursor-pointer" icon={faPenToSquare} onClick={() => openEditModal(category.id)} />
                                                <FontAwesomeIcon className="text-primary me-3 cursor-pointer" icon={faTrashCan} onClick={() => openDeleteModal(category.id)} />
                                            </td>
                                        </tr>
                                    )
                                )

                            :   <tr>
                                    <td className="text-center" colSpan="100">No categories found.</td>
                                </tr>

                    }
                    </tbody>
                </Table>
            </section>

            <AddCategoryModal showModal={showAddModal} closeModal={closeAddModal} />

            <EditCategoryModal showModal={showEditModal} closeModal={closeEditModal} categoryId={selectedCategoryId} />
            
            <DeleteCategoryModal showModal={showDeleteModal} closeModal={closeDeleteModal} categoryId={selectedCategoryId} />

        </div>
      );
}

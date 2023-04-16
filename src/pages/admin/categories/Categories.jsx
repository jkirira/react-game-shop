import { useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { categoriesSelector } from "../../../store/slices/categoriesSlice.js";
import AddCategoryModal from "../../../components/admin/categories/AddCategoryModal.jsx";
import EditCategoryModal from "../../../components/admin/categories/EditCategoryModal.jsx";
import DeleteCategoryModal from "../../../components/admin/categories/DeleteCategoryModal.jsx";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "../../../routes/admin/paths.js";

export default function Categories() {
    const navigate = useNavigate();
    const categories = useSelector(categoriesSelector);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const closeAddModal = useCallback(() => {
        setShowAddModal(false);
    }, []);

    const openEditModal = useCallback((category_id, e) => {
        setSelectedCategoryId(category_id);
        setShowEditModal(true);
        e.stopPropagation();
    }, []);

    const closeEditModal = useCallback(() => {
        setShowEditModal(false);
        setSelectedCategoryId(null);
    }, []);
    
    const openDeleteModal = useCallback((category_id, e) => {
        setSelectedCategoryId(category_id);
        setShowDeleteModal(true);
        e.stopPropagation();
    }, []);

    const closeDeleteModal = useCallback(() => {
        setShowDeleteModal(false);
        setSelectedCategoryId(null);
    }, []);


    return (
        <div>
            
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

                                        <tr onClick={() => navigate(generatePath(paths.ADMIN_CATEGORIES_VIEW, {categoryId: category.id}))}
                                            key={ category.id }
                                            className="cursor-pointer"
                                        >
                                            <td>{ category.id }</td>
                                            <td>{ category.name }</td>
                                            <td>{ format(parseISO(category.createdAt), 'yyyy-MM-dd') }</td>
                                            <td>
                                                <FontAwesomeIcon className="text-primary me-3 cursor-pointer" icon={faPenToSquare} onClick={(e) => openEditModal(category.id, e)} />
                                                <FontAwesomeIcon className="text-danger me-3 cursor-pointer" icon={faTrashCan} onClick={(e) => openDeleteModal(category.id, e)} />
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

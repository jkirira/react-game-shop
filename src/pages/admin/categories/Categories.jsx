import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { fetchCategoriesApi } from "../../../apis/admin/categories.js";
import { categoriesSelector, setCategories } from "../../../store/slices/categoriesSlice.js";
import { toastNotifyError } from "../../../helpers.js";
import { paths } from "../../../routes/admin/paths.js";
import DeleteCategoryModal from "../../../components/admin/categories/DeleteCategoryModal.jsx";

export default function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);

    const [showModal, setShowModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

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

    const showDeleteModal = (category_id) => {
        setDeleteCategoryId(category_id);
        setShowModal(true);
    }

    const closeDeleteModal = () => {
        setShowModal(false);
        setDeleteCategoryId(null);
    }

    return (
        <div className="px-2">
            
            <section>
                <h2>Categories</h2>
            </section>
            
            <section className="d-flex justify-content-end">
                <Link to={paths.ADMIN_CATEGORIES_CREATE}>
                    Add Category
                </Link>
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
                                            <td className="d-flex align-items-center">
                                                <Link className="me-3" to={generatePath(paths.ADMIN_CATEGORIES_EDIT, { categoryId: category.id })}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                                <FontAwesomeIcon className="me-3 cursor-pointer" icon={faTrashCan} onClick={() => showDeleteModal(category.id)} />
                                            </td>
                                        </tr>
                                    )
                                )

                            :  <tr>
                                    <td className="text-center" colSpan="100">No categories found.</td>
                                </tr>

                    }
                    </tbody>
                </Table>
            </section>

            <DeleteCategoryModal showModal={showModal} closeModal={closeDeleteModal} categoryId={deleteCategoryId} />

        </div>
      );
}

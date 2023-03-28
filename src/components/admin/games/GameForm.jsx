import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { parseISO, format } from "date-fns";

import { fetchCategoriesApi } from "../../../apis/admin/categories.js";
import { toastNotify } from "../../../helpers.js";
import { categoriesSelector, setCategories } from "../../../store/slices/categoriesSlice.js";

export default function GameForm({handleFormSubmit, game=null, disabled=false}) {
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);

    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryIdRef = useRef(null);
    const releaseDateRef = useRef(null);
    const trailerLinkRef = useRef(null);
    const ratingRef = useRef(null);
    const priceRef = useRef(null);
    const quantityRef = useRef(null);
    const developedByRef = useRef(null);
    const posterRef = useRef(null);
    const submitButtonRef = useRef(null);


    useEffect(() => {
        if(categories.length < 1) {
            fetchCategoriesApi()
                .then(response => {
                    dispatch(setCategories(response.data.data));
                })
                .catch(error => {
                    console.log(error);
                    toastNotify({message: 'Could not fetch categories.', type: 'error'});
                })
        }
    }, [])


    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(submitButtonRef.current) {
            submitButtonRef.current.disabled = true;
        }

        let form_data = {};

        form_data['name'] = nameRef.current?.value;
        form_data['description'] = descriptionRef.current?.value;
        form_data['category_id'] = categoryIdRef.current?.value;
        form_data['release_date'] = releaseDateRef.current?.value;
        form_data['trailer_link'] = trailerLinkRef.current?.value;
        form_data['rating'] = ratingRef.current?.value;
        form_data['price'] = priceRef.current?.value;
        form_data['quantity'] = quantityRef.current?.value;
        form_data['developed_by'] = developedByRef.current?.value;
        form_data['poster'] = posterRef.current?.value;

        handleFormSubmit(form_data);

    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={game?.name} ref={nameRef} type="text" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control defaultValue={game?.description} ref={descriptionRef} as="textarea" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" defaultValue={game?.category_id ?? undefined} ref={categoryIdRef} aria-label="Category" required >
                        <option>Pick a category</option>
                        {
                            categories.map(category => <option key={category.id} value={category.id}>{ category.name }</option>)
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="releaseDate">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control defaultValue={game?.release_date ? format(parseISO(game.release_date), 'yyyy-MM-dd') : ''} ref={releaseDateRef} type="date" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="trailerLink">
                    <Form.Label>Trailer Link</Form.Label>
                    <Form.Control defaultValue={game?.trailer_link} ref={trailerLinkRef} type="text" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control defaultValue={game?.rating} ref={ratingRef} type="number" step="0.01" max={10} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control defaultValue={game?.price} ref={priceRef} type="number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control defaultValue={game?.quantity} ref={quantityRef} type="number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="developedBy">
                    <Form.Label>Developed By</Form.Label>
                    <Form.Control defaultValue={game?.developed_by} ref={developedByRef} type="text" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="poster">
                    <Form.Label>Poster</Form.Label>
                    <Form.Control defaultValue={game?.poster} ref={posterRef} type="text" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="poster">
                    <Button ref={submitButtonRef} variant="primary" type="submit" disabled={disabled}>
                        Submit
                    </Button>
                </Form.Group>

            </Form>

        </>
      );
}

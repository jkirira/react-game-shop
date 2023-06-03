import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/Sidebar.jsx";

import { fetchGamesApi } from "../apis/client/games.js";
import { toastNotify } from "../helpers.js";
import { gamesSelector, gamesSelectorById, setGames } from "../store/slices/gamesSlice.js";

import "../assets/scss/home.scss";
import defaultImageLogo from "../assets/images/image-regular-cropped.svg";


export default function Home() {
    const dispatch = useDispatch();

    const [showSidebar, setShowSidebar] = useState();
    const [selectedGameId, setselectedGameId] = useState();

    const games = useSelector(gamesSelector);
    const selectedGame = useSelector(state => gamesSelectorById(state, selectedGameId), shallowEqual);


    useEffect(() => {
        fetchGamesApi()
            .then(response => {
                dispatch(setGames(response.data.data));
            })
            .catch(error => {
                console.log(error);
                toastNotify({message: 'Something went wrong. Could not fetch games.', type: 'error'});
            })
    }, []);

    const showFallbackImage = (e) => {
        e.target.src = defaultImageLogo;
    }

    const openGameInSidebar = (game_id) => {
        setselectedGameId(game_id);
        setShowSidebar(true);
    }

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    return (
        <div className="d-flex flex-row position-relative">
            <Container fluid>
                <Row className="g-2">
                {
                    games.map(game => (
                        <Col key={ game.id }>
                            <Card className="game-card cursor-pointer" onClick={() => openGameInSidebar(game.id)}>
                                <Card.Img className="game-card-image" src={ game?.poster } alt="Card image" onError={(e) => showFallbackImage(e)} />
                                <Card.ImgOverlay className="overlay">
                                    <Card.Title>{ game.name }</Card.Title>
                                    {
                                        game.developed_by

                                        &&

                                        <Card.Text as="h6">
                                            { game.developed_by }
                                        </Card.Text>
                                    }
                                    <Card.Text>
                                        { game.description }
                                    </Card.Text>
                                    <div className="d-flex">
                                        <Card.Text className="align-self-start">
                                            { game.rating }
                                        </Card.Text>
                                        <Card.Text className="align-self-end">
                                            { game.category?.name }
                                        </Card.Text>
                                    </div>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    ))
                }
                </Row>
            </Container>

            <Sidebar
                handleCloseSidebar={closeSidebar}
                show={showSidebar}
            >

                <div className="game-sidebar py-2 px-3">
                    <div className="game-sidebar-close-section d-flex pt-2 pb-3 px-2">
                        <FontAwesomeIcon className="ms-auto cursor-pointer" role="button" icon={ faClose } onClick={() => closeSidebar()} />
                    </div>
                    
                    <div className="game-sidebar-content">
                        <div className="game-sidebar-content-image"></div>
                        <div className="game-sidebar-content-body">
                            <section className="game-sidebar-body-title">
                                <div className="title-section">
                                    <h2>{selectedGame?.name}</h2>
                                    <small>{selectedGame?.Category?.name}</small>
                                    <div className="mt-4">
                                        <Button variant="success">Add to Cart</Button>
                                    </div>
                                </div>
                                <div className="rating-section">
                                    <h1 className="ms-2 ms-md-0">{selectedGame?.rating}</h1>
                                    <p>Rating</p> {' '}
                                </div>
                            </section>
                            <section className="game-sidebar-body-text pt-5">
                                <p>{ selectedGame?.description }</p>
                                <br />
                                <p>Release date: {selectedGame?.release_date ? format(parseISO(selectedGame.release_date), 'MMMM do, y') : ""}</p>
                            </section>
                        </div>
                    </div>
                </div>

            </Sidebar>

            
        </div>
    );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import { fetchGamesApi } from "../apis/client/games.js";
import { toastNotify } from "../helpers.js";

import { gamesSelector, setGames } from "../store/slices/gamesSlice.js";
import "../assets/scss/games.scss";
import defaultImageLogo from "../assets/images/image-regular-cropped.svg";

export default function Home() {
    const dispatch = useDispatch();
    const games = useSelector(gamesSelector);

    useEffect(() => {
        fetchGamesApi()
            .then(response => {
                dispatch(setGames(response.data.data));
            })
            .catch(error => {
                console.log(error);
                toastNotify({message: 'Something went wrong. Could not fetch games.', type: 'error'});
            })
    }, [])

    const showFallbackImage = (e) => {
        e.target.src = defaultImageLogo;
    }

    return (
        <>
            <Row xs={1} md={3} className="g-4">
            {
                games.map(game => (
                    <Col key={ game.id }>
                        <Card className="game-card cursor-pointer">
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
        </>
    );
}

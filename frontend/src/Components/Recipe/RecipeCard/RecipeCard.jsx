import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import UserCard from '../../User/UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowingTheFullListFalse, setRecipes } from '../../../store/recipes-slice';
import { jwtDecode } from 'jwt-decode';

const RecipeCard = ({ id, title, description, image, steps, ingredients, tags, userId }) => {
    const [likesAmount, setLikesAmount] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const likes = useSelector(state => state.likes.likes);
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const [isLiked, setIsLiked] = useState(false);

    const checkIfLiked = useCallback(() => {
        if (likes.length === 0) {
            setIsLiked(false);
            return;
        }
        const liked = likes.some(like => like.recipeId === id);
        liked ? setIsLiked(true) : setIsLiked(false);
    }, [likes, id]);

    const loadRecipesByTag = async (tagName) => {
        const response = await fetch(`http://localhost:3001/recipes/bytag/${tagName}`)
        const data = await response.json();
        dispatch(setRecipes(data));
        dispatch(setIsShowingTheFullListFalse())
    }

    const getLikes = useCallback(() => {
        fetch(`http://localhost:3001/likes/byrecipe/${id}`)
            .then((response) => response.json())
            .then((data) => setLikesAmount(data.length))
            .catch((error) => { alert(error.message) })
    }, [id]);

    const addLike = (recipeId) => {
        let like = {
            userId: jwtDecode(token).id,
            recipeId: recipeId
        };
        fetch('http://localhost:3001/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(like)
        })
            .then(response => response.json())
            .then(data => {
                setLikesAmount(prevLikes => data.message.includes("added") ? prevLikes + 1 : prevLikes - 1);
                setIsLiked(data.message.includes("added") ? true : false);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        getLikes();
        checkIfLiked();
    }, [getLikes, checkIfLiked]);

    return (
        <div className="recipe-card bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
            <p className="mb-4">{description}</p>
            <div className="flex justify-center mb-4">
                <img src={image} className="w-40 h-40" alt={title} />
            </div>
            <div className="mb-4">
                <h4 className="font-semibold">Ingredients:</h4>
                <ul className="list-none">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name}</li>
                    ))}
                </ul>
            </div>
            {showMore && (
                <div className='show-more mb-4'>
                    <div className="text-center mb-4">
                        <h4 className="font-semibold">Steps:</h4>
                        <p>{steps}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Tags:</h4>
                        {tags.map((tag, index) => (
                            <span key={index}>
                                <button onClick={() => loadRecipesByTag(tag.name)} className="mr-2 mb-2 py-1 px-3 bg-primary text-white rounded-md">{tag.name}</button>
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-center"><UserCard id={userId} /></div>
                </div>
            )}
            <div className="flex items-center justify-center mb-4">
                <div className="cursor-pointer transform scale-125 mr-2">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        onClick={() => addLike(id)}
                        className={isLiked ? 'text-primary' : 'text-gray-400'}
                    />
                </div>
                <p className="text-lg font-semibold">{likesAmount}</p>
            </div>
            <button className="button bg-primary text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-accent1" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show Less' : 'Show More'}
            </button>
        </div>
    );
};

export default RecipeCard;

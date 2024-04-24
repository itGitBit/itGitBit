import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import errorHandler from "../../errors/error-handler";
import { toast } from "react-toastify";
import { getAllData } from "../../../utils/apiCalls";
import { setAllTagsList } from "../../../store/tags-slice";
import { addToSelectedIngredientList, setFullIngredientList } from "../../../store/ingredient-search-slice";
import { jwtDecode } from "jwt-decode";
import { Combobox } from "react-widgets";



const AddRecipe = () => {
    const dispatch = useDispatch();
    const title = useRef('');
    const description = useRef('');
    const image = useRef('');
    const steps = useRef('');
    const [tags, setTags] = useState([]);
    const token = useSelector(state => state.user.token);
    const userId = token ? jwtDecode(token).id : null;
    const allExistingIngredients = useSelector(state => state.ingredientsSearch.fullIngredientsList);
    const allTheTags = useSelector(state => state.tags.allTagsList);
    const [selectedIngredients, setSelectedIngredients] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    return (
        <div>
            <h1>Add Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" ref={title} placeholder="enter title" required />
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" ref={description} placeholder="enter description" required />
                <label htmlFor="image">Image:</label>
                <input type="text" id="image" ref={image} placeholder="enter image url" required />
                <label htmlFor="steps">Steps:</label>
                <textarea id="steps" type="text" ref={steps} placeholder="Enter steps" required />
                <label htmlFor="tags">Tags:</label>
                <Combobox placeholder="Enter Tags" data={allTheTags} textField="name" />
                <label htmlFor="ingredients">Ingredients:</label>
                <Combobox placeholder="Enter Ingredients" data={allExistingIngredients} onChange={setSelectedIngredients} value={selectedIngredients} textField="name" />
            </form>

        </div>
    )


    // const title = useRef('');
    // const description = useRef('');
    // const image = useRef('');
    // const steps = useRef('');
    // const newTag = useRef('');
    // const fullIngredientsList = useSelector(state => state.ingredientsSearch.fullIngredientsList)
    // const token = useSelector(state => state.user.token);
    // const ingredientListToRecipe = useSelector(state => state.ingredientsSearch.ingredientListToRecipe);
    // const tags = useSelector(state => state.tags.allTagsList)
    // const [newTags, setNewTags] = useState([]);
    // const [tagsToRecipe, setTagsToRecipe] = useState([]);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newRecipe = {
    //         title: title.current.value,
    //         description: description.current.value,
    //         image: image.current.value,
    //         steps: steps.current.value,
    //         tags: tagsToRecipe,
    //         ingredients: ingredientListToRecipe
    //     }
    //     const approval = await performAddRecipe(newRecipe);
    //     toast.success(approval.details);
    //     return approval;
    // }

    // const addTagToList = (e) => {
    //     const tag = tags.find(tag => tag.name === e.target.value);
    //     tagsToRecipe.find(tag => tag.name === e.target.value) ? toast.error('Tag already added') : setTagsToRecipe([...tagsToRecipe, tag]);
    // }


    // const performAddRecipe = async (newRecipe) => {
    //     try {

    //         const response = await fetch('http://localhost:3001/recipes', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify(newRecipe)
    //         });
    //         const data = await response.json();
    //         if (!response.ok) {
    //             errorHandler(data.details);
    //         }
    //         return data;
    //     }
    //     catch (error) {
    //         errorHandler(error);
    //     }
    // }

    // const handleTagAddition = () => {
    //     let tagName = newTag.current.value;
    //     const tag = tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
    //     if (tag) {
    //         tagsToRecipe.find(tag => tag.name.toLowerCase() === tagName.toLowerCase()) ? toast.error('Tag already added') : setTagsToRecipe([...tagsToRecipe, tag]);
    //     }
    //     else {
    //         const newTag = { name: tagName };
    //         tagsToRecipe.find(tag => tag.name === tagName) ? toast.error('Tag already added') : setTagsToRecipe([...tagsToRecipe, newTag]);
    //     }
    // }


    // const handleIngredientAddition = (e) => {
    //     const ingredient = fullIngredientsList.find(ingredient => ingredient.name === e.target.value);
    //     dispatch(addToSelectedIngredientList(ingredient));
    // }

    // const getAllingredients = async () => {
    //     const fetchedIngredients = await getAllData("ingredients");
    //     dispatch(setFullIngredientList(fetchedIngredients));
    // }

    // const getAllTags = async () => {
    //     const fetchedTags = await getAllData("tags");
    //     dispatch(setAllTagsList(fetchedTags));
    // }

    // useEffect(() => {
    //     getAllTags();
    //     getAllingredients();
    // }, []);

    // return (
    //     <div>
    //         <h1>Add Recipe</h1>
    //         <form onSubmit={handleSubmit}>
    //             <label>Title:</label>
    //             <input type="text" ref={title} placeholder="enter title" required />
    //             <label>Description:</label>
    //             <input type="text" ref={description} placeholder="enter description" required />
    //             <label>Image:</label>
    //             <input type="text" ref={image} placeholder="enter image url" required />
    //             <label>Steps:</label>
    //             <textarea
    //                 type="text"
    //                 ref={steps}
    //                 placeholder="Enter steps"
    //                 required
    //                 style={{
    //                     resize: 'none',
    //                     border: '1px solid #ccc',
    //                     borderRadius: '4px',
    //                     padding: '8px',
    //                     maxHeight: '100px',
    //                     overflowY: 'scroll'
    //                 }}
    //             />


    //             <label>Ingredients: </label>
    //             <select onChange={handleIngredientAddition}>
    //                 <option value="0">Select Ingredient</option>
    //                 {fullIngredientsList && fullIngredientsList.map(ingredient => <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>)}
    //             </select>
    //             <div>
    //                 {ingredientListToRecipe.length > 1 && ingredientListToRecipe.map((ingredient, index) => {
    //                     return (
    //                         <p key={index}>{ingredient.name}</p>
    //                     )
    //                 })}
    //             </div>
    //             <label>Tags:</label>
    //             <select onChange={addTagToList}>
    //                 <option value="0">Select Tag</option>
    //                 {tags.map(tag => <option key={tag.id} value={tag.name}>{tag.name}</option>)}
    //             </select>
    //             <input type="text" placeholder="enter new tag" ref={newTag} />
    //             <button type="button" onClick={handleTagAddition}>Add Tag</button>
    //             <button type="submit">Submit Recipe</button>
    //         </form>
    //         <div>
    //             {tagsToRecipe.map((tag, index) => {
    //                 return (
    //                     <p key={index}>{tag.name}</p>
    //                 )
    //             })}
    //         </div>
    //     </div>
    // );
}
export default AddRecipe;
import errorHandler from "../Components/errors/error-handler";



const getData = async (id, dataName) => {
    try {
        const response = await fetch(`http://localhost:3001/${dataName}/${id}`) // Return the fetch promise
            ;
        return await response.json();
    } catch (error) {
        errorHandler(error);
    }
}


const addData = (data, dataName) => {
    fetch(`http://localhost:3001/${dataName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => { return data })
        .catch((error) => {
            errorHandler(error);
        })
}

const getAllData = async (dataName) => {
    try {
        const response = await fetch(`http://localhost:3001/${dataName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

const login = async (data) => {
    try {
        const response = await fetch(`http://localhost:3001/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
if(response.error){
    alert(response.error);
}
        return await response.json();
    } catch (error) {
        errorHandler(error);
    }
}


export { login, addData, getData, getAllData };
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://vnu-ept-training.herokuapp.com/'
});


export default instance;
import { fetchData } from "../index.js";
import { resizeImageContent, setContentElements} from "./home.js";


fetchData()
    .then(data => {
        createMovieContainer(data)
})


const createMovieContainer = (data) => {
    const container = document.querySelector('.tv-series-container > .tv-series-list')

    updateContent(container, data)

}


const updateContent = (container, data, key) => {
    console.log(data)
    
    for (let key in data) {
        const resizeImage = resizeImageContent(data, key);

        if (data[key].category === "TV Series") {
            setContentElements(container, resizeImage, data, key)
        }
    }
}

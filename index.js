import { fetchNavigation } from "./script/component.js";

document.addEventListener('DOMContentLoaded', function () {
    // Fetch navigation content
    fetchNavigation();
});


export const fetchData = async () => {
    return fetch('data.json')
        .then(response => response.json())
        .then(data => {
            return data
        })
}



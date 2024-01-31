import { fetchData } from "../index.js"


fetchData()
    .then(data => {

        createTrendingContent(data)
        createRecommendedContent(data);

    })
    .catch(error => {
    })


    const createTrendingContent = (data) => {
        const container = document.querySelector('.trending-container > .trend-list');
        let isRecommendedTrending = true;
            
        
        updateContent(container, data, isRecommendedTrending);


        window.addEventListener('resize', updateContent)
        


    }


    const createRecommendedContent = (data) => {
        const container = document.querySelector('.recommended-container > .recommended-list');
        let isRecommendedTrending = false;
    
        // Initial content setup
        updateContent(container, data, isRecommendedTrending);
    
        // Listen for window resize event and update content
        window.addEventListener('resize', updateContent);
    
        console.log(container);
    };


     const updateContent = (container, data, isRecommendedTrending) => {
        // Clear existing content
        container.innerHTML = '';

        for (let key in data) {
           

            // Call resizeImageContent directly to get the image URL
            const imageUrl = resizeImageContent(data, key);

            if (data[key].isTrending === isRecommendedTrending) {
                setContentElements(container, imageUrl, data, key)
            }
        }
    };

    export const setContentElements = (container, imageUrl, data, key) => {
        const content = document.createElement('div');
        content.setAttribute('class', '');


        content.innerHTML = `
                        <img src="${imageUrl}">
                        <div class="description">
                        <h4>${data[key].title}</h4>

                        <p class="information">
                            <span class="year">${data[key].year}</span>
                            <span class="category">${data[key].category}</span>
                            <span class="rating">${data[key].rating}</span>
                        </p>
                        </div>
                        <button class="bookmark-btn">
                             <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" stroke-width="1.5" fill="none"/></svg>
                        </button>
                        <button class="play-btn">
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z" fill="#FFF"/></svg>
                            Play now
                        </button>
                           
                      
                    `;

        const bookmarkButton = content.querySelector('.bookmark-btn');

        bookmarkButton.addEventListener('click', e => bookmarkListener(e, data[key]));
            
        container.appendChild(content);
    }



   const bookmarkListener = (e, data) => {
        let isBookmarked = data.isBookmarked;

        if (!isBookmarked) { 
            data.isBookmarked = true;
            e.srcElement.classList.add('bookmarked');
            console.log(data)
       } else {
            data.isBookmarked = false;
            e.srcElement.classList.remove('bookmarked');
            console.log(data)
        }
       
   }
   export const resizeImageContent = (data, key) => {
        const widthResize = window.innerWidth;
    
        // Return the appropriate image URL based on the window width
        if (widthResize >= 1010) {
            return data[key].thumbnail.regular.large;
        } else if (widthResize >= 678) {
            return data[key].thumbnail.regular.medium;

            
        }else {
            // Handle other cases if needed
            // For now, return a default or smaller image URL
            return data[key].thumbnail.regular.small;
        }
    };
    


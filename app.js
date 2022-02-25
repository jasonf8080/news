const articlesSection = document.querySelector('.articles-section');
const headerArticlesSection = document.querySelector('.header-2');
const categorySelectors = document.querySelectorAll('.tab-item');
const slider = document.querySelector('.slider');
const progress = document.querySelector('.progress');



//event listeners
categorySelectors.forEach(category => {
    category.addEventListener('click', selectCategory);
}); 


//return data from posts.json
async function getCategories(){
   const res = await fetch(`posts.json`);
   const data = await res.json();
   return data;
}


//display sports articles as default
window.addEventListener('DOMContentLoaded', setupSports);
async function setupSports(){
    let articles = await getCategories();
    articles = articles.articles;

    let sports = [];
    for(let i = 0; i < articles.length; i++){
        if(articles[i].category === 'Sports'){
            sports.push(articles[i]);
        }
    }
    setupCategories(sports);
}



//setup header articles
async function setupArticlesInHeader(){
    let articles = await getCategories();
    articles = articles.articles;
    let headerArticles = [];

    for(let i = 0; i < articles.length; i++){
        if(articles[i].header2 === true){
            headerArticles.push(articles[i]);
        }
    }
    
    headerArticles = headerArticles.map(article => {
        return `<a href="${article.url}" class="header-2-item" data-id="${article.category}">
        <img src="${article.urlToImage}">
        <div class="content">
            <p class="category ${article.category.toLowerCase()}">${article.category}</p>
            <p>${article.title}</p>
        </div>
        </div>`
    }).join('');


    headerArticlesSection.innerHTML = headerArticles;
}

setupArticlesInHeader();


//setup articles in article section
async function setupCategories(array){
    let articles = await getCategories();
    articles = articles.articles;
    //console.log(articles);

    
     array = array.map(article => {
        return `<a href="${article.url}" class="article" id="${article.category}">
            <img class="article-img" src="${article.urlToImage}">
            <div class="article-content">
                <p class="category ${article.category.toLowerCase()}">${article.category}</p>
                <p class="title">${article.title}</p>
               
            </div>
        </a>`;
    }).join('');
    console.log(array);
    articlesSection.innerHTML = array; 
}



//when category is selected, display category articles
async function selectCategory(e){
    updateTabColor(e);

   const category = e.currentTarget.children[0].textContent.toLowerCase();
   let categoryArray = [];

        
   let articles = await getCategories();
   articles = articles.articles;

   for(let i = 0; i < articles.length; i++){
       if(category === articles[i].category.toLowerCase()){
           categoryArray.push(articles[i]);
       }
   }

   setupCategories(categoryArray);
}



//update color of selected category
function updateTabColor(e){
    const currentCategory = e.currentTarget;
    let className = e.currentTarget.children[0].textContent;
    className = className.toLowerCase();
    

    categorySelectors.forEach(categorySelector => {
        categorySelector.style.color = `black`;
        currentCategory.style.color = `white`;
    })

    for(let i = 0; i < categorySelectors.length; i++){
       if(currentCategory === categorySelectors[i]){
           const index = i;
           slider.style.transform = `translateX(${index}00%)`;
           
           slider.classList = `slider ${className}`;

       }
    }
}

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    autoplay:  true,
    autoplayTimeout: 3000,
    dots:  false,
    responsive: {
        600:{
            items:1
        },
        800:{
            items:2
        },

        1024:{
            items: 3
        },

        1025:{
            items: 4
        }

    }
})



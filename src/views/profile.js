import Controller from "../controller/controller";

export default class Profile {
    #container;
    constructor(container){
        this.#container= container;
        this.clearContainer(); 
        this.controller = new Controller(this);
        this.controller.loadFavoriteToProfile().then((favorities)=> {
            console.log(favorities);
            this.favorites = favorities? Object.values(favorities): [];
            this.showContainer();
            this.renderFavoriteList();
        })
    }
    clearContainer() {
        this.#container.innerHTML = '';
     }   
     showContainer() {
        this.paintingContainer = document.createElement('div');
        this.paintingContainer.classList.add('profile-container');

        this.paintingContainerName = document.createElement('h1');
        this.paintingContainerName.innerHTML = `Your Favorite Art Collection`;
        this.paintingContainer.append(this.paintingContainerName); 
        
        this.paintingItemsContainer = document.createElement('div');
        this.paintingItemsContainer.classList.add('painting-items-container');
        this.paintingContainer.append(this.paintingItemsContainer); 


        const pageContainer = document.querySelector('#page');
        pageContainer.appendChild(this.paintingContainer);
        this.renderFavoriteList();
     };
     renderFavoriteList = () => {
        this.paintingItemsContainer.innerHTML ='';
        console.log(this.favorites);
            this.favorites.forEach((favorite)=>{
                const id = Object.keys(favorite)[0];
                this.paintingItem = document.createElement('div');     
                this.paintingItem.classList.add('painting-item');

                this.imageItem = document.createElement('img');
                this.imageItem.src = favorite[id].imageURL;
                console.log(this.imageItem.src);
               this.paintingItem.append(this.imageItem);

                this.descriptionItem = document.createElement('p');
                this.descriptionItem.textContent = favorite[id].description;
                this.paintingItem.append(this.descriptionItem);

                const paintingContainer = document.querySelector('.painting-items-container'); 
                paintingContainer.append(this.paintingItem);
            });
     };
}
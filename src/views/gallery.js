import Controller from "../controller/controller";

export default class Gallery {
    #inputSearch;
    constructor(container) {
        this.container = container;
        this.clearContainer();
        this.showForm();
        this.createGalleryContainer();
        this.controller = new Controller(this);
        this.handleGallery();
        this.updateImageUrls();
        this.createFallingImages();
    }
    clearContainer() {
        this.container.innerHTML = '';
    }
    handleGallery() {
        const input = document.querySelector("#search");
        const button = document.querySelector("#found");
        input.addEventListener("input", (e) => {
          this.#inputSearch = e.target.value;
        });
        button.addEventListener("click", () => {
          this.controller.handleSearch(this.#inputSearch)
        });
      };
    showForm() {
        const formSection = document.createElement('div');
        formSection.classList.add('form-container');

        formSection.innerHTML = `
  <form class="form-section">
    <h1> Virtual Art Gallery </h1>
    <div class="card">
      <input  id="search" type="text" placeholder="Search Pictures"/>
      <button id="found" type="button">Search</button>
    </div>
    <p class="read-the-docs">
    Click Search to find the Art
  </p>
  </form>
`;
        this.container.appendChild(formSection);
    }
    showPaintings(paintings, handler) {
        this.galleryContainer.innerHTML = '';
        this.container.classList.add('gallery-open');
        paintings.forEach((element) => {
            const paintingMain = document.createElement('div');
            paintingMain.classList.add('painting-container');
            this.galleryContainer.appendChild(paintingMain);

            const image = document.createElement('img');
            image.classList.add('painting-img');
            image.src = element.image ? element.image : "https://raw.githubusercontent.com/pawlinka/svg/main/9848.900.jpg";
            image.alt = element.title ? element.title : "Title Not Found";
            image.addEventListener("click", handler(element.id));
            paintingMain.appendChild(image);

            const title = document.createElement('h1');
            title.textContent = element.title ? element.title : "Title Not Found";
            title.addEventListener("click", handler(element.id));
            paintingMain.appendChild(title);
        });
    };
    showDescription = (imageURL, description, id) => {
        console.log("showDescription called:", imageURL, description);
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const image = document.createElement('img');
        image.src = imageURL;
        image.classList.add('modal-image');
        modalContent.appendChild(image);

        const descriptionMain = document.createElement('p');
        descriptionMain.textContent = description;
        modalContent.appendChild(descriptionMain);

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.textContent = "Close";
        closeButton.addEventListener('click', () => {
            this.hideModal(modal);
        });
        modalContent.appendChild(closeButton);

        const closeIcon = document.createElement('span');
        closeIcon.classList.add('close-icon');
        closeIcon.innerHTML = '&times;';
        closeIcon.addEventListener('click', () => {
            this.hideModal(modal);
        });
        modalContent.appendChild(closeIcon);

        const addToFavorite = document.createElement('span');
        addToFavorite.classList.add('favorite-btn');
        this.controller.checkIfExist(id).then(result => {
            const removeHandler = () => {
                this.controller.removeFromFavorite(id); 
                addToFavorite.innerHTML = 'Add to Favorite';
                addToFavorite.removeEventListener('click', removeHandler);
                addToFavorite.addEventListener('click', addHandler);
            };
            const addHandler = () => {
                console.log(this);
                this.controller.addToFavorite(id, imageURL, description)
                addToFavorite.innerHTML = 'Remove From Favorite';
                addToFavorite.removeEventListener('click', addHandler);
                addToFavorite.addEventListener('click', removeHandler);
            };
            if (result) {
                addToFavorite.innerHTML = 'Remove From Favorite';
                addToFavorite.addEventListener('click', removeHandler)
            } else {
                addToFavorite.innerHTML = 'Add to Favorite';
                addToFavorite.addEventListener('click', addHandler);
            };
        })
        

        modalContent.appendChild(addToFavorite);


        modal.appendChild(modalContent);
        this.container.appendChild(modal);

        modal.style.display = "block";
    }
    hideModal(modal) {
        this.container.removeChild(modal);
    }
    updateImageUrls(){
        if (window.innerWidth <= 600) {
            this.imageUrls = [
               'https://raw.githubusercontent.com/pawlinka/Images/main/413874770.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/van2-2.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/van3-3.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/van4-4.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/van5-5.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/van6-6.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/van7-7.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/1492723642.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/138986746.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/1757830409.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/1839603285.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/2083506161.jpeg',
                'https://raw.githubusercontent.com/pawlinka/Images/main/220967.jpeg'
            ]
        } else {
            this.imageUrls = [
            "https://raw.githubusercontent.com/pawlinka/svg/main/van1.jpeg",
           "https://raw.githubusercontent.com/pawlinka/svg/main/van2.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van3.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van4.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/van5.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/image4.jpeg",
            "https://raw.githubusercontent.com/pawlinka/Images/main/1488073511.jpeg",
            'https://raw.githubusercontent.com/pawlinka/Images/main/van8-8.jpeg',
          'https://raw.githubusercontent.com/pawlinka/Images/main/van10-10.jpeg',
          'https://raw.githubusercontent.com/pawlinka/Images/main/220967.jpeg',
          'https://raw.githubusercontent.com/pawlinka/Images/main/621310590.jpeg',
          'https://raw.githubusercontent.com/pawlinka/Images/main/bigpicture_ru_296455-688x889-1.jpeg',
          'https://raw.githubusercontent.com/pawlinka/Images/main/bigpicture_ru_avtoportret-688x827-1.jpeg',


          
            ]
        }
    }
    createFallingImages() {
       /* const imageUrls = [
            "https://raw.githubusercontent.com/pawlinka/svg/main/van1.jpeg",
           "https://raw.githubusercontent.com/pawlinka/svg/main/van2.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van3.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van4.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/van5.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/image4.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/van1.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van2.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van3.jpeg",
            "https://raw.githubusercontent.com/pawlinka/svg/main/van4.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/van5.jpeg",
          "https://raw.githubusercontent.com/pawlinka/svg/main/image4.jpeg",
        ];*/
        this.imageUrls.forEach((imageUrl) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.classList.add("falling-image");
            this.container.appendChild(img);

            this.animateImage(img);
        });
    }
    animateImage(img) {
        const screenHeight = window.innerHeight;
        const imageHeight = 100;
        const startPositionX = this.getRandomInt(0, window.innerWidth - 100);
        let direction = 1;

        img.style.left = `${startPositionX}px`;
        img.style.transform = `translate(0, 0)`;

        let positionY = 0;
        const animationSpeed = this.getRandomInt(1, 3);

        const animate = () => {
            positionY += animationSpeed * direction;
            img.style.transform = `translate(0,${positionY}px)`;

            requestAnimationFrame(animate);

            if (positionY > screenHeight - imageHeight) {
                direction = direction * (-1);
            };

            if (positionY < 0) {
                direction = direction * (-1);
            }
        };

        requestAnimationFrame(animate);
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    createGalleryContainer() {
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('gallery-container');
        const pageContainer = document.querySelector('#page');
        pageContainer.appendChild(this.galleryContainer);
    };
}
import { getPainting, getDescription, firebaseInit, getQuizQuestions } from '../models/models';
import Quiz from '../views/quiz';

export default class Controller {
  #view;
  #app;
  constructor(view) {
    this.#view = view;
    this.#app = firebaseInit();
  }
  startQuiz = () => {
    const questions = getQuizQuestions();
    return questions;
  }
  handleSearch(string) {
    getPainting(string, (result) => {
      console.log(result);
      //view Painting 
      const handler = (id) => () => this.handleDescription(id);
      this.#view.showPaintings(result.data, handler);
    })
  };
  handleDescription = (id) => {
    getDescription(id, (result) => {
      console.log(result);
      //view при нажатии картины будем отправлять запрос  
      //Для отображения в модальном окне
      const imageURL = result.image;
      const description = result.description;
      this.#view.showDescription(imageURL, description, id);
    })
  }
  register = (cb) => (email, password) => {
    console.log(this.#app);

    this.#app.firebaseInstance.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user.user));
      cb();
      this.#app.database.database().ref('users/' + user.uid).set({
        favorites: {},
        quiz: {},
      });
    })
  }
  login = (cb) => (email, password) => {
    console.log(this.#app);
    this.#app.firebaseInstance.auth().setPersistence(this.#app.firebaseInstance.firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        this.#app.firebaseInstance.auth().signInWithEmailAndPassword(email, password).then((user) => {
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user.user));
          cb();
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
  logout = (cb) => () => {
    this.#app.firebaseInstance.auth().signOut().then(() => {
      localStorage.removeItem('user');
      console.log("test");
      cb();
    })
  }
  addToFavorite = (pictureId, imageURL, description) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      console.log(this.#app.database);
      const newF = this.#app.database.ref('users/' + user.uid + "/favorites").push();
      newF.set({
        [pictureId]: { imageURL, description },
      })
    }
  }
  removeFromFavorite = async (id) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const query = await this.#app.database.ref(`users/${user.uid}/favorites/`).get();
      const uid = Object.entries(query.val()).find(f => {
        return Object.keys(f[1])[0] === id
      })[0];
      console.log(uid);
      const result = await this.#app.database.ref(`users/${user.uid}/favorites/${uid}`).remove();
      console.log(result, uid);
    }
  }
  loadFavoriteToProfile = async () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const query = await this.#app.database.ref(`users/${user.uid}/favorites/`).get();
      const favoriteItem = query.val();
      console.log(favoriteItem);
      return favoriteItem;
    }

  }
  checkIfExist = async (id) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const query = await this.#app.database.ref(`users/${user.uid}/favorites/`).get();
      if (query.val()) {
        return !!Object.values(query.val()).find(f => Object.keys(f)[0] === id);
      }
      return false;
    };
    return false;
  }
}


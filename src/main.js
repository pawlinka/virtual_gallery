import './style.css'
import Gallery from './views/gallery';
import Quiz from './views/quiz';
import Auth from './views/auth';
import Profile from './views/profile';
import Controller from './controller/controller';

const pageContainer = document.getElementById('page');

const routersMap = {
  gallery: Gallery,
  quiz: Quiz,
  auth: Auth,
  profile: Profile,
}

function renderView() {
  const hash = window.location.hash.slice(1);
  console.log(hash);
  const View = routersMap[hash];
  if (View) {
   new View(document.querySelector('#page'));
  }
  const links = document.querySelectorAll('.navbar a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const links = document.querySelectorAll('.navbar a');
      links.forEach(activeLink => activeLink.classList.remove('active'));
      const navHashName = e.target.href.split('#')[1];
      const NewView = routersMap[navHashName];
      if (NewView) {
        if (window.location.hash === "#quiz") {
          Quiz.handleTabClose(() => {
            new NewView(document.querySelector('#page'));
            e.target.classList.add('active');
          });
        } else {
          new NewView(document.querySelector('#page'));
          e.target.classList.add('active');
        }
      }
    })
  })
  Auth.authRefresh();
};
renderView();

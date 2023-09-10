import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

let firebaseInstance = null;
let database = null;
export const firebaseInit = () => {
  if (firebaseInstance && database) {
    return { firebaseInstance, database };
  };
  const firebaseConfig = {
    apiKey: "AIzaSyAE2jL14mxA6Xy58gGld12bq0yNjygPJw4",
    authDomain: "virtual-art-gallery-d5dd7.firebaseapp.com",
    projectId: "virtual-art-gallery-d5dd7",
    storageBucket: "virtual-art-gallery-d5dd7.appspot.com",
    messagingSenderId: "28541033460",
    appId: "1:28541033460:web:7a2aba29dee6b370def7a1",
    measurementId: "G-XHT2CQK333",
    databaseURL: "https://virtual-art-gallery-d5dd7-default-rtdb.europe-west1.firebasedatabase.app",
  };
  firebaseInstance = firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  return { firebaseInstance, database };
};

export function getPainting(search, callback) {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ASP.NET_SessionId=jgd4jxg5tzbzym3utuxsyko5");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/https://www.wikiart.org/en/api/2/PaintingSearch?authSessionKey=58f5cf3184f0&term=" + search, requestOptions)
        .then(response => response.json())
        .then(result => callback(result))
        .catch(error => console.log('error', error));
};
export function getDescription(id, callback) {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ASP.NET_SessionId=04hd2bf40nmvelifbjsrwj5u");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/https://www.wikiart.org/en/api/2/Painting?id=" + id, requestOptions)
        .then(response => response.json())
        .then(result => callback(result))
        .catch(error => console.log('error', error));
};
export function getQuizQuestions () {
    return [
        {
            question: "Who painted 'The Lady with an Ermine'?",
            image: "https://uploads0.wikiart.org/images/leonardo-da-vinci/the-lady-with-the-ermine-cecilia-gallerani-1496.jpg!Large.jpg",
            answers: [
                {
                    id: '0',
                    value: "Leonardo da Vinci",
                    correct: true,
                },
                {
                    id: '1',
                    value: "Sandro Botticelli",
                    correct: false,
                },   {
                    id: '2',
                    value: "Gustav Klimt",
                    correct: false,
                },
                {
                    id: '3',
                    value: "Valentin Serov",
                    correct: false,
                } 
             ]
            },
        {
            question: "Name the artist of the painting 'Starry Night.",
            image: "https://uploads4.wikiart.org/00142/images/vincent-van-gogh/the-starry-night.jpg!Large.jpg",
            answers: [
                {
                    id: '4',
                    value: "Pablo Picasso",
                    correct: false,
                },
                {
                    id: '5',
                    value: "Vincent van Gogh",
                    correct: true,
                },
                {
                    id: '6',
                    value: "Gustav Klimt",
                    correct: false,
                },
                {
                    id: '7',
                    value: "Claude Mone",
                    correct: false,
                }
            ]
        },
        {
            question: 'Who painted the "Scream"',
            image: "https://uploads2.wikiart.org/images/edvard-munch/the-scream-1893(2).jpg!Large.jpg ",
            answers: [
                {
                    id: '8',
                    value: " Edvard Munch",
                    correct: true,
                },
                {
                    id: '9',
                    value: "Salvador Dali",
                    correct: false,
                },
                {
                    id: '10',
                    value: "Francis Bacon",
                    correct: false,
                },
                {
                    id: '11',
                    value: "Vincent van Gogh",
                    correct: false,
                }
            ]
        },
        { 
            question: "Who painted the 'Mona Lisa'?",
            image: "https://uploads0.wikiart.org/00339/images/leonardo-da-vinci/mona-lisa-c-1503-1519.jpg!Large.jpg",
            answers: [
                {
                    id: '12',
                    value: "Leonardo da Vinci",
                    correct: true,
                },
                {
                    id: '13',
                    value: "Michelangelo",
                    correct: false,
                },
                {
                    id: '14',
                    value: "Raphael",
                    correct: false,
                },
                {
                    id: '15',
                    value: "Vincent van Gogh",
                    correct: false,
                }
            ]
        },
        {
            question: "Who painted 'The Girl with the Pearl Earring'?",
            image: "https://uploads0.wikiart.org/00380/images/johannes-vermeer/1-girl-with-a-pearl-earring-johannes-vermeer.jpg!Large.jpg",
            answers: [
                {
                    id: '16',
                    value: "Leonardo da Vinci",
                    correct: false,
                },
                {
                    id: '17',
                    value: "Michelangelo",
                    correct: false,
                },
                {
                    id: '18',
                    value: "Vincent van Gogh",
                    correct: false,
                },
                {
                    id: '19',
                    value: "Johannes Vermeer",
                    correct: true,
                },
            ]
        },
        {
            question: 'Who painted "Over the Town"?',
            image: "https://uploads2.wikiart.org/images/marc-chagall/over-the-town-1918.jpg!Large.jpg",
            answers: [
                {
                    id: '20',
                    value: "Marc Chagall",
                    correct: true,
                },
                {
                    id: '21',
                    value: "Pablo Picasso",
                    correct: false,
                },
                {
                    id: '22',
                    value: "Salvador Dali",
                    correct: false,
                },
                {
                    id: '23',
                    value: "Vincent van Gogh",
                    correct: false,
                }
            ]
        },
        {
            question: 'Who painted "The Birth of Venus"?',
            image: "https://uploads6.wikiart.org/images/sandro-botticelli/the-birth-of-venus-1485(1).jpg!Large.jpg",
            answers: [
             
                {
                    id: '24',
                    value: "Leonardo da Vinci",
                    correct: false,
                },
                {
                    id: '25',
                    value: "Gustav Klimt",
                    correct: false,
                },
                {
                    id: '26',
                    value: "Sandro Botticelli",
                    correct: true,
                },
                {
                    id: '27',
                    value: "Valentin Serov",
                    correct: false,
                }
            ]
        },
        {
            question: 'Who painted "The Kiss"?',
            image: "https://uploads0.wikiart.org/images/gustav-klimt/the-kiss-1908(1).jpg!Large.jpg",
            answers: [
                
                {
                    id: '28',
                    value: "Leonardo da Vinci",
                    correct: false,
                },
                {
                    id: '29',
                    value: "Gustav Klimt",
                    correct: true,
                },
                {
                    id: '30',
                    value: "Sandro Botticelli",
                    correct: false,
                },
                {
                    id: '31',
                    value: "Johannes Vermeer",
                    correct: false,
                }
            ]
        },
        {
            question: 'Who painted "Girl with Peaches"?',
            image: "https://uploads8.wikiart.org/images/valentin-serov/girl-with-peaches-1887.jpg!Large.jpg",
            answers: [
             
                {
                    id: '32',
                    value: "Leonardo da Vinci",
                    correct: false,
                },
                {
                    id: '33',
                    value: "Gustav Klimt",
                    correct: false,
                },
                {
                    id: '34',
                    value: "Sandro Botticelli",
                    correct: false,
                },
                {
                    id: '35',
                    value: "Valentin Serov",
                    correct: true,
                },
            ]
        },
        {
            question: 'Who created the artwork "Girl with Balloon"?',
            image: "https://uploads2.wikiart.org/00223/images/banksy/51q4xj7dnml-sy679.jpg!Large.jpg",
            answers: [
                {
                    id: '36',
                    value: "Banksy",
                    correct: true,
                },
                {
                    id: '37',
                    value: "Andy Warhol",
                    correct: false,
                },
                {
                    id: '38',
                    value: "Keith Haring",
                    correct: false,
                },
                {
                    id: '39',
                    value: "Jean-Michel Basquiat",
                    correct: false,
                }
            ]
        },
        
    ]

}
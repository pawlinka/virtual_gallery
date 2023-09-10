import Controller from "../controller/controller";

export default class Quiz {
    constructor(container){
        this.controller = new Controller();
        this.container = container;
        this.clearContainer();
        this.createQuizContainer();
        this.quiz = document.getElementById('quiz_id');
        this.questions = document.getElementById('questions');
        this.indicator = document.getElementById('indicator');
        this.results = document.getElementById('results');
        this.btnNext = document.getElementById('btn-next');
        this.btnRestart = document.getElementById('btn-restart');
        this.localResults = {};
        this.setupEventListeners();
        //this.renderQuestions(0); 
        this.quizData = this.controller.startQuiz();
        this.currentQuestionIndex = 0;
        this.init();
        window.onbeforeunload = function(e) {
            return 'Dialog text here.';
        };
    }
    static handleTabClose = (cb) => {
        //return 'Do you want to close the Quiz? Your answers will be remove.';
        const answer = confirm('Do you want to close the Quiz? Your answers will be remove.');
        if (answer) {
           cb();
        };
    }
    init = () => {
        this.currentQuestionIndex = 0;
        this.renderQuestions(this.currentQuestionIndex);
    }
    clearContainer() {
        if (this.container) {
            this.container.innerHTML = '';
        }
     }   
     createQuizContainer() {
        this.quizContainer = document.createElement('div');
        this.quizContainer.classList.add('quiz-cont');
        this.quizContainer.id = 'quiz_id';
        this.quizContainer.innerHTML = `
            <div class="quiz-questions" id="questions"></div>
            <div class="quiz-indicator" id="indicator">1/10</div>
            <div class="quiz-results" id="results">
                <div class="quiz-results-item">
                    <div class="quiz-results-item__question">Question 1</div>
                    <ul class="quiz-results-item__answers">
                        <li>Answer 1</li>  
                        <li>Answer 2</li>  
                    </ul>
                </div>    
            </div>    
            <div class="quiz-controls">
                <button class="btn-next" id="btn-next" disabled>Next</button>
                <button class="btn-restart" id="btn-restart" >From the begining</button>
            </div>
    `;
        const pageContainer = document.querySelector('#page');
        pageContainer.appendChild(this.quizContainer); 
    };

    setupEventListeners() {
        this.quiz.addEventListener('change', (e) => {
            // Логика обработки изменения ответа
            if(e.target.classList.contains('answer-input')){
                console.log('input');
                this.localResults[e.target.name] = e.target.value;
                this.btnNext.disabled = false;
            }
        });

        this.quiz.addEventListener('click', (e) => {
            // Логика обработки кликов (например, переход "вперед" или с начала)
            if(e.target.classList.contains('btn-next')) {
                const nextQuestionIndex = Number(this.questions.dataset.currentStep) + 1;
               
                if (this.quizData.length === nextQuestionIndex) {
                    //переход к результатам
                    this.questions.classList.add('questions--hidden');
                    this.indicator.classList.add('indicator--hidden');
                    this.results.classList.add('indicator--visible');
                    this.btnNext.classList.add('btn-next--hidden');
                    this.btnRestart.classList.add('btn-restart--visible');

                    this.renderResults();        
                } else  {
                    this.renderQuestions(nextQuestionIndex);
                }

                this.btnNext.disabled = true;
            }
            if (e.target.classList.contains('btn-restart')) {
                
                this.localResults = {};
                this.results.innerHTML = '';
                
                this.questions.classList.remove('questions--hidden');
                this.indicator.classList.remove('indicator--hidden');
                this.results.classList.remove('indicator--visible');
                this.btnNext.classList.remove('btn-next--hidden');
                this.btnRestart.classList.remove('btn-restart--visible');       

                this.renderQuestions(0);
            }
        });
    };
    renderQuestions = (index) => {
        if (index < this.quizData.length) {
        this.renderIndicator(index + 1) ;
        this.questions.dataset.currentStep = index;
        this.renderAnswers =() => this.quizData[index].answers
            .map((answer) =>  `
                <li>
                    <label>
                        <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                        ${answer.value}
                    </label>
                 </li>
            `)
            .join('');

        this.questions.innerHTML =`
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">${this.quizData[index].question}</div>
            <img src="${this.quizData[index].image}" alt="Question Image">
            <ul class="quiz-questions-item__answers">${this.renderAnswers()}</ul>
        </div>
        `;
        }
    };
    renderResults = () => {
        let content = ' ';
        const getClassname = (answer, questionIndex) => {
            let classname = '';
            if (!answer.correct && answer.id === this.localResults[questionIndex]) {
                classname = 'answer--invalid';
            } else if (answer.correct) {
                classname ='answer--valid';
            }

            return classname;
        };
        const getAnswers = (questionIndex) => this.quizData[questionIndex].answers
            .map((answer) =>`<li class=${getClassname(answer, questionIndex)}>${answer.value}</li> `)
            .join('');

        this.quizData.forEach((question, index) => {
            content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item__question">${question.question}</div>
                <ul class="quiz-results-item__answers">${getAnswers(index)} </ul>
            </div> 
            `
        });

        this.results.innerHTML = content;
        
    };
    renderIndicator = (currentStep) => {
        this.indicator.innerHTML = `${currentStep}/${this.quizData.length}`
        
    }
    
};

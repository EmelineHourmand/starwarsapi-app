import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, AlertController} from 'ionic-angular';

@Component({
    selector: 'page-quizz',
    templateUrl: "./quizz.html"
})

export class Quizz{

    private loading;

    started = false

    amount = 5

    questionsCopy = []
    questions = []

    actualQuestion = ""
    first_answer = ""
    second_answer = ""
    third_answer = ""
    fourth_answer = ""

    placeGoodAnswer = 0

    resultValidation = ""

    ended = false

    error = 0

    isAnswered = false

    emailAlert

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController){
        this.questionsCopy = questionsDictionnary.slice(0,questionsDictionnary.length)
        this.generateQuestions(this.amount)
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Loading Please Wait...'
        })
        this.loading.present()
    }

    dismissLoader(){
        this.loading.dismiss()
    }

    prepareQuizz(){
        this.started = true
        if(this.questions.length != this.amount){
            this.presentLoadingCustom()
        }
        else{
            this.startQuizz()
        }
    }

    generateQuestions(amount: number){
        var generated = 0
        while (amount > generated && this.questionsCopy.length > 0){
            var index = Math.floor(Math.random() * this.questionsCopy.length)
            this.questions.push(this.questionsCopy[index])
            this.questionsCopy.splice(index,1)
            generated++
        }
    }

    resetQuiz(){
        this.ended = false
        this.started = false
        this.amount = 5
        this.questionsCopy = []
        this.questions = []
        this.actualQuestion = ""
        this.first_answer = ""
        this.second_answer = ""
        this.third_answer = ""
        this.fourth_answer = ""
        this.placeGoodAnswer = 0
        this.resultValidation = ""
        this.ended = false
        this.error = 0
        this.questionsCopy = questionsDictionnary.slice(0,questionsDictionnary.length)
        this.generateQuestions(this.amount)
    }

    startQuizz(){
        this.resultValidation = null

        var actualQ = this.questions[0]

        this.questions.splice(0, 1);
        this.actualQuestion = actualQ.question

        this.placeGoodAnswer = Math.floor(Math.random() * 4);

        this.isAnswered = false

        switch (this.placeGoodAnswer){
            case 0:
                this.first_answer = actualQ.goodAnswer;
                this.second_answer = actualQ.falseAnswers[0];
                this.third_answer = actualQ.falseAnswers[1];
                this.fourth_answer = actualQ.falseAnswers[2];
                break;
            case 1:
                this.second_answer = actualQ.goodAnswer;

                this.first_answer = actualQ.falseAnswers[0];
                this.third_answer = actualQ.falseAnswers[1];
                this.fourth_answer = actualQ.falseAnswers[2];
                break;
            case 2:
                this.third_answer = actualQ.goodAnswer;

                this.first_answer = actualQ.falseAnswers[0];
                this.second_answer = actualQ.falseAnswers[1];
                this.fourth_answer = actualQ.falseAnswers[2];
                break;
            case 3:
                this.fourth_answer = actualQ.goodAnswer;

                this.first_answer = actualQ.falseAnswers[0];
                this.second_answer = actualQ.falseAnswers[1];
                this.third_answer = actualQ.falseAnswers[2];
                break;
            default:
                this.first_answer = actualQ.goodAnswer;

                this.second_answer = actualQ.falseAnswers[0];
                this.third_answer = actualQ.falseAnswers[1];
                this.fourth_answer = actualQ.falseAnswers[2];
                this.placeGoodAnswer = 0
                break;
        }
    }

    validateAnswer(position) {
        if (!this.isAnswered) {
            this.isAnswered = true
            if (this.questions.length == 0) {
                this.ended = true
            }
            if (position == this.placeGoodAnswer) {
                this.resultValidation = "Nice one ! You find it :)"
                this.actualQuestion = ""
            }
            else {
                this.error++
                this.resultValidation = "Oooh... That\'s not the correct answer :( You will know now ! :)"
                this.actualQuestion = ""
            }

            if (this.ended) {
                if (this.error == 0) {
                    this.presentEmailAlert('Join us on the force, enter your email to register to our newsletter. You may discover things you don’t know with our community !');
                }
                else {
                    this.presentEmailAlert('Join us on the force, enter your email to register to our newsletter. You may progress and get a better score on the next time ;)');
                }
            }
        }
    }

    presentEmailAlert(title){

        this.emailAlert = this.alertController.create({
            title: title,
            inputs: [
                {
                    name: 'Email',
                    placeholder: 'Email'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {

                    }
                },
                {
                    text: 'Send',
                    handler: data => {
                        this.displayEmailSent()
                    }
                }
            ]
        });
        this.emailAlert.present();
    }
    displayEmailSent(){

        let alert = this.alertController.create({
            title: 'Email Sent',
            subTitle: 'You are now registered on our Newsletter',
            buttons: ['Ok']
        });
        alert.present();
    }

    openPage() {
        this.resetQuiz()
        this.navCtrl.parent.select(0);
    }
    ionViewWillLeave() {

    }
}

const questionsDictionnary = [
    {question: 'Who was Darth Vader before he became a Sith Lord ?',goodAnswer:'A jedi apprentice',falseAnswers:['A politician','A clone','A smuggler']},
    {question: 'What\'s the name of the heroine of the new triologie that is being formed by Luke Skywalker',goodAnswer:'Rey',falseAnswers:['Leia Organa','Ahsoka Tano','Phasma']},
    {question: 'What does Luke Skywalker with the saber that Rey gives him on Ahch-To ?',goodAnswer:'He drop it',falseAnswers:['He rob it','He hold it against his chest','He put it away in his bag']},
    {question: 'What is the name of the famous Jedi Master that fights Dark Sidius on the senate chamber and that formed Luke Skywalker ?',goodAnswer:'Yoda',falseAnswers:['Mace Windu','Qui-Gon Jin','Obiwan Kenobi']},
    {question: 'What is the name of the rule that Yoda describe in this quote : "Always two there are; no more, no less. A master and an apprentice."',goodAnswer:'The Rule of Two',falseAnswers:['The Darth Bane Philosphy','The Ultimate Alliance','The Force Duality']},
    // {question: '',goodAnswer:'',falseAnswers:['']},
    // {question: '',goodAnswer:'',falseAnswers:['']},
    // {question: '',goodAnswer:'',falseAnswers:['']},
    // {question: '',goodAnswer:'',falseAnswers:['']}
]


package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService service;

    @Autowired
    private QuizService quizService;

    //  Add Question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok(this.service.addQuestion(question));
    }

    //  Update the Question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.service.updateQuestion(question));
    }

    //  Get all Question of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
//        Quiz quiz=new Quiz();
//        quiz.setqId(qid);
//        Set<Question> questionsOfQuiz = this.service.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        list.forEach((q) -> {
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    //  Get all Question
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
        Quiz quiz = new Quiz();
        quiz.setqId(qid);
        Set<Question> questionsOfQuiz = this.service.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);

//        return ResponseEntity.ok(list);
    }

    //  Get Single Question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId) {
        return this.service.getQuestion(quesId);
    }

    //  Delete Question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId) {
        this.service.deleteQuestion(quesId);
    }

    //  Evaluate Quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
//        System.out.println(questions);
        // For Result
        Double marksGot = 0.0;
        Integer correctAnswer = 0;
        Integer attempted = 0;
        for (Question q : questions) {

//            System.out.println(q.getGivenAnswer());
            //  Single Questions
            Question question = this.service.get(q.getQuesId());

            if (question.getAnswer().equals(q.getGivenAnswer())) {
                //   Correct
                correctAnswer++;

                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())
                        / Double.parseDouble(questions.get(0).getQuiz().getNumberOfQuestions());
                marksGot += marksSingle;
            }
            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Map<Object, Object> map = Map.of("marksGot", marksGot, "correctAnswer", correctAnswer,
                "attempted", attempted);
        return ResponseEntity.ok(map);
    }
}

package com.exam.service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

import java.util.Set;

public interface QuestionService {

    //  Add Particular Question
    public Question addQuestion(Question question);

    //  Update Particular Question
    public Question updateQuestion(Question question);

    //  Get All Questions
    public Set<Question> getQuestions();

    //  Get a Particular Question
    public Question getQuestion(Long questionId);

    //  Get All Question of the Particular Quiz
    public Set<Question> getQuestionsOfQuiz(Quiz quiz);

    //  Delete a Particular Question
    public void deleteQuestion(Long questionId);

    public Question get(Long questionId);
}

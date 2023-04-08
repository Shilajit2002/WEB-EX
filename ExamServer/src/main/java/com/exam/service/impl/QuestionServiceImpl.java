package com.exam.service.impl;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    //  Add Particular Question
    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    //  Update Particular Question
    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    //  Get All Questions
    @Override
    public Set<Question> getQuestions() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    //  Get a Particular Question
    @Override
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }

    //  Get All Question of the Particular Quiz
    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    //  Delete a Particular Question
    @Override
    public void deleteQuestion(Long questionId) {
        Question question = new Question();
        question.setQuesId(questionId);
        this.questionRepository.delete(question);
    }

    @Override
    public Question get(Long questionId) {
        return this.questionRepository.getOne(questionId);
    }
}

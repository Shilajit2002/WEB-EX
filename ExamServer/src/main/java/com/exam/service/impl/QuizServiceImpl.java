package com.exam.service.impl;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    //  Add Particular Quiz
    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    //  Update Particular Quiz
    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    //  Get All Quizzes
    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepository.findAll());
    }

    //  Get a Particular Quiz
    @Override
    public Quiz getQuiz(Long quizId) {
        return this.quizRepository.findById(quizId).get();
    }

    //  Delete a Particular Quiz
    @Override
    public void deleteQuiz(Long quizId) {
        this.quizRepository.deleteById(quizId);
    }

    @Override
    public List<Quiz> getQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategory(category);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return this.quizRepository.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category c) {
        return this.quizRepository.findByCategoryAndActive(c,true);
    }
}

package com.exam.service;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface QuizService {

    //  Add Particular Quiz
    public Quiz addQuiz(Quiz quiz);

    //  Update Particular Quiz
    public Quiz updateQuiz(Quiz quiz);

    //  Get All Quizzes
    public Set<Quiz> getQuizzes();

    //  Get a Particular Quiz
    public Quiz getQuiz(Long quizId);

    //  Delete a Particular Quiz
    public void deleteQuiz(Long quizId);

    public List<Quiz> getQuizzesOfCategory(Category category);

    public List<Quiz> getActiveQuizzes();
    public List<Quiz> getActiveQuizzesOfCategory(Category c);
}

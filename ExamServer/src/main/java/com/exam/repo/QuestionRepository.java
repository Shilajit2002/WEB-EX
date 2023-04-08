package com.exam.repo;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    //  Find by Quiz of the Questions
    Set<Question> findByQuiz(Quiz quiz);
}

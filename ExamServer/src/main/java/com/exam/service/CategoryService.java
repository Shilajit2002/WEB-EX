package com.exam.service;

import com.exam.model.exam.Category;

import java.util.Set;

public interface CategoryService {

    //  Add Particular Category
    public Category addCategory(Category category);

    //  Update Particular Category
    public Category updateCategory(Category category);

    //  Get All Categories
    public Set<Category> getCategories();

    //  Get a Particular Category
    public Category getCategory(Long categoryId);

    //  Delete a Particular Category
    public void deleteCategory(Long categoryId);
}

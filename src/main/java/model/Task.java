package model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Task {

    public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    private int id;
    private String title;
    private String description;
    private String category;
    private String date;

    public Task(){}

    public Task(int id, String title, String description, String category, String date) throws ParseException {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;
    }

    public Task(String title, String description, String category, String date) throws ParseException {
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setId(int id) { this.id = id; }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}

package model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Task {

    public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    private int id;
    private String title;
    private String description;
    private String category;
    private Date date;

    public Task(){}
    public Task(int id, String title, String description, String category, Date date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;
    }

    public Task(String title, String description, String category, Date date) {
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

    public static SimpleDateFormat getFormat() {
        return format;
    }

    public static void setFormat(SimpleDateFormat format) {
        Task.format = format;
    }

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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

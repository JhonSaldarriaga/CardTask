package model;

public class UpdateCategory {
    private int id;
    private String category;

    public UpdateCategory() {}

    public UpdateCategory(String id, String category) {
        this.id = Integer.parseInt(id);
        this.category = category;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

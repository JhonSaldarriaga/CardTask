package provider;

import db.DBConnection;
import model.Task;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

public class TaskProvider {

    public void addTask(Task task) throws SQLException {
        DBConnection connection = new DBConnection();
        String date = Task.format.format(task.getDate());
        String sql = ("INSERT INTO A00362210_tasks (title, description, category, date) " +
                "VALUES ($TITLE,$DESCRIPTION,$CATEGORY,$DATE)")
                .replace("$TITLE","'"+task.getTitle()+"'")
                .replace("$DESCRIPTION", "'"+task.getDescription()+"'")
                .replace("$CATEGORY","'"+task.getCategory()+"'")
                .replace("$DATE","'" + date  + "'");
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();
    }

    public void updateTask(Task task) throws SQLException {
        DBConnection connection = new DBConnection();
        String date =Task.format.format(task.getDate());
        String sql = ("UPDATE A00362210_tasks SET title=$TITLE, description=$DESCRIPTION, category=$CATEGORY, date=$DATE")
                .replace("$TITLE","'"+task.getTitle()+"'")
                .replace("$DESCRIPTION", "'"+task.getDescription()+"'")
                .replace("$CATEGORY","'"+task.getCategory()+"'")
                .replace("$DATE","'" + date  + "'");
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();
    }

    public void deleteTask(int id) throws SQLException {
        DBConnection connection = new DBConnection();
        String sql = ("DELETE FROM A00362210_tasks WHERE id=$ID").replace("$ID", ""+id);
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();
    }

    private Task getTask(int id) throws SQLException, ParseException {
        String sql = "SELECT * FROM A00362210_tasks WHERE id=$ID".replace("$ID",""+id);
        DBConnection connection = new DBConnection();
        connection.connect();
        ResultSet resultSet =  connection.getDataBySQL(sql);
        Task task = null;
        if(resultSet.next()) {
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            task = new Task(id,title,description,category, Task.format.parse(date));
        }
        connection.disconnect();
        return task;
    }

    private ArrayList<Task> getAllTasks() throws SQLException, ParseException {
        String sql = "SELECT * FROM A00362210_tasks";
        ArrayList<Task> tasks = new ArrayList<>();
        DBConnection connection = new DBConnection();
        connection.connect();
        ResultSet resultSet =  connection.getDataBySQL(sql);
        while(resultSet.next()) {
            int id = Integer.parseInt(resultSet.getString(resultSet.findColumn("id")));
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            tasks.add(new Task(id,title,description,category, Task.format.parse(date)));
        }
        connection.disconnect();
        return tasks;
    }
}

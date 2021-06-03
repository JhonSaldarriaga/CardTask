package services;

import com.google.gson.Gson;
import model.Task;
import model.TaskList;
import provider.TaskProvider;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.text.ParseException;

@Path("task")
public class TaskServices {

    @POST
    @Consumes("application/json")
    @Path("add")
    public Response addTask(String task){
        try{
            Gson gson = new Gson();
            TaskProvider provider = new TaskProvider();
            Task obj = gson.fromJson(task, Task.class);
            provider.addTask(obj);
            return Response
                    .status(200)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @DELETE
    @Consumes("application/json")
    @Path("delete")
    public Response deleteTask(String task){
        try{
            Gson gson = new Gson();
            TaskProvider provider = new TaskProvider();
            Task obj = gson.fromJson(task, Task.class);
            provider.deleteTask(obj.getId());
            return Response
                    .status(200)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @PUT
    @Consumes("application/json")
    @Path("update")
    public Response updateCategory(String task){
        try {
            Gson gson = new Gson();
            TaskProvider provider= new TaskProvider();
            Task obj = gson.fromJson(task,Task.class);
            provider.updateTask(obj);
            return Response
                    .status(200)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @GET
    @Consumes("application/json")
    @Produces("application/json")
    @Path("getAll")
    public Response getAllTasks(){
        try {
            Gson gson = new Gson();
            TaskProvider provider= new TaskProvider();
            TaskList tasks= new TaskList(provider.getAllTasks());
            String list = gson.toJson(tasks,TaskList.class);
            return Response
                    .status(200)
                    .entity(list)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        } catch (SQLException | ParseException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }
}

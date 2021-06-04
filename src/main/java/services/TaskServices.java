package services;

import com.google.gson.Gson;
import model.Task;
import model.TaskList;
import provider.TaskProvider;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

@Path("task")
public class TaskServices {

    @POST
    @Consumes("application/json")
    @Path("add")
    public Response addTask(Task obj){
        try{
            TaskProvider provider = new TaskProvider();;
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
    @Path("delete/{id}")
    public Response deleteTask(@PathParam("id") int id){
        try{
            TaskProvider provider = new TaskProvider();
            provider.deleteTask(id);
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
    public Response updateCategory(Task obj){
        try {
            TaskProvider provider= new TaskProvider();
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
    @Path("all")
    public Response getAllTasks(){
        try {
            TaskProvider provider= new TaskProvider();
            ArrayList<Task> tasks = provider.getAllTasks();
            return Response
                    .status(200)
                    .entity(tasks)
                    .header("Content-Type","application/json")
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

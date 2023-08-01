const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let id = 0;

app.use(bodyParser.json());

function showTodos(req,res){
  res.send(todoObjectArray);
}

function showTodoFromId(req,res){
  let todoObjectArrayLength = id;
  let idGiven = req.params.id;
  let flagForRes = 0;

  for(i=0;i<todoObjectArrayLength;i++){
    if(todoObjectArray[i] != null){
      if(todoObjectArray[i]["id"] == idGiven){
        flagForRes = 1;
        res.send(todoObjectArray[i]);
      }
    } 
  }

  if(flagForRes == 0){
    res.status(404).send();
  }
}

let todoObjectArray = []; 

function createNewTodo(req,res){
  id++;
  let todoObject = req.body;
  todoObject["id"] = id;
  todoObjectArray.push(todoObject);

  let idJSON = {};
  idJSON["id"] = id;

  res.status(201).send(idJSON);

}

function updateTodoWithId(req,res){

  let todoObjectArrayLength = id;
  let idGiven = req.params.id;
  let flagForRes = 0;
  let todoObjectUpdatedPart = req.body;

  for(i=0;i<todoObjectArrayLength;i++){
    if(todoObjectArray[i]["id"] == idGiven){

      flagForRes = 1;

      if("title" in todoObjectUpdatedPart){
        todoObjectArray[i]["title"] = todoObjectUpdatedPart["title"];
      }

      if("completed" in todoObjectUpdatedPart){
        todoObjectArray[i]["completed"] = todoObjectUpdatedPart["completed"];
        
      }

      if("description" in todoObjectUpdatedPart){
        todoObjectArray[i]["description"] = todoObjectUpdatedPart["description"];
      }

      res.send();
    }
  }

  if(flagForRes == 0){
    res.status(404).send();
  }
}

function deleteTodoWithId(req,res){
  let todoObjectArrayLength = id;
  let idGiven = req.params.id;
  let flagForRes = 0;

  for(i=0;i<todoObjectArrayLength;i++){
    if(todoObjectArray[i]["id"] == idGiven){
      flagForRes = 1;
      delete todoObjectArray[i];
      res.send(todoObjectArray);
    }
  }

  if(flagForRes == 0){
    res.status(404).send();
  }

}

function catchAll(req, res) {
  res.status(404).send('404 Not Found');
}

app.get("/todos",showTodos);
app.get("/todos/:id",showTodoFromId);
app.post("/todos",createNewTodo);
app.put("/todos/:id",updateTodoWithId)
app.delete("/todos/:id",deleteTodoWithId);
app.get('*',catchAll);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

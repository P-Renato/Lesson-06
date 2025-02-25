/*
We will create a TOdo list application

Our application will have a main menu with the following options:
1. Add a new task
2. List all tasks
3. Exit

The task will ask the user for an input
- if the input is "x", the program will exit
- if the input is a number, the program will mark the task as completed

We will create the following functions
- loadTasks: Load the tasks from a file
- saveTasks: Save the tasks to a file
- mainMenu: Dsiplay the main menu
- listTasks: List all tasks
- listTasksMenu: Show task list menu
- addTask: Add a new task
- markTaskAsCompleted: Mark a task as completed
*/

import fs from "fs";
import prompt from "picoprompt";

let path = process.argv[2];

console.log(path);

if(!path){
console.error("No path provided");
process.exit();
}

function loadTasks(filePath){
    "1-study\n2-go to the gym\n3-watch movies" //=> [] How to change a string into an array
    let lines = []
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        lines = fileContent.split("\n"); // "\n" this is where I define where to separate the arguments inside the array
    } catch (e) {
        // ignore the error
    }
    return lines;
}

function saveTasks(filePath, tasks){
const fileContent = tasks.join("\n"); //=> How to change it back to a string
fs.writeFileSync(filePath, fileContent, "utf-8");
}

function listTasks(tasks){
    console.log("tasks:");
    console.log("------------------------------------------");
        let i = 0;
    while(i < tasks.length){
        console.log(i+1 + " " + tasks[i]);
        i++ ;
    }
    console.log("------------------------------------------");

}

function markTaskAsCompleted (tasks, index){
    if(tasks[index].endsWith("✅")){
        console.log("Task is already completed");
        return;
    }

    tasks[index] = tasks[index] + "✅";
    // tasks [index] += " ✅"
    console.log("Task mark as completed");

}

function listTasksMenu(tasks){
    while(true){
        listTasks(tasks);
        const option = prompt("Enter task number to complete 'x' or exit: ");
        if(option === "x"){     // This is to stop the function
            return;             // <<<<====
        }
        try{
            const index = Number(option);
            index -= 1;
            markTaskAsCompleted(tasks, index);
        }catch(e){
            console.log("Invalid task number");
        }
        saveTasks(path, tasks);
    }
}

function addTask(tasks){
    const newTask = prompt("Enter the task to add: ");
    tasks.push(newTask);
    console.log("New task is added");
}

function mainMenu(){
    console.log("1. Add new task");
    console.log("2. List all tasks");
    console.log("3. Exit");
    const option = prompt("Enter an option: ");
    return option;
}

// Last piece of the puzzle

while(true){
    const tasks = loadTasks(path);
    const option = mainMenu();
if(option === "1") {
    addTask(tasks);
    saveTasks(path, tasks);
}
if(option === "2") {
    listTasksMenu(tasks);
}
if(option === "3") {
    process.exit(0);
}
}
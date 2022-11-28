let input = document.querySelector( ".input" );
let submit = document.querySelector( ".add" );
let tasksDiv = document.querySelector( ".tasks" );
let tasksArray = [];
if (localStorage.getItem( "tasks"))
{
    tasksArray = JSON.parse( localStorage.getItem( "tasks" ) );
}
getDAta();

submit.onclick = function ()
{
    if ( input.value !== "" )
    {
        addTaskToArray( input.value );
        input.value = ""; //clean input filed 
    }
};
function addTaskToArray ( taskText )
{
    const task = {
        id: Date.now(),
        title: taskText,
        complete: false
    };
    tasksArray.push( task );
    addElement( tasksArray );
    addDataToStorages( tasksArray );
    console.log( tasksArray );
    console.log(JSON.stringify( tasksArray) );
}
function addElement (tasksArray)
{
    tasksDiv.innerHTML = "";
    tasksArray.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task is Done
        if (task.complete) {
          div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
        // console.log(div)
      });
}
tasksDiv.addEventListener( "click", ( e ) =>
{
    if ( e.target.classList.contains( "del" ) )
    {
        deleteDate( e.target.parentElement.getAttribute( "data-id" ) );
    
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains( "task")) {
        toggleStatus( e.target.getAttribute( "data-id" ) )
        e.target.classList.toggle( "done" );
    }
})
function addDataToStorages (tasksArray)
{
    window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
function getDAta ()
{
    let data = window.localStorage.getItem( 'tasks' );
    if ( data )
    {
        let tasks = JSON.parse( data );
        addElement ( tasks)
    }
}
function deleteDate ( id )
{
    tasksArray = tasksArray.filter(
        (task) => task.id !=id
    )
    addDataToStorages( tasksArray );
}
function toggleStatus (id)
{
    for ( let i = 0; i < tasksArray.length; i++ )
    { 
        if (tasksArray[i].id == id) {
            tasksArray[i].complete == false ?(tasksArray[i].complete = true) :(tasksArray[i].complete = false)
        }
    }
    addDataToStorages( tasksArray );
}

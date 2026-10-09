const form=document.getElementById('taskForm'),input=document.getElementById('taskInput'),
dateInput=document.getElementById('taskDate'),list=document.getElementById('taskList'),
count=document.getElementById('count'),clearBtn=document.getElementById('clearDone'),msg=document.getElementById('taskMsg');
let tasks=[];
try{tasks=JSON.parse(localStorage.getItem('planner-tasks'))||[];}catch(e){tasks=[];}
function save(){try{localStorage.setItem('planner-tasks',JSON.stringify(tasks));}catch(e){}}
function addTask(text,due){tasks.push({id:Date.now(),text:text,due:due,done:false});save();render();}
function toggleTask(id){tasks=tasks.map(t=>t.id===id?{...t,done:!t.done}:t);save();render();}
function deleteTask(id){tasks=tasks.filter(t=>t.id!==id);save();render();}
function render(){
  list.innerHTML='';
  if(tasks.length===0){const li=document.createElement('li');li.className='empty';li.textContent='No tasks yet. Add your first task above.';list.appendChild(li);}
  tasks.forEach(t=>{
    const li=document.createElement('li');if(t.done)li.classList.add('done');
    const cb=document.createElement('input');cb.type='checkbox';cb.checked=t.done;cb.setAttribute('aria-label','Mark "'+t.text+'" as completed');
    cb.addEventListener('change',()=>toggleTask(t.id));
    const label=document.createElement('span');label.className='label';label.textContent=t.text;
    if(t.due){const s=document.createElement('small');s.textContent='Due: '+t.due;label.appendChild(s);}
    const del=document.createElement('button');del.className='del';del.textContent='Delete';del.setAttribute('aria-label','Delete "'+t.text+'"');
    del.addEventListener('click',()=>deleteTask(t.id));
    li.append(cb,label,del);list.appendChild(li);
  });
  const done=tasks.filter(t=>t.done).length;
  count.textContent=done+' of '+tasks.length+' completed';
}
form.addEventListener('submit',e=>{
  e.preventDefault();const text=input.value.trim();
  if(!text){msg.textContent='Enter a task before adding it.';input.focus();return;}
  msg.textContent='';addTask(text,dateInput.value);form.reset();input.focus();
});
clearBtn.addEventListener('click',()=>{tasks=tasks.filter(t=>!t.done);save();render();});
render();

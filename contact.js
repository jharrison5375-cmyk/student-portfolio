const form=document.getElementById('contactForm'),status=document.getElementById('formStatus');
const rules={
  name:v=>v.trim()===''?'Enter your name.':'',
  email:v=>v.trim()===''?'Enter your email address.':(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':'Enter a valid email, like name@example.com.'),
  phone:v=>v.trim()===''?'Enter your phone number.':(/^\d+$/.test(v.trim())?'':'Use digits only, with no spaces, + or dashes.'),
  message:v=>v.trim()===''?'Enter a message.':''
};
function check(field){
  const el=form.elements[field],err=document.getElementById(field+'Error'),m=rules[field](el.value);
  err.textContent=m;el.closest('.field').classList.toggle('invalid',m!=='');return m==='';
}
Object.keys(rules).forEach(f=>form.elements[f].addEventListener('input',()=>check(f)));
form.addEventListener('submit',e=>{
  e.preventDefault();
  const results=Object.keys(rules).map(check);
  if(results.every(Boolean)){
    status.style.color='#2e7d5b';
    status.textContent='Thank you, '+form.elements.name.value.trim()+'. Your message has been received.';
    form.reset();
  }else{
    status.style.color='#c0224f';
    status.textContent='Please correct the highlighted fields.';
    const first=form.querySelector('.invalid input, .invalid textarea');if(first)first.focus();
  }
});

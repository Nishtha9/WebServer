const express=require('express');
const hbs=require('hbs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
// res.send('<h1>Hello Express!</h1>');
res.render('home.hbs',{
  pageTitle:'Home Page',
  WelcomeMsg:'Welcome to our website!'
});
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMsg: "Request could not be fulfilled",
    status: 'error'
  });
});

app.listen(3000, ()=>{
  console.log('Server is running on port 3000');
});

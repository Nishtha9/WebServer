const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getCurrYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

// app.use((req,res,next)=>{
//   res.render('maintainance');
// });
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now=new Date().toString();
  fs.appendFile('server.log',`${now}: ${req.method} ${req.url}\n`, (err)=>{
    if (err)
    {
      console.log(err);
    }
  })
console.log(`${now}: ${req.method} ${req.url}`);
next();
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

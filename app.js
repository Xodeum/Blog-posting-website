
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
  });
 
app.get('/new', (req, res) => {
    res.render('new');
  });
  
  app.post('/new', (req, res) => {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/');
  });
    
  app.get('/edit/:id', (req, res) => {
    const post = posts[req.params.id];
    res.render('edit', { post: post, id: req.params.id });
  });
  
  app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    posts[id] = {
      title: req.body.title,
      content: req.body.content,
    };
    res.redirect('/');
  });

  app.get('/delete/:id', (req, res) => {
    posts.splice(req.params.id, 1);
    res.redirect('/');
  });
  
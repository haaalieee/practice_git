var express = require('express'),
    router = express.Router();
	moment = require('moment');
	User = require('../models/user');

function handleError(){
	res.status(500).json({
			title: 'Error',
			error: err
	}); 
}
router.get('/login', (req, res)=>{
    res.render('login');
});

router.route('/login')
    .get((req,res)=>{
        res.render('login');
    })
    .post((req, res)=>{
        User.authenticate()(req.body.username, req.body.password, function (err, user, options){
            if(err) return res.status(500).json({error:err})
            if(user === false){
                res.send({
                    message: options.message,
                    success:false
                });
            }else {
                req.login(user, function(err){
                    if(err) return res.status(500).json({error:err});
                    console.log(req.user)
                    res.send({
                        success: true,
                        user: user,
                        redirect: '/'
                    });
                });
            }
        });
    })
router.route('/register')
    .get((req, res)=>{
        res.render('login', {})
    })
    .post((req, res)=>{
        User.register(new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username}),
            req.body.password,
            function(err){
                if(err){
                    res.status(500).json({
                        title: 'Error!',
                        err: err
                    })
                    return
                }
                console.log('user registered!');
                res.redirect('/admin/login');
            }
        );
    });

//middleware
//router.use('/',(req, res));

module.exports = router;
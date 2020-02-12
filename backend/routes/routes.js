const express = require("express");
const router = express.Router();

 availableOrders = [
  { id: 'Burger',due_date: new Date(), customer_name: 'Anup',customer_address: '8-6-4', customer_phone: 8686910475, order_total: 800 },
  { id: 'Pizza', due_date: new Date(), customer_name: 'Ajay',customer_address: '10-4', customer_phone: 6546464664, order_total: 1500 },
  { id: 'Pastries', due_date: new Date(),customer_name: 'Apurva',customer_address: '9-11', customer_phone: 5465464654, order_total: 1800 },
  { id: 'Biryani', due_date: new Date(), customer_name: 'Renuka',customer_address: '12-15', customer_phone: 6546546543, order_total: 800 }
];


router.post('/login',(req,res,next) => {
  const users =
    {
      email: 'anupdhondi5@gmail.com',
      password: 'dummy1234'
    };

    if((users.email == req.body.email) && (users.password == req.body.password)){
      res.status(200).json({
        message: 'User Authorised'
      })
    }else{
      res.status(401).json({
        message: 'User not authorised'
      });
    }
});

router.post('/neworder',
  (req, res, next) => {

    availableOrders.push({
          id: req.body.id,
          due_date: req.body.due_date,
          customer_name: req.body.customer_name,
          customer_address: req.body.customer_address,
          customer_phone: req.body.customer_phone,
          order_total: req.body.order_total
    })

      res.status(201).json({
        message: "Order created successfully"
    });
  }
);


router.get('/getorders',
(req,res,next) => {
   res.status(200).json({
     message: "Orders fetched successfully",
     orders: availableOrders
   })
})


module.exports = router;

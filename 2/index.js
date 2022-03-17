const express = require('express');

const app = express();

app.use(express.json());   // Global middleware "body-parse" already in express

const port = process.env.port || 3000;

let data = [{
  "id": 1,
  "product": "HP laptop",
  "price": "₹59999.99"
},
{
  "id": 2,
  "product": "HP laptop new",
  "price": "₹39999.99"
}]

app.get("/", (req,resp) => {
  resp.status(200).json(
    {
      data
    }
  )
})

app.get("/:id",  (req, res)=> {

  //console.log(typeof parseInt(req.params.id)) // instead of parseInt we can use + or ~~ no need to use ()
  let result = data.find((elem)=> elem.id == +req.params.id)
 // console.log(result);
  if(result){
    res.status(200).json({
      result // result: result restructured as result
 })
  } else{
    res.status(200).json({
      message: "Something went wrong"
 })
  }
  
})
app.post("/create-product/:id", (req, res)=> {


  data.push(req.body)
  res.status(200).json({

    message: "Product Created",
    
  })
})

app.put("/update-product/:id", (req, res)=> {
 // console.log(req);
  let isPresent = data.find((data)=> data.id == req.params.id)
  //console.log(data.indexOf(isPresent))
  if(isPresent){
    let updateData = {
      id: isPresent.id,
      product: req.body.product,
      price: req.body.price
    }
    //console.log(updateData);
  
    data.splice(data.indexOf(isPresent),1,updateData);
   
    res.status(200).json({
  
      message: "Product updated",
      
    })
  } else {
    
    res.status(200).json({
  
      message: "Product updation failed",
      
    })
  }
})

app.delete("/delete-product/:id", (req, res)=> {
  // console.log(req);
   let isPresent = data.find((data)=> data.id == req.params.id)
  if(isPresent)
  {
    data.splice(data.indexOf(isPresent),1); // if id = 1 data.indexOf(isPresent) is 0 & id = 2 data.indexOf(isPresent) is 1
  
    res.status(200).json({
  
     message: "Product deleted",
     
   })
  } else {
    res.status(200).json({
  
      message: "Product not found",
      
    })
  }
  
 })

app.listen(port, () => console.log("Your app runs with" + port));


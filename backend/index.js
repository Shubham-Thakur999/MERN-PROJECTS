//first we'll define the port on which our express server will run.
const port = 4000;

//importing and initializing our dependencies and modules.
const express = require("express"); //using express we can create our app instance as shown below:
const app = express(); // created an instance of our app or instantiated our app or accessed our app in app variable.

const mongoose = require("mongoose"); //initialized mongoose
const jwt = require("jsonwebtoken"); //initialized jsonwebtoken
const multer = require("multer"); //initialized multer

const path = require("path"); //including path from express server. using this path we can get access to our (backend) directory or folder in our express app.
const cors = require("cors");
const { execArgv } = require("process");

app.use(express.json()); //with the help of this (express.json()) whatever (request) we get from response,that will be automatically parsed through json.
app.use(cors()); //using this our react frontend app will connect our backend app at port 4000. this gives permissions for that.

//DATABASE CONNECTION WITH MONGO DB ATLAS
mongoose
  .connect(
    "mongodb+srv://shubhamkumarthakur9999:shubham12@cluster0.icbsgdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

//API CREATION.below we create an API endpoint.
//so if anyone visits port 4000 (localhost:4000/),it'll be handled by below function. THINK OF IT AS ONE OF THE ROUTE HANDLER("/" IN THIS CASE),WE'LL CREATE SIMILAR ONES ("/LOGIN","/products",ETC..) BELOW IT.
app.get("/", (req, res) => {
  //the user will see the following message at (localhost:4000/) in the window screen:
  res.send("Express app is Running");
});
//like above we can and we'll create multiple endpoints for the same API like (for "/LOGIN","/products",etx.).

//IMAGE STORAGE ENGINE WITH MULTER(create a folder named upload in backend folder. it'll store all the images that we'll upload from admin and it'll done with the help of image storage engine using multer in index.js page.)
//What is this Code Doing?This code snippet is configuring how files will be stored on the server when they are uploaded. It uses a library called multer, which is a middleware for handling multipart/form-data, which is primarily used for uploading files.
const storage = multer.diskStorage({
  // Here, we are defining how and where to store the uploaded files using 'multer.diskStorage'.also we have passed it an object(key:value pairs) that consists of 2 keys (destination and filename) and thier respective values.

  //destination: This is the folder path where the uploaded files will be stored. In this case, it's ./upload/images. This means the files will be saved in a folder named images inside an upload directory.
  destination: "./upload/images",
  // - **filename**: This is a function that sets the name of the file when it gets saved on the server.
  // - **Parameters**:
  // - `req`: The request object.
  // - `file`: The file object containing details about the uploaded file.
  // - `cb`: A callback function that multer calls once it has the filename.
  // - **Filename Generation**:
  // - `${file.fieldname}`: The name of the field in the form that holds the file. For example, if your file input field in the HTML form is named `profilePic`, `file.fieldname` will be `profilePic`.
  // - `Date.now()`: The current timestamp in milliseconds. Adding this ensures that each file gets a unique name, avoiding any conflicts with files that have the same name.
  // - `path.extname(file.originalname)`: This extracts the file extension (like `.jpg` or `.png`) from the original file name.
  // - **Combining**:
  // - The combination of these parts (`fieldname`, `timestamp`, and file extension) ensures that the filename is unique and retains the correct extension. For example, if a user uploads a file named `image.jpg` through a form field named `profilePic`, the resulting filename might be something like `profilePic_1629459200000.jpg`.

  // ### Summary:
  // In simple terms, this code sets up how files will be stored when they're uploaded:
  // - Files will be saved in the `./upload/images` directory.
  // - Each file will be named using the format: `[fieldname]_[timestamp].[extension]`. This makes sure every file has a unique name and the correct file extension.

  // This configuration helps in organizing and uniquely identifying files on the server, preventing overwriting of files with the same name.
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
//below we created a upload function with the help of multer and paased an object(key:value pairs) as a parameter. the object consists of one element having key(storage )  and value as (storage) function defined above.
const upload = multer({ storage: storage });

//CREATING UPLOAD ("/UPLOAD") ENDPOINT for images.
//before that we create "/images" endpoint that simply gives you access to images folder within upload folder.this will help us in the next endpoint to display uploaded image's url to the user's screen. also correct path for images folder is ("./upload/images") and not the one stated by greatstack.
app.use("/images", express.static("./upload/images"));
//next is upload endpoint...
//so if there is a post request from the admin at endpoint ("localhost:4000/upload") ,then first the (upload.single('product')) will handle the upload by storing it at destination and with new name as we discussed in storage function.
app.post("/upload", upload.single("product"), (req, res) => {
  //then if image is uploaded then the following response or meaasge in json format will be shown to the window screen of the user consisting success 1 and image url.
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
    //the above image url we get by making request at url ("http://localhost:${port}/images/${req.file.filename}"). this url also consists of ("/images")endpoint(defined above) and that helps us to access the uploaded file in the images folder within upload folder.
  });
});

//endpoint to add new products to our mongo db database.
//before adding any object(key:value pair) to our mongo db database we need to create a database schema or structure first(which simply means name of the schema and its fields and thier data types) for the objects using mongoose library.
//Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
// [now endpoint to Add new products("/addproduct").]
app.post("/addproduct", async (req, res) => {
  //1st let's create a logic to automatically generate the id of the new product being added to the database.it's easy starting from one id and increse it by 1 for each new product's id./// THIS IS JUST SO WE DON'T NEED TO ADD AN ID WHILE UPLOADING A NEW PRODUCT along with other product details.
  let products = await Product.find({});
  //above will get all products from our database collection and store it inside variable(products).
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  //below we create a new (product) using (Product) schema and new product's field's vslues will be same as those of the product being uploaded through post request(req).
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product); //we'll dispaly the above created product and its fields in the console.
  await product.save(); //to save our product in the database
  console.log("Saved");
  //below is just to dispaly the message to the user's window that this particula rproduct has been saved or uploaded.
  res.json({
    success: true,
    name: req.body.name,
  });
});

// [ Endpoint for Deleting products("/removeproduct").]
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// [ Endpoint for getting All products("/allproducts") so that they can be dispalyed in the frontend.]
app.get("/allproducts", async (req, res) => {
  //below will get all products from our database collection and store it inside variable(products).
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// Creating Schema for User model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//[Creating Endpoint for Registering the User.we'll create a new user and store it in our database's Users model.]
app.post("/signup", async (req, res) => {
  //first checking if the user with given email already exists and if yes generating an error message.
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address.",
    });
  }

  //else we create an empty cart for the new user
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  //create new user using Users and setting its details.
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  //using jwt authentication
  const data = {
    user: {
      id: user.id,
    },
  };
  //to generate a token
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//[Creating Endpoint for User Login.]
app.post("/login", async (req, res) => {
  //first checking if the user with given email already exists and if yes compare co,pare the passwords entered by user in login form with the one stored in database.
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Passsword" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
});

//[Creating Endpoint for new collection data.]
app.get("/newcollections", async (req, res) => {
  //first checking if the user with given email already exists and if yes compare co,pare the passwords entered by user in login form with the one stored in database.
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("new collection fetched");
  res.send(newcollection);
});
//[Creating Endpoint for popular in women section.]
app.get("/popularinwomen", async (req, res) => {
  //first checking if the user with given email already exists and if yes compare co,pare the passwords entered by user in login form with the one stored in database.
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(1).slice(-8);
  console.log("popular in women fetched");
  res.send(popular_in_women);
});

//[Creating a middleware to fetch user i.e, to convert auth-token received for logged in user to its respective user id.]
//we've used this midleware in below "/addtocart" endpoint.
// const fetchUser = async (req, res) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using valid token" });
//   } else {
//     try {
//       //decoding token
//       const data = jwt.verify(token, "secret_ecom");
//       req.user = data.user;
//       next();
//     } catch (error) {
//       res.status(401).send({ errors: "Please authenticate using valid token" });
//     }
//   }
// };
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  }
};

//[Creating Endpoint for adding products in cartdata.]
// app.post("/addtocart", fetchUser, async (req, res) => {
//   // console.log(req.body, req.user);
//   console.log("added", req.body.itemId);
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );
//   res.send("Added");
// });
// Endpoint to add item to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added item:", req.body.itemId);

  try {
    let userData = await Users.findOne({ _id: req.user.id });

    // Ensure cartData is initialized
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Initialize the item in cartData if not present
    if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 0;
    }

    // Increment the quantity of the item
    userData.cartData[req.body.itemId] += 1;

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    // Send a JSON response
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ errors: "Server error occurred" });
  }
});

//[Creating Endpoint for removing products in cartdata.]
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});
//[Creating Endpoint to get cartdata.]
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//below we run our express backend app at port 4000.
app.listen(port, (error) => {
  if (!error) {
    //user will see the below message in terminal after running our index.js file in the terminal(node .\index.js ).
    console.log("Server running on port: " + port);
  } else {
    console.log("Error " + error);
  }
});

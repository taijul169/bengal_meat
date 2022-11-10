const db = require('../models')

// create main Model

const Product =db.products
const Review = db.reviews

// image upload
const multer  = require('multer')
const path =  require('path')

// main work

// 1. create product

const addProduct = async (req,res)=>{
    let info ={
        image:req.file.path,
        title:req.body.title,
        price:req.body.price,
        stock:req.body.stock,
        description:req.body.description,
        category:req.body.category,
        published:req.body.published ? req.body.published :false,
    }

    const product = await Product.create(info)
    res.status(200).send(product)

    console.log(product)
}


// 2 get all products

const getAllProducts = async (req,res) =>{
    let products =  await Product.findAll({
     
    })
    for(var i=0;i< products.length;i++){
        products[i].image = `${req.protocol+"://"+req.headers.host}/${products[i].image}`
    }
     res.status(200).send(products)

   
}

// 3 get single product

const getOneProduct = async (req,res) =>{

    let id = req.params.id
    let product =  await Product.findOne({ where:{id:id}})

    product.image = `${req.protocol+"://"+req.headers.host}/${product.image}`
    res.status(200).send(product)

    console.log(product)
}

// 4 single product update

const updateProduct = async (req,res) =>{

    let id = req.params.id
    const product = await Product.update(req.body,{where:{id:id}})
     res.status(200).send(product)
    console.log(product)
}

// 5 delete product by id

const deleteProduct = async (req,res) =>{

    let id = req.params.id
   await Product.destroy({where:{id:id}})
     res.status(200).send("Product is deleted")

}

// 6 get published product 

const getPublishedProduct = async (req,res) =>{

   
   let products =  await Product.findAll({
       where:{published:true}
   })
    products =   products.map((product, key)=>{
        
     return  product.image  = `${req.protocol+"://"+req.headers.host}${product.image}`
   })
//    for(var i=0;i< data.recordset.length;i++){
//     data.recordset[i].Photo = `${req.protocol+"://"+req.headers.host}${data.recordset[i].Photo}`
//   }
   

   res.status(200).send(products)

}


// 7. connect one to many relation Product and reviews
const getProuductReviews  =  async (req,res) =>{
    let id =  req.params.id
    const data = await Product.findAll({
       include:[{
           model:Review,
           as:'review'
       }],
       where: {id:id}
    })

    res.status(200).send(data)
}


// Upload image controller

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'Images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports ={
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProuductReviews,
    upload
    
}
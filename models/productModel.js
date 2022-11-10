

module.exports =  (sequalize, DataTypes) =>{
    const Product = sequalize.define('product',{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER
        },
        stock:{
            type:DataTypes.INTEGER
        },
        description:{
            type: DataTypes.TEXT
        },
        published:{
            type:DataTypes.BOOLEAN
        },
        category:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING
        }

    })

    return Product;
}
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


// Hardcoded data
/*
const shops = [
    {id:'1', name:'John Doe',address:'IIT Bhubaneswar', email:'jdoe@gmail.com', phone:35},
    {id:'2', name:'Steve Smith',address:'IIT Bhubaneswar', email:'steve@gmail.com', phone:25},
    {id:'3', name:'Sara Williams', address:'IIT Bhubaneswar',email:'sara@gmail.com', phone:32},
];
*/

// Customer Type
const ShopType = new GraphQLObjectType({
    name:'Shop',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        address:{type:GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        shop:{
            type:ShopType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                /*
                for(let i = 0;i < shops.length;i++){
                    if(shops[i].id == args.id){
                        return shops[i];
                    }
                }
            */
                return axios.get('https://my-cool-projects.herokuapp.com/shops'+ args.id)
                    .then(res => res.data);

            }
        },
        shops:{
            type: new GraphQLList(ShopType),
            resolve(parentValue, args){
                return axios.get('https://my-cool-projects.herokuapp.com/shops')
                    .then(res => res.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addShop:{
            type:ShopType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                address: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.post('https://my-cool-projects.herokuapp.com/shops', {
                    name:args.name,
                    address:args.address,
                    email: args.email,
                    phone:args.phone
                })
                .then(res => res.data);
            }
        },
        deleteShop:{
            type:ShopType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('https://my-cool-projects.herokuapp.com/shops/'+args.id)
                .then(res => res.data);
            }
        },
        editShop:{
            type:ShopType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                address: {type: GraphQLString},
                email: {type: GraphQLString},
                phone: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.patch('https://my-cool-projects.herokuapp.com/shops/'+args.id, args)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
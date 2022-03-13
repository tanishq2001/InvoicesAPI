const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require('graphql');


// Hardcoded data
/*const buyers = [
    {id:'1', name:'John Doe',address:'IIT Bhubaneswar', email:'jdoe@gmail.com', phone:35},
    {id:'2', name:'Steve Smith',address:'IIT Bhubaneswar', email:'steve@gmail.com', phone:25},
    {id:'3', name:'Sara Williams', address:'IIT Bhubaneswar',email:'sara@gmail.com', phone:32},
];
*/


const ItemType = new GraphQLObjectType({
    name:'Item',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        Quantity: {type: GraphQLInt},
        PricePerquantity: {type: GraphQLInt},
        Discount: {type: GraphQLInt},
        GST:{type: GraphQLInt},
        Totalamount:{type: GraphQLInt},
    })
});

const ItemiType = new GraphQLInputObjectType({
    name:'Itemi',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        Quantity: {type: GraphQLInt},
        PricePerquantity: {type: GraphQLInt},
        Discount: {type: GraphQLInt},
        GST:{type: GraphQLInt},
        Totalamount:{type: GraphQLInt},
    })
});


const BuyerType = new GraphQLObjectType({
    name:'Buyer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        datetime: {type: GraphQLString},
        contactnumber: {type: GraphQLString},
        items: {type: new GraphQLList(ItemType)}, 
        amount:{type: GraphQLInt},
        status:{type: GraphQLBoolean}
    })
});
// Root Query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        buyer:{
            type:BuyerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                
                /*for(let i = 0;i < buyers.length;i++){
                    if(buyers[i].id == args.id){
                        return buyers[i];
                    }
                }*/
                return axios.get('https://my-cool-projects.herokuapp.com/buyers'+ args.id)
                    .then(res => res.data);

            }
        },
        buyers:{
            type: new GraphQLList(BuyerType),
            resolve(parentValue, args){
                return axios.get('https://my-cool-projects.herokuapp.com/buyers')
                    .then(res => res.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBuyer:{
            type:BuyerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
               // datetime: {type: new GraphQLNonNull(GraphQLString)},
                contactnumber: {type: new GraphQLNonNull(GraphQLString)},
                items:{type:new GraphQLNonNull(new GraphQLList(ItemiType))},
                //items:{ type: new GraphQLList(ItemType)}, 
                amount:{type: new GraphQLNonNull(GraphQLInt)},
                status:{type: new GraphQLNonNull(GraphQLBoolean)}
                
            },
            resolve(parentValue, args){
                return axios.post('https://my-cool-projects.herokuapp.com/buyers', {
                    name: args.name,
                    datetime: new Date().toString(),
                    contactnumber: args.contactnumber,
                    items:args.items,
                    amount:args.amount,
                    status:args.status

                })
                .then(res => res.data);
            }
        },
        DeleteBuyer:{
            type:BuyerType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('https://my-cool-projects.herokuapp.com/buyers'+args.id)
                .then(res => res.data);
            }
        },
        EditBuyer:{
            
            type:BuyerType,
            args:{
                
                id:{type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                datetime: {type: GraphQLString},
                contactnumber: {type: GraphQLString},
                items: {type: new GraphQLList(ItemiType)},
                amount:{type: GraphQLInt},
                status:{type: GraphQLBoolean}
                
            },
            resolve(parentValue, args){
                return axios.patch('https://my-cool-projects.herokuapp.com/buyers'+args.id, args)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
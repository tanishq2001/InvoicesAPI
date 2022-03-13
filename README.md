# Invoice API

This API is built using nodejs and GraphQL.

## URL

https: https://tanishq-invoices-api.herokuapp.com/

## Requirements

For development, you will only need Node.js and npm installed in your environement.

```
$ node --version
v17.1.0

$ npm --version
8.1.2
```

Then clone the repository and install the dependencies:

```
$ git clone https://github.com/tanishq2001/InvoicesAPI.git
$ cd InvoiceAPI
$ npm install
```

# Instructions to use API

```
URL for stores: https://tanishq-invoices-api.herokuapp.com/storeshop
URL for invoices: https://tanishq-invoices-api.herokuapp.com/invoicedetails:
```

## Query
### add shop
```
mutation{
  addShop(
   
    name:"Tane Kaku",
    address: "IIT Bhubaneswar",
    email: "tom@gmail.com",
    phone: "2355454545"
    
  ){
    name
    address
    email
    phone
    
  }
}

```


### get shop detail by id
```
{
  shop(id:"5"){
    id,
    name,
		phone
    address
  }
}
```

### get shop list
```
{
  shops{
    id,
    name,
    phone
    address
  }
}
```

### edit shop datails
```
 mutation{
  	editShop(id:"2",name:"Tanishq Agarwal"){
      id,
      name,
      address
      email
      phone
    }
  }
```




### add new invoice buyer
```
mutation{
  addBuyer(
    name:"Tanishq Agarwal",
    items:[
      {
        id: "1"
        name: "maggie",
      	Quantity: 2,
        PricePerquantity: 12,
        Discount: 2,
        GST: 2,
        Totalamount: 24
      }
      {
        id: "2"
        name: "biscuit",
      	Quantity: 3,
        PricePerquantity: 10,
        Discount: 0,
        GST: 0,
        Totalamount: 30
      }
    ],
    contactnumber:"154564454",
    amount:54,
    status:false
  ){
    id,
    name,
    items{
      id
      name
      Quantity
      GST
      PricePerquantity
      Totalamount
    }
    contactnumber
    amount
    status
    
  }
}
```


### get shop details by id
```
  {
    buyer(id:"2"){
      id,
      name,
      items{
        id,
        name
        PricePerquantity
        GST
        Totalamount
        Quantity
        Discount
      }
      contactnumber
      amount
      status
    }
  }
```


### get buyers list
```
{
  buyers{
    id,
    name,
    amount
    items{
	 id,
      name
      GST
      Discount
      Totalamount
      PricePerquantity
      Quantity
    }
    amount
    status
    contactnumber
    
  }
}
```

### edit shop datails
```
  mutation{
  	EditBuyer(id:"2",name:"Tanishq Agarwal"){
      id,
      name,
      items{
        id,
        name
        PricePerquantity
        GST
        Totalamount
        Quantity
        Discount
      }
      contactnumber
      amount
      status
    }
  }
```
###  Delete invoice buyer
```
mutation{
 deletebuyer(id:"1"){
  id,
  name
  
}}
```

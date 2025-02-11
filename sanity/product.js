
export default{

    name:'product',
    title:'Product',
    type:'document',
    fields:[
       { 
        name:'image',
        title:'Image',
        type: 'array',
        of: [{type: 'image'}],
        Options:{
            hotspot: true,
        }
          
    },
    {
        name:'name',
        title:'Name',
        type: 'string'

    },
    {
        name:'slug',
        title:'Slug',
        type: 'slug',
        Options:{
            source:'name',
            maxLength: 90,
        }
    },
    {
        name:'price',
        title:'Price',
        type: 'number',
    },
    {
        name:'detail',
        title:'Detail',
        type: 'string',
    }


    ],
};
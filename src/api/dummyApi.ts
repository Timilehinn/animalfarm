interface generalOverview{
    name : string,
    amount : number,
    value : number
}

export const generalOverview:generalOverview[] = [
    {
        name : "vBtc",
        amount : 7777,
        value :3000
    },
    {
        name : "vEth",
        amount : 45657,
        value :3000
    },
    {
        name : "sVault",
        amount : 7777,
        value :4000
    },

    
]

export const getData = {
    data:{
        generalOverview,
    },

    get(){
        return this.data
    }
}
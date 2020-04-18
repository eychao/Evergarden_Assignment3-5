const productsCat=
{
    fakeDB2:[],
    init()
    {
        this.fakeDB2.push({
            category:`Succelents`,
            img: `/img/sayuri.png`
        });
    
        this. fakeDB2.push({
            category:`Aglaonema`,
            img: `/img/agChoco.png`
        });
    
        this.fakeDB2.push({
            category:`Flowering`,
            img: `/img/hoyaMac.png`
        });
        
        this.fakeDB2.push({
            category:`Bonsai`,
            img: `/img/bonJun.png`
        });   
    },
    getProductsCat()
    {
        return this.fakeDB2;
    }
}

productsCat.init();
module.exports=productsCat;
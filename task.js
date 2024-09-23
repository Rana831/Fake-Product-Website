class Shape{
    constructor(color, fontWeight){
        this.color=color;
        this.fontWeight=fontWeight;
    }
    print(){
        console.log(this.color,this.fontWeight)
    }
}
class Rectangle extends Shape{
    constructor(width,height,color,fontWeight){
        this.width=width;
        this.height=height;
        super(color,fontWeight);
    }
    printArea(){
        console.log(this.width*this.height); 
        this.print();
    }
}
const result = new result( 50, 30,"Blue", 15 );
result.printArea();

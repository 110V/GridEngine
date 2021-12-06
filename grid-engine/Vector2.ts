interface Vector2 {
    x:number;
    y:number;
}

function addVector2(a:Vector2,b:Vector2):Vector2{
    return {x:a.x+a.y,y:a.y+b.y}
}

export {Vector2,addVector2};


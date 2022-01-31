import Area from "./Area";
import Content from "./Content";
import Grid from "./Grid";

interface Logic{
    name:string,
    allowIn:boolean,
    allowOut:boolean,
    func:(  (get:(id:string)=>any,value:any)=>{name:string,value:any}|null),
    callback?:((value:any)=>void)[]
}

export default class Bridge {
    private _logics:{ [name: string]: Logic } = {};
    private _loadedObjects:{[id:string]:Grid|Area|Content} = {};

    public createLogic(name:string,allowIn:boolean,allowOut:boolean,func:(  (get:(id:string)=>any,value:any)=>{name:string,value:any}|null)){
        const logic:Logic = {name:name,allowIn:allowIn,allowOut:allowOut,func:func};
        this._logics[name] = logic;
    }

    public runLogic(name:string,value:any){
        const logic = this._logics[name];
        const next = logic.func(this.getObject,value);
        if(next){
            if(next.name == "out") {
                if(!logic.allowOut){
                    return;
                }
                logic.callback?.forEach((f)=>{
                    f(value);
                })
            }
            else{
                this.runLogic(next.name,next.value);
            }
        }
    }

    private getObject(id:string):Grid|Area|Content {
        return this._loadedObjects[id];
    }

    public addObject(object:Grid|Area|Content) {
        this._loadedObjects[object.id] = object;
    }

    public registerLogic(name:string,callback:((value:any)=>void)){
        const logic =  this._logics[name];
        if(!logic.callback){
            logic.callback = [];
        }
        logic.callback.push(callback);
    }
}
// crear identificadores unicos con v4 de uuid
import { v4 as uuidv4 } from 'uuid';

class Tarea{
    constructor(desc){
        this.id=uuidv4();
        this.desc=desc;
        this.completadoEn=null;
    }
}

export default Tarea
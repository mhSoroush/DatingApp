export class LikeParams 
{
    
    pageNumber = 1;
    pageSize = 3;
    predicate = 'liked'

    constructor(predicate: string){
        this.predicate = predicate;
    }
}
export class LikeParams 
{
    
    pageNumber = 1;
    pageSize = 5;
    predicate = 'liked'

    constructor(predicate: string){
        this.predicate = predicate;
    }
}
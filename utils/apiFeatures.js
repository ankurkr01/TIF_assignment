
class apiFeatures {

    constructor(query, querystr){
        this.query =query;
        this.querystr = querystr
    }

    pagination(resultPerPage){
        const currentPage = this.querystr.page || 1;
        const skip = resultPerPage*(currentPage-1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    
       }

}

module.exports = apiFeatures; 
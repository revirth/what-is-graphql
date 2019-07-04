


## GraphQL
- https://graphql.org/blog/graphql-a-query-language/

  A GraphQL query is a string that is sent to a server to be interpreted and fulfilled, which then returns JSON back to the client.


<a href="https://www.youtube.com/watch?v=783ccP__No8" target="_blank"><img src="https://img.youtube.com/vi/783ccP__No8/0.jpg" alt="GraphQL: The Documentary (Official Release)"></a>

### REST
 - https://www.howtographql.com/basics/1-graphql-is-the-better-rest/
#### Overfetching
 - client downloads more information than is actually required in the app
 
#### Underfetching
 - endpoint doesn’t provide enough of the required information
 - it needs to make one additional request per element to fetch the required data
 
### Pros and Cons
- https://stablekernel.com/advantages-and-disadvantages-of-graphql/

   :thumbsup:
    - clients have the ability to dictate exactly what they need from the server, and receive that data in a predictable way
    - ability to retrieve many resources in a single request 
    - strongly-typed API
    > Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema
    
   :thumbsdown:
     - queries always return a HTTP status code of `200`
       - If your query is unsuccessful, your response JSON will have a top-level `errors` key with associated error messages and stacktrace
     - lack of built-in caching support
     - complexity
     - N+1 Problem - https://github.com/graphql/dataloader
      

### Case
 - [How big companies are using GraphQL](https://syndicode.com/2019/01/01/how-big-companies-are-using-graphql/)
 - [stories from developer teams implementing GraphQL in production](https://www.graphql.com/case-studies/)


### ref
- https://github.com/chentsulin/awesome-graphql
- https://adityasridhar.com/posts/what-is-graphql-and-how-to-use-it
- https://adityasridhar.com/posts/what-is-a-mutation-in-graphql-and-how-to-use-it
- https://kolosek.com/testing-graphql-server/
- [Grpahql 적용 시 고민해 볼 점](https://showerbugs.github.io/2018-04-20/Graphql-%EC%A0%81%EC%9A%A9%ED%95%A0-%EB%95%8C-%EA%B3%A0%EB%A0%A4%ED%95%A0-%EC%A0%90)
     

using System;
using GraphQL;
using GraphQL.Types;

namespace HelloGraphQL
{
    class Program
    {
        static void Main(string[] args)
        {
            var schema = Schema.For(@"
            type Query {
                hello: String
            }");

            var json = schema.Execute(_ => {
                _.Query = "{ hello }";
                _.Root = new { hello = "Hello GraphQL!" };
            });

            Console.WriteLine(json);
        }
    }
}
